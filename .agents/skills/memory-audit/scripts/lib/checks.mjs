import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { splitFrontmatter, bodyLineCount } from "./frontmatter.mjs";
import { extractRelativeLinks, linkExists } from "./links.mjs";
import { findInjectionLines, findSecretLines } from "./secrets.mjs";
import {
  buildIndexContent,
  deriveType,
  extractGeneratedBlock,
  parseIndexLines,
  INDEX_BEGIN,
} from "./index.mjs";
import { checkToc } from "./toc.mjs";

const SCHEMA = {
  doc: {
    required: ["description", "status", "updated"],
    status: ["active", "draft", "archived"],
  },
  decision: {
    required: ["description", "status", "date"],
    status: ["proposed", "accepted", "superseded", "deprecated"],
  },
  knowledge: {
    required: ["description", "status", "updated", "last_verified"],
    status: ["active", "draft", "archived"],
  },
  source: {
    required: ["description", "captured"],
    status: null,
  },
  task: {
    required: ["description", "status", "updated"],
    status: ["todo", "in-progress", "blocked", "done"],
  },
  memory: {
    required: ["description", "updated"],
    status: null,
  },
};

function daysAgo(iso, now) {
  const d = new Date(iso + "T00:00:00Z");
  if (Number.isNaN(d.getTime())) return null;
  return Math.floor((now - d.getTime()) / 86400000);
}

function schemaFor(rel) {
  const n = rel.replace(/\\/g, "/");
  const type = deriveType(n);
  if (type === "tutorial" || type === "how-to" || type === "reference" || type === "explanation") {
    return SCHEMA.doc;
  }
  if (type === "decision") return SCHEMA.decision;
  if (type === "knowledge") return SCHEMA.knowledge;
  if (n.startsWith("sources/")) return SCHEMA.source;
  if (type === "task") return SCHEMA.task;
  if (
    type === "memory" &&
    !n.endsWith("MEMORY.md") &&
    n !== "memory/MEMORY.md"
  ) {
    return SCHEMA.memory;
  }
  return null;
}

function isMemoryFile(rel) {
  const n = rel.replace(/\\/g, "/");
  if (
    n === "AGENTS.md" ||
    n === "SCRATCHPAD.md" ||
    n === "HANDOFF.md" ||
    n.startsWith("knowledge/") ||
    n.startsWith("sources/") ||
    n.startsWith("tasks/") ||
    n.startsWith("memory/")
  ) {
    return true;
  }
  if (!n.startsWith("docs/")) return false;
  // Only Diátaxis / decision / archive memory paths, not research notes
  return (
    n === "docs/index.md" ||
    n.startsWith("docs/tutorials/") ||
    n.startsWith("docs/how-to/") ||
    n.startsWith("docs/reference/") ||
    n.startsWith("docs/explanation/") ||
    n.startsWith("docs/decisions/") ||
    n.startsWith("docs/archive/")
  );
}

export function runChecks(ctx) {
  const {
    root,
    files,
    contents,
    options,
    now = Date.now(),
  } = ctx;
  const findings = [];
  const push = (f) => findings.push(f);

  const agentsRel = "AGENTS.md";
  if (contents.has(agentsRel)) {
    const lines = contents.get(agentsRel).replace(/\r/g, "").split("\n").length;
    if (lines > (options.maxAgentsLines || 120)) {
      push({
        id: "agents-size",
        severity: "warn",
        file: agentsRel,
        message: `AGENTS.md has ${lines} lines (budget ${options.maxAgentsLines || 120})`,
      });
    }
    push({
      id: "always-on-cost",
      severity: "info",
      file: agentsRel,
      message: `Approximate always-on cost available via --report-tokens (${contents.get(agentsRel).length} chars in AGENTS.md)`,
    });
  }

  const titles = new Map();
  const descriptions = new Map();
  const decisionNums = new Map();
  const indexedPaths = new Set();
  const indexFiles = [];

  for (const rel of files) {
    const n = rel.replace(/\\/g, "/");
    if (!isMemoryFile(n) && n !== "README.md") continue;
    const text = contents.get(rel);
    if (text == null) continue;
    const { data, body, hasFrontmatter } = splitFrontmatter(text);
    const lines = bodyLineCount(body);

    if (
      isMemoryFile(n) &&
      n !== "AGENTS.md" &&
      !n.endsWith("/index.md") &&
      n !== "knowledge/log.md" &&
      n !== "SCRATCHPAD.md" &&
      n !== "HANDOFF.md" &&
      n !== "memory/MEMORY.md" &&
      !n.startsWith("docs/archive/")
    ) {
      if (lines > (options.maxDocLines || 300)) {
        push({
          id: "doc-size",
          severity: "warn",
          file: n,
          message: `${lines} lines exceeds soft budget ${options.maxDocLines || 300}`,
        });
      }
    }

    const schema = schemaFor(n);
    if (schema) {
      if (!hasFrontmatter) {
        push({
          id: "missing-frontmatter",
          severity: "warn",
          file: n,
          message: "Missing frontmatter block",
        });
      } else {
        for (const key of schema.required) {
          if (data[key] == null || data[key] === "") {
            push({
              id: "missing-key",
              severity: "warn",
              file: n,
              message: `Missing required key ${key}`,
            });
          }
        }
        if (schema.status && data.status && !schema.status.includes(data.status)) {
          push({
            id: "invalid-status",
            severity: "warn",
            file: n,
            message: `Invalid status ${data.status}`,
          });
        }
      }
    }

    const staleDays = options.staleDays || 90;
    if (data.status === "active" && data.updated) {
      const age = daysAgo(data.updated, now);
      if (age != null && age > staleDays) {
        push({
          id: "stale",
          severity: "warn",
          file: n,
          message: `status active but updated ${data.updated} (>${staleDays}d)`,
        });
      }
    }
    if (deriveType(n) === "knowledge" && data.last_verified) {
      const age = daysAgo(data.last_verified, now);
      if (age != null && age > 180) {
        push({
          id: "stale",
          severity: "warn",
          file: n,
          message: `last_verified ${data.last_verified} (>180d)`,
        });
      }
    }

    for (const link of extractRelativeLinks(text)) {
      if (!linkExists(n, link.href, root)) {
        push({
          id: "broken-link",
          severity: "error",
          file: n,
          message: `Broken relative link ${link.href}`,
        });
      }
    }

    if (n.startsWith("docs/decisions/")) {
      const m = /(?:^|\/)(\d{4})-/.exec(n);
      if (m) {
        const num = m[1];
        if (decisionNums.has(num)) {
          push({
            id: "decision-number-duplicate",
            severity: "error",
            file: n,
            message: `Duplicate decision number ${num} (also ${decisionNums.get(num)})`,
          });
        } else {
          decisionNums.set(num, n);
        }
      }
    }

    if (data.superseded_by) {
      const target = path.resolve(path.dirname(path.join(root, n)), data.superseded_by);
      if (!fs.existsSync(target)) {
        push({
          id: "superseded-target-missing",
          severity: "error",
          file: n,
          message: `superseded_by points at missing ${data.superseded_by}`,
        });
      }
    }

    if (deriveType(n) === "knowledge" && data.status === "active") {
      const hasCite =
        /sources\/[\w./-]+\.md/.test(text) ||
        /\[[^\]]*\]\([^)]+\)/.test(text) ||
        /:\d+/.test(text);
      if (!hasCite) {
        push({
          id: "knowledge-no-citation",
          severity: "warn",
          file: n,
          message: "Knowledge page has no citation",
        });
      }
      const srcLinks = [...text.matchAll(/sources\/[\w./-]+\.md/g)].map((x) => x[0]);
      for (const s of srcLinks) {
        if (!fs.existsSync(path.join(root, s))) {
          push({
            id: "citation-missing-target",
            severity: "warn",
            file: n,
            message: `Citation target missing ${s}`,
          });
        }
      }
    }

    if (data.origin === "external" && !/confirmed|confirmation/i.test(text)) {
      push({
        id: "external-unconfirmed",
        severity: "warn",
        file: n,
        message: "origin: external without confirmation note",
      });
    }

    if (isMemoryFile(n)) {
      for (const hit of findInjectionLines(text)) {
        push({
          id: "injection-phrase",
          severity: "error",
          file: n,
          message: `Possible injection phrase at line ${hit.line}`,
        });
      }
      for (const hit of findSecretLines(text)) {
        push({
          id: "secret-pattern",
          severity: "error",
          file: n,
          message: `Possible secret pattern at line ${hit.line}`,
        });
      }
    }

    if (data.status === "active" || !data.status) {
      const titleM = /^#\s+(.+)$/m.exec(body);
      if (titleM) {
        const t = titleM[1].trim().toLowerCase();
        if (titles.has(t)) {
          push({
            id: "duplicate-title",
            severity: "warn",
            file: n,
            message: `Duplicate title with ${titles.get(t)}`,
          });
        } else titles.set(t, n);
      }
      if (data.description) {
        const d = data.description.toLowerCase();
        if (descriptions.has(d)) {
          push({
            id: "duplicate-description",
            severity: "warn",
            file: n,
            message: `Duplicate description with ${descriptions.get(d)}`,
          });
        } else descriptions.set(d, n);
      }
    }

    if (n.endsWith("/index.md") || n === "docs/index.md" || n === "knowledge/index.md") {
      indexFiles.push(n);
      for (const entry of parseIndexLines(text)) {
        indexedPaths.add(entry.path.replace(/\\/g, "/"));
        const target = path.join(root, entry.path);
        if (!fs.existsSync(target)) {
          push({
            id: "index-dangling-entry",
            severity: "warn",
            file: n,
            message: `Index points at missing ${entry.path}`,
          });
        } else {
          try {
            const ttext = fs.readFileSync(target, "utf8");
            const { data: td } = splitFrontmatter(ttext);
            if (
              (td.status && td.status !== entry.status) ||
              (td.description && td.description !== entry.description)
            ) {
              push({
                id: "index-drift",
                severity: "warn",
                file: n,
                message: `Index line drifts from frontmatter for ${entry.path}`,
              });
            }
            if (td.status === "superseded" || td.status === "archived") {
              // checked via active-links-to-superseded on other files
            }
          } catch {
            /* ignore */
          }
        }
      }
      if (text.includes(INDEX_BEGIN)) {
        const current = extractGeneratedBlock(text);
        const expected = buildIndexContent(files, root, options.includeArchived);
        if (current != null && current.trimEnd() + "\n" !== expected) {
          push({
            id: "index-block-stale",
            severity: "warn",
            file: n,
            message: "Generated index block is stale",
          });
        }
      }
    }

    // TOC checks (Task 6)
    for (const f of checkToc(n, data, body, lines)) push(f);

    if (data.status === "in-progress" && data.updated) {
      const age = daysAgo(data.updated, now);
      if (age != null && age > 30) {
        push({
          id: "task-stale",
          severity: "warn",
          file: n,
          message: `Task in-progress with updated ${data.updated}`,
        });
      }
    }
  }

  // active links to superseded
  for (const rel of files) {
    const n = rel.replace(/\\/g, "/");
    const text = contents.get(rel);
    if (!text) continue;
    const { data } = splitFrontmatter(text);
    if (data.status === "superseded" || data.status === "archived") continue;
    for (const link of extractRelativeLinks(text)) {
      const targetPath = path.resolve(path.dirname(path.join(root, n)), link.href);
      const relTarget = path.relative(root, targetPath).replace(/\\/g, "/");
      if (!contents.has(relTarget) && !fs.existsSync(targetPath)) continue;
      let ttext;
      try {
        ttext = contents.get(relTarget) || fs.readFileSync(targetPath, "utf8");
      } catch {
        continue;
      }
      const { data: td } = splitFrontmatter(ttext);
      if (td.status === "superseded" || td.status === "archived") {
        push({
          id: "active-links-to-superseded",
          severity: "warn",
          file: n,
          message: `Links to ${td.status} page ${relTarget}`,
        });
      }
    }
  }

  // orphans / missing index entries
  for (const rel of files) {
    const n = rel.replace(/\\/g, "/");
    const type = deriveType(n);
    if (!type) continue;
    if (n.endsWith("/index.md") || n === "knowledge/log.md" || n === "memory/MEMORY.md") {
      continue;
    }
    const { data } = splitFrontmatter(contents.get(rel) || "");
    if (data.status === "archived") continue;
    if (!indexedPaths.has(n)) {
      const hasAnyIndex = indexFiles.length > 0;
      if (hasAnyIndex) {
        push({
          id: "index-missing-entry",
          severity: "warn",
          file: n,
          message: "File has no index line",
        });
        push({
          id: "orphan",
          severity: "warn",
          file: n,
          message: "Memory file not listed in any index",
        });
      }
    }
  }

  // scratchpad / handoff mtime
  for (const [name, id, days] of [
    ["SCRATCHPAD.md", "scratchpad-stale", 7],
    ["HANDOFF.md", "handoff-stale", 14],
  ]) {
    const full = path.join(root, name);
    if (!fs.existsSync(full)) continue;
    const st = fs.statSync(full);
    const text = fs.readFileSync(full, "utf8").trim();
    if (name === "SCRATCHPAD.md" && !text) continue;
    const ageDays = (now - st.mtimeMs) / 86400000;
    if (ageDays > days) {
      push({
        id,
        severity: "warn",
        file: name,
        message: `${name} unmodified for ${Math.floor(ageDays)} days`,
      });
    }
  }

  // local files tracked
  try {
    const tracked = execSync("git ls-files SCRATCHPAD.md HANDOFF.md CLAUDE.local.md", {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const f of tracked) {
      push({
        id: "local-file-tracked",
        severity: "warn",
        file: f,
        message: "Local file is tracked by git",
      });
    }
  } catch {
    /* no git */
  }

  findings.sort((a, b) => {
    const sev = { error: 0, warn: 1, info: 2 };
    return (
      (sev[a.severity] ?? 9) - (sev[b.severity] ?? 9) ||
      a.id.localeCompare(b.id) ||
      a.file.localeCompare(b.file) ||
      a.message.localeCompare(b.message)
    );
  });
  return findings;
}

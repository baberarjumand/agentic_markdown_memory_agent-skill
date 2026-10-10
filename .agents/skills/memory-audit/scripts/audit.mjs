#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runChecks } from "./lib/checks.mjs";
import { buildIndexContent, writeIndexFile } from "./lib/index.mjs";
import { applyToc } from "./lib/toc.mjs";
import { splitFrontmatter, bodyLineCount } from "./lib/frontmatter.mjs";
import { reportAlwaysOnCost } from "./lib/tokens.mjs";

const SKIP_DIRS = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  "vendor",
  ".next",
  "coverage",
  ".cache",
  "tests",
]);

function parseArgs(argv) {
  const options = {
    root: process.cwd(),
    json: false,
    check: false,
    writeIndex: false,
    writeToc: false,
    reportTokens: false,
    includeArchived: false,
    maxAgentsLines: 120,
    maxDocLines: 300,
    staleDays: 90,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--json") options.json = true;
    else if (a === "--check") options.check = true;
    else if (a === "--write-index") options.writeIndex = true;
    else if (a === "--write-toc") options.writeToc = true;
    else if (a === "--report-tokens") options.reportTokens = true;
    else if (a === "--include-archived") options.includeArchived = true;
    else if (a === "--root") options.root = path.resolve(argv[++i]);
    else if (a === "--max-agents-lines") options.maxAgentsLines = Number(argv[++i]);
    else if (a === "--max-doc-lines") options.maxDocLines = Number(argv[++i]);
    else if (a === "--stale-days") options.staleDays = Number(argv[++i]);
  }
  return options;
}

function walk(dir, root, out = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const ent of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (SKIP_DIRS.has(ent.name)) continue;
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full, root, out);
    else if (ent.isFile() && /\.(md|mdc)$/i.test(ent.name)) {
      out.push(path.relative(root, full).replace(/\\/g, "/"));
    }
  }
  return out;
}

function loadContents(root, files) {
  const map = new Map();
  for (const rel of files) {
    try {
      map.set(rel, fs.readFileSync(path.join(root, rel), "utf8"));
    } catch {
      /* skip */
    }
  }
  return map;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const root = options.root;
  const files = walk(root, root);
  let contents = loadContents(root, files);

  if (options.writeIndex && !options.check) {
    const content = buildIndexContent(files, root, options.includeArchived);
    for (const idx of ["docs/index.md", "knowledge/index.md"]) {
      const full = path.join(root, idx);
      if (!fs.existsSync(full)) continue;
      const result = writeIndexFile(full, content);
      if (result.needsMarkers) {
        console.error(`${idx}: has no BEGIN/END GENERATED INDEX markers; propose adding them, not writing silently`);
        continue;
      }
      if (result.changed) {
        fs.writeFileSync(full, result.text, "utf8");
      }
    }
    contents = loadContents(root, files);
  }

  if (options.writeToc && !options.check) {
    for (const rel of files) {
      const text = contents.get(rel);
      if (!text) continue;
      const { data, body } = splitFrontmatter(text);
      const lines = bodyLineCount(body);
      const result = applyToc(text, data, body, lines, rel);
      if (result.changed) {
        fs.writeFileSync(path.join(root, rel), result.text, "utf8");
      }
    }
    contents = loadContents(root, walk(root, root));
  }

  const findings = runChecks({ root, files: walk(root, root), contents, options });

  if (options.reportTokens) {
    const rows = reportAlwaysOnCost(root);
    if (options.json) {
      // included below
    } else {
      console.log("Always-on cost (approx tokens = characters / 4; trend only, not billing):");
      for (const r of rows) {
        console.log(`  ${r.component}: ${r.characters} chars ~ ${r.approxTokens} tokens`);
      }
    }
  }

  const errors = findings.filter((f) => f.severity === "error");
  const warns = findings.filter((f) => f.severity === "warn");

  if (options.json) {
    const out = {
      findings,
      summary: {
        errors: errors.length,
        warnings: warns.length,
        info: findings.filter((f) => f.severity === "info").length,
      },
    };
    if (options.reportTokens) out.tokens = reportAlwaysOnCost(root);
    console.log(JSON.stringify(out, null, 2));
  } else if (!options.reportTokens || findings.length) {
    for (const f of findings) {
      console.log(`[${f.severity}] ${f.id}: ${f.file}: ${f.message}`);
    }
    if (!findings.length) console.log("clean");
  }

  if (errors.length) process.exit(2);
  if (warns.length) process.exit(1);
  process.exit(0);
}

main();

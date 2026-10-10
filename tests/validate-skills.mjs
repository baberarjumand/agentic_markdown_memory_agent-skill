#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = path.join(root, ".agents", "skills");
let failed = false;

function fail(msg) {
  console.error("FAIL:", msg);
  failed = true;
}

function walkMd(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if ([".git", "node_modules", "tests"].includes(ent.name)) continue;
      walkMd(full, out);
    } else if (/\.md$/i.test(ent.name)) out.push(full);
  }
  return out;
}

// Skill frontmatter checks
for (const name of fs.readdirSync(skillsRoot)) {
  const skillDir = path.join(skillsRoot, name);
  if (!fs.statSync(skillDir).isDirectory()) continue;
  const skillPath = path.join(skillDir, "SKILL.md");
  if (!fs.existsSync(skillPath)) {
    fail(`${name}: missing SKILL.md`);
    continue;
  }
  const text = fs.readFileSync(skillPath, "utf8");
  const lines = text.replace(/\r/g, "").split("\n").length;
  if (lines >= 500) fail(`${name}: SKILL.md has ${lines} lines (>=500)`);
  if (!text.startsWith("---")) {
    fail(`${name}: missing frontmatter`);
    continue;
  }
  const end = text.indexOf("\n---", 3);
  const fm = text.slice(4, end);
  const nm = /^name:\s*(.+)$/m.exec(fm);
  const dm = /description:\s*>?\s*([\s\S]*?)(?=\n[a-zA-Z0-9_-]+:|\n---)/.exec(fm + "\n---");
  if (!nm) fail(`${name}: missing name`);
  else {
    const n = nm[1].trim();
    if (n !== name) fail(`${name}: name ${n} != folder`);
    if (!/^[a-z0-9-]+$/.test(n) || n.length > 64) fail(`${name}: invalid name`);
  }
  if (!dm) fail(`${name}: missing description`);
  else {
    const d = dm[1].replace(/\s+/g, " ").trim();
    if (!d) fail(`${name}: empty description`);
    if (d.length > 1024) fail(`${name}: description > 1024`);
  }
  // reference links resolve
  const refLinks = [...text.matchAll(/\]\((references\/[^)]+)\)/g)].map((m) => m[1]);
  for (const rel of refLinks) {
    const target = path.join(skillDir, rel.split("#")[0]);
    if (!fs.existsSync(target)) fail(`${name}: missing ref ${rel}`);
  }
}

// sync-references check
try {
  execSync("node .agents/skills/initialize-agentic-memory/scripts/sync-references.mjs --check", {
    cwd: root,
    stdio: "pipe",
  });
} catch {
  fail("sync-references --check failed");
}

// Canonical blocks: each BLOCK id once in practices.md; referenced ids exist
const practices = fs.readFileSync(
  path.join(skillsRoot, "initialize-agentic-memory", "references", "practices.md"),
  "utf8"
);
const blockIds = [...practices.matchAll(/<!-- BLOCK: ([a-z0-9-]+) -->/g)].map((m) => m[1]);
const seen = new Set();
for (const id of blockIds) {
  if (seen.has(id)) fail(`duplicate block ${id}`);
  seen.add(id);
}
const required = ["reflection", "plan-pointer", "write-rules", "load-rule"];
for (const id of required) {
  if (!seen.has(id)) fail(`missing block ${id}`);
}

// plan-gate protocol words only in plan-gate.md
const skillsTextFiles = walkMd(skillsRoot);
for (const f of skillsTextFiles) {
  const rel = path.relative(root, f).replace(/\\/g, "/");
  if (rel.endsWith("plan-gate.md")) continue;
  const t = fs.readFileSync(f, "utf8");
  if (t.includes("Blocking questions")) {
    // allow one-line pointer wording, not the protocol header form
    if (/\*\*Blocking questions/.test(t) || /Blocking questions \(0/.test(t)) {
      fail(`plan-gate protocol leaked into ${rel}`);
    }
  }
}

// tool-notes date check
const toolNotes = path.join(
  skillsRoot,
  "initialize-agentic-memory",
  "references",
  "tool-notes.md"
);
if (fs.existsSync(toolNotes)) {
  const t = fs.readFileSync(toolNotes, "utf8");
  const dates = [...t.matchAll(/\|\s*(\d{4}-\d{2}-\d{2})\s*\|/g)].map((m) => m[1]);
  const now = Date.now();
  for (const d of dates) {
    const age = (now - new Date(d + "T00:00:00Z").getTime()) / 86400000;
    if (age > 180) fail(`tool-notes row older than 180 days: ${d}`);
  }
}

// Relative links across repo markdown (skills + README + CHANGELOG if present)
const mdFiles = [
  ...walkMd(skillsRoot),
  path.join(root, "README.md"),
  path.join(root, "CHANGELOG.md"),
].filter((f) => fs.existsSync(f));

function stripFences(text) {
  return text.replace(/```[\s\S]*?```/g, "").replace(/~~~[\s\S]*?~~~/g, "");
}

for (const f of mdFiles) {
  const text = stripFences(fs.readFileSync(f, "utf8"));
  const re = /\[([^\]]*)\]\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(text))) {
    const href = m[2].trim().split(/\s+/)[0];
    if (/^(https?:|mailto:|#)/i.test(href)) continue;
    const filePart = href.split("#")[0];
    if (!filePart) continue;
    // Generated companion copies may point at init-only siblings
    if (/GENERATED COPY/.test(fs.readFileSync(f, "utf8")) && /^(tool-notes|plan-gate|practices|cursor-rule|migration-safety)\.md$/.test(filePart)) {
      continue;
    }
    const target = path.resolve(path.dirname(f), filePart);
    if (!fs.existsSync(target)) {
      fail(`broken link in ${path.relative(root, f)}: ${filePart}`);
    }
  }
}

if (failed) {
  console.error("validate-skills: failed");
  process.exit(1);
}
console.log("validate-skills: ok");

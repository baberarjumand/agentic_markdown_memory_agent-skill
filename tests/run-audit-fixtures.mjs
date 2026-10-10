#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync, spawnSync } from "node:child_process";
import os from "node:os";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const audit = path.join(root, ".agents/skills/memory-audit/scripts/audit.mjs");
const fixturesDir = path.join(root, "tests/fixtures");
const expectedDir = path.join(root, "tests/expected");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    if (ent.name.startsWith("_")) continue;
    const s = path.join(src, ent.name);
    const d = path.join(dest, ent.name);
    if (ent.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function runAudit(cwd) {
  const r = spawnSync(process.execPath, [audit, "--json", "--root", cwd], {
    encoding: "utf8",
  });
  const out = (r.stdout || "").trim();
  if (!out) {
    console.error("no audit output", r.stderr);
    process.exit(1);
  }
  return JSON.parse(out);
}

function countIds(findings) {
  const counts = {};
  for (const f of findings) {
    counts[f.id] = (counts[f.id] || 0) + 1;
  }
  return counts;
}

let failed = false;

for (const name of fs.readdirSync(fixturesDir).sort()) {
  const src = path.join(fixturesDir, name);
  if (!fs.statSync(src).isDirectory()) continue;
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `amm-${name}-`));
  copyDir(src, tmp);

  // Age local files for stale checks
  const old = Date.now() - 20 * 86400000;
  for (const f of ["SCRATCHPAD.md", "HANDOFF.md"]) {
    const p = path.join(tmp, f);
    if (fs.existsSync(p)) fs.utimesSync(p, new Date(old), new Date(old));
  }

  // git init for local-file-tracked
  try {
    execSync("git init", { cwd: tmp, stdio: "ignore" });
    execSync("git add -A", { cwd: tmp, stdio: "ignore" });
    execSync('git -c user.email=t@t.com -c user.name=t commit -m init', {
      cwd: tmp,
      stdio: "ignore",
    });
  } catch (e) {
    console.error("git setup warning", name, e.message);
  }

  const result = runAudit(tmp);
  const counts = countIds(result.findings);
  const expectedPath = path.join(expectedDir, `${name}.json`);

  if (!fs.existsSync(expectedPath)) {
    // write draft expected for drifted-memory completeness check later
    fs.writeFileSync(
      expectedPath,
      JSON.stringify({ ids: Object.keys(counts).sort(), counts }, null, 2) + "\n"
    );
    console.log(`wrote expected ${name}`);
  } else {
    const expected = JSON.parse(fs.readFileSync(expectedPath, "utf8"));
    const gotIds = Object.keys(counts).sort();
    const expIds = expected.ids.slice().sort();
    if (JSON.stringify(gotIds) !== JSON.stringify(expIds)) {
      console.error(`${name}: id set mismatch`);
      console.error(" got", gotIds);
      console.error(" exp", expIds);
      failed = true;
    }
    for (const id of expIds) {
      if ((counts[id] || 0) < 1) {
        console.error(`${name}: missing id ${id}`);
        failed = true;
      }
    }
  }

  if (name === "drifted-memory") {
    const required = [
      "agents-size",
      "doc-size",
      "always-on-cost",
      "missing-frontmatter",
      "missing-key",
      "invalid-status",
      "stale",
      "broken-link",
      "orphan",
      "index-drift",
      "index-missing-entry",
      "index-dangling-entry",
      "index-block-stale",
      "decision-number-duplicate",
      "superseded-target-missing",
      "active-links-to-superseded",
      "knowledge-no-citation",
      "citation-missing-target",
      "duplicate-title",
      "duplicate-description",
      "scratchpad-stale",
      "handoff-stale",
      "task-stale",
      "local-file-tracked",
      "external-unconfirmed",
      "injection-phrase",
      "secret-pattern",
      "toc-stale",
      "toc-missing",
      "toc-unneeded",
    ];
    for (const id of required) {
      if (!counts[id]) {
        console.error(`drifted-memory missing required check ${id}`);
        failed = true;
      }
    }
  }

  fs.rmSync(tmp, { recursive: true, force: true });
}

if (failed) {
  console.error("run-audit-fixtures: failed");
  process.exit(1);
}
console.log("run-audit-fixtures: ok");

#!/usr/bin/env node
/**
 * Copy layout.md and practices.md from initialize-agentic-memory into
 * companion skill references/ folders as GENERATED COPY files.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const initRoot = path.resolve(__dirname, "..");
const skillsRoot = path.resolve(initRoot, "..");
const sources = ["layout.md", "practices.md"];
const targets = [
  path.join(skillsRoot, "memory-audit", "references"),
  path.join(skillsRoot, "memory-reflect", "references"),
];

function header(name) {
  return `<!-- GENERATED COPY of initialize-agentic-memory/references/${name}. Edit the source and run sync-references. -->\n\n`;
}

function expectedContent(name) {
  const src = fs.readFileSync(path.join(initRoot, "references", name), "utf8");
  return header(name) + src.replace(/^\uFEFF/, "");
}

function sync({ check }) {
  let failed = false;
  for (const name of sources) {
    const expected = expectedContent(name);
    for (const dir of targets) {
      if (!fs.existsSync(dir)) {
        if (check) {
          console.error(`missing dir ${dir}`);
          failed = true;
          continue;
        }
        fs.mkdirSync(dir, { recursive: true });
      }
      const dest = path.join(dir, name);
      if (check) {
        if (!fs.existsSync(dest)) {
          console.error(`missing ${dest}`);
          failed = true;
          continue;
        }
        const actual = fs.readFileSync(dest, "utf8");
        if (actual !== expected) {
          console.error(`out of sync: ${dest}`);
          failed = true;
        }
      } else {
        fs.writeFileSync(dest, expected, "utf8");
        console.log(`wrote ${dest}`);
      }
    }
  }
  if (check) {
    if (failed) process.exit(1);
    console.log("sync-references: ok");
  }
}

const check = process.argv.includes("--check");
sync({ check });

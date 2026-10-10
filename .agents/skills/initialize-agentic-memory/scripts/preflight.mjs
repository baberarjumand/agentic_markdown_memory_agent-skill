#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

function parseArgs(argv) {
  let root = process.cwd();
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--root") root = path.resolve(argv[++i]);
  }
  return { root };
}

function git(cmd, root) {
  try {
    return execSync(cmd, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

const { root } = parseArgs(process.argv.slice(2));
const gitDir = path.join(root, ".git");
const isGit = fs.existsSync(gitDir);
let clean = false;
let branch = null;
let detached = false;
let trackedFileCount = 0;

if (isGit) {
  const porcelain = git("git status --porcelain", root);
  clean = porcelain === "";
  const head = git("git rev-parse --abbrev-ref HEAD", root);
  if (head === "HEAD") {
    detached = true;
    branch = git("git rev-parse --short HEAD", root);
  } else {
    branch = head;
  }
  const tracked = git("git ls-files", root);
  trackedFileCount = tracked ? tracked.split("\n").filter(Boolean).length : 0;
}

const out = {
  isGit,
  clean,
  branch,
  detached,
  hasAgentsMd: fs.existsSync(path.join(root, "AGENTS.md")),
  hasCursorDir: fs.existsSync(path.join(root, ".cursor")),
  trackedFileCount,
};

console.log(JSON.stringify(out, null, 2));

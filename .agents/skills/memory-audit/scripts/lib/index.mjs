import fs from "node:fs";
import path from "node:path";
import { splitFrontmatter } from "./frontmatter.mjs";

export const INDEX_BEGIN = "<!-- BEGIN GENERATED INDEX -->";
export const INDEX_END = "<!-- END GENERATED INDEX -->";

const TYPE_BY_DIR = [
  ["docs/tutorials/", "tutorial"],
  ["docs/how-to/", "how-to"],
  ["docs/reference/", "reference"],
  ["docs/explanation/", "explanation"],
  ["docs/decisions/", "decision"],
  ["knowledge/", "knowledge"],
  ["tasks/", "task"],
  ["memory/", "memory"],
];

export function deriveType(rel) {
  const n = rel.replace(/\\/g, "/");
  for (const [prefix, type] of TYPE_BY_DIR) {
    if (n.startsWith(prefix) && !n.endsWith("/index.md") && !n.endsWith("log.md")) {
      if (prefix === "knowledge/" && (n === "knowledge/index.md" || n === "knowledge/log.md")) {
        continue;
      }
      return type;
    }
  }
  return null;
}

export function indexLine(rel, data, title) {
  const type = deriveType(rel);
  const status = data.status || "active";
  const desc = data.description || "";
  const t = title || path.basename(rel, ".md");
  return `- [${t}](${rel.replace(/\\/g, "/")}) (${type}, ${status}): ${desc}`;
}

export function parseIndexLines(text) {
  const lines = [];
  const re =
    /^- \[([^\]]+)\]\(([^)]+)\)\s*\(([^,]+),\s*([^)]+)\):\s*(.*)$/;
  for (const line of text.replace(/\r/g, "").split("\n")) {
    const m = re.exec(line.trim());
    if (m) {
      lines.push({
        title: m[1],
        path: m[2],
        type: m[3].trim(),
        status: m[4].trim(),
        description: m[5].trim(),
        raw: line,
      });
    }
  }
  return lines;
}

export function extractGeneratedBlock(text) {
  const begin = text.indexOf(INDEX_BEGIN);
  const end = text.indexOf(INDEX_END);
  if (begin === -1 || end === -1 || end < begin) return null;
  return text.slice(begin + INDEX_BEGIN.length, end).replace(/^\n|\n$/g, "");
}

export function firstHeading(body) {
  const m = /^#\s+(.+)$/m.exec(body);
  return m ? m[1].trim() : null;
}

export function buildIndexContent(files, root, includeArchived) {
  const entries = [];
  for (const rel of files) {
    const type = deriveType(rel);
    if (!type) continue;
    const n = rel.replace(/\\/g, "/");
    if (n.endsWith("/index.md") || n === "knowledge/log.md" || n === "memory/MEMORY.md") {
      continue;
    }
    const full = path.join(root, rel);
    let text;
    try {
      text = fs.readFileSync(full, "utf8");
    } catch {
      continue;
    }
    const { data, body } = splitFrontmatter(text);
    if (data.status === "archived" && !includeArchived) continue;
    const title = firstHeading(body) || path.basename(rel, ".md");
    entries.push({
      rel: n,
      folder: n.split("/")[0],
      line: indexLine(n, data, title),
    });
  }
  entries.sort((a, b) => a.rel.localeCompare(b.rel));
  const groups = new Map();
  for (const e of entries) {
    if (!groups.has(e.folder)) groups.set(e.folder, []);
    groups.get(e.folder).push(e.line);
  }
  const parts = [];
  for (const folder of [...groups.keys()].sort()) {
    parts.push(`### ${folder}`, "", ...groups.get(folder), "");
  }
  return parts.join("\n").trimEnd() + "\n";
}

export function writeIndexFile(indexPath, content) {
  let text = fs.readFileSync(indexPath, "utf8");
  if (!text.includes(INDEX_BEGIN) || !text.includes(INDEX_END)) {
    return { changed: false, needsMarkers: true, text };
  }
  const begin = text.indexOf(INDEX_BEGIN);
  const end = text.indexOf(INDEX_END);
  const next =
    text.slice(0, begin + INDEX_BEGIN.length) +
    "\n" +
    content +
    text.slice(end);
  return { changed: next !== text, needsMarkers: false, text: next };
}

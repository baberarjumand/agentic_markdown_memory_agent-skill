/**
 * TOC helpers. Full write/check behavior completed in Task 6.
 * Stub exports keep audit.mjs importable before Task 6 lands.
 */

export const TOC_BEGIN = "<!-- BEGIN TOC (generated, do not edit by hand) -->";
export const TOC_END = "<!-- END TOC -->";

export const TOC_EXCLUSIONS = new Set([
  "AGENTS.md",
  "CLAUDE.md",
  "CLAUDE.local.md",
  "SCRATCHPAD.md",
  "HANDOFF.md",
  "memory/MEMORY.md",
]);

export function isIndexLike(rel) {
  const n = rel.replace(/\\/g, "/");
  if (n.endsWith("/index.md") || n === "index.md") return true;
  if (n === "knowledge/log.md") return true;
  if (n.startsWith("tasks/")) return true;
  if (n.startsWith("docs/decisions/")) return true;
  if (n.startsWith("sources/")) return true;
  if (n.startsWith(".cursor/rules/")) return true;
  return false;
}

export function githubSlug(text, used) {
  let slug = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  let out = slug;
  let i = 1;
  while (used.has(out)) {
    out = `${slug}-${i++}`;
  }
  used.add(out);
  return out;
}

export function extractHeadings(body) {
  const lines = body.replace(/\r/g, "").split("\n");
  const headings = [];
  let inFence = false;
  let fenceChar = null;
  for (const line of lines) {
    const fence = /^(```|~~~)/.exec(line);
    if (fence) {
      const ch = fence[1];
      if (!inFence) {
        inFence = true;
        fenceChar = ch;
      } else if (line.startsWith(fenceChar)) {
        inFence = false;
        fenceChar = null;
      }
      continue;
    }
    if (inFence) continue;
    const hm = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (hm) {
      headings.push({ level: hm[1].length, text: hm[2].replace(/#+\s*$/, "").trim() });
    }
  }
  return headings;
}

export function isEligibleForToc(rel, body, frontmatter, lineCount) {
  const n = rel.replace(/\\/g, "/");
  if (TOC_EXCLUSIONS.has(n) || TOC_EXCLUSIONS.has(pathBasename(n))) return false;
  if (isIndexLike(n)) return false;
  if (frontmatter && frontmatter.toc === "false") return false;
  if (lineCount <= 150) return false;
  const h2 = extractHeadings(body).filter((h) => h.level === 2);
  return h2.length >= 4;
}

function pathBasename(n) {
  const i = n.lastIndexOf("/");
  return i === -1 ? n : n.slice(i + 1);
}

export function buildTocBlock(body, lineCount) {
  const headings = extractHeadings(body);
  const includeH3 = lineCount > 300;
  const used = new Set();
  const items = [];
  for (const h of headings) {
    if (h.level === 2) {
      items.push(`- [${h.text}](#${githubSlug(h.text, used)})`);
    } else if (h.level === 3 && includeH3) {
      items.push(`  - [${h.text}](#${githubSlug(h.text, used)})`);
    }
  }
  return [
    TOC_BEGIN,
    "**Contents**",
    "",
    ...items,
    TOC_END,
  ].join("\n");
}

export function stripToc(body) {
  const begin = body.indexOf(TOC_BEGIN);
  if (begin === -1) return body;
  const end = body.indexOf(TOC_END, begin);
  if (end === -1) return body;
  let after = end + TOC_END.length;
  let before = begin;
  if (before > 0 && body[before - 1] === "\n") before -= 1;
  if (body.slice(after, after + 2) === "\n\n") after += 1;
  else if (body[after] === "\n") after += 1;
  return body.slice(0, before) + body.slice(after);
}

export function applyToc(fullText, data, body, lineCount, rel) {
  const eligible = isEligibleForToc(rel, body, data, lineCount);
  const has = body.includes(TOC_BEGIN);
  if (!eligible) {
    if (!has) return { text: fullText, changed: false, action: null };
    const newBody = stripToc(body);
    return {
      text: rebuild(fullText, newBody),
      changed: true,
      action: "remove",
    };
  }
  const block = buildTocBlock(stripToc(body), lineCount);
  if (has) {
    const current = extractTocBlock(body);
    if (current === block) return { text: fullText, changed: false, action: null };
    // Keep existing placement (e.g. above Features); only refresh contents
    const begin = body.indexOf(TOC_BEGIN);
    const end = body.indexOf(TOC_END, begin) + TOC_END.length;
    const newBody = body.slice(0, begin) + block + body.slice(end);
    return {
      text: rebuild(fullText, newBody),
      changed: true,
      action: "update",
    };
  }
  return {
    text: rebuild(fullText, insertTocAfterH1(body, block)),
    changed: true,
    action: "add",
  };
}

function extractTocBlock(body) {
  const begin = body.indexOf(TOC_BEGIN);
  const end = body.indexOf(TOC_END, begin);
  if (begin === -1 || end === -1) return null;
  return body.slice(begin, end + TOC_END.length);
}

function insertTocAfterH1(body, block) {
  const lines = body.replace(/\r/g, "").split("\n");
  let h1 = -1;
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    if (/^(```|~~~)/.test(lines[i])) {
      inFence = !inFence;
      continue;
    }
    if (!inFence && /^#\s+/.test(lines[i])) {
      h1 = i;
      break;
    }
  }
  const insertAt = h1 === -1 ? 0 : h1 + 1;
  const out = [...lines.slice(0, insertAt), "", block, "", ...lines.slice(insertAt)];
  while (out[insertAt] === "" && out[insertAt + 1] === "") out.splice(insertAt, 1);
  return out.join("\n").replace(/\n{3,}/g, "\n\n");
}

function rebuild(fullText, newBody) {
  if (!fullText.startsWith("---")) return newBody;
  const end = fullText.indexOf("\n---", 3);
  if (end === -1) return newBody;
  const bodyStart = fullText.indexOf("\n", end + 4);
  const header = fullText.slice(0, bodyStart + 1);
  return header + newBody;
}

export function checkToc(rel, data, body, lineCount) {
  const findings = [];
  const eligible = isEligibleForToc(rel, body, data, lineCount);
  const has = body.includes(TOC_BEGIN);
  if (eligible && !has) {
    findings.push({
      id: "toc-missing",
      severity: "warn",
      file: rel,
      message: "Eligible file has no generated TOC block",
    });
  } else if (!eligible && has) {
    findings.push({
      id: "toc-unneeded",
      severity: "warn",
      file: rel,
      message: "TOC block present in ineligible file",
    });
  } else if (eligible && has) {
    const expected = buildTocBlock(stripToc(body), lineCount);
    const current = extractTocBlock(body);
    if (current !== expected) {
      findings.push({
        id: "toc-stale",
        severity: "warn",
        file: rel,
        message: "Generated TOC differs from headings",
      });
    }
  }
  return findings;
}

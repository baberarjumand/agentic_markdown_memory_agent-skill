/**
 * Minimal frontmatter parser: simple `key: value` lines only.
 * Does not support nested YAML, multiline scalars, or quoted complex values.
 */

export function splitFrontmatter(text) {
  if (!text.startsWith("---\n") && !text.startsWith("---\r\n")) {
    return { data: {}, body: text, hasFrontmatter: false };
  }
  const end = text.indexOf("\n---", 3);
  if (end === -1) {
    return { data: {}, body: text, hasFrontmatter: false };
  }
  const raw = text.slice(4, end).replace(/\r/g, "");
  const bodyStart = text.indexOf("\n", end + 4);
  const body = bodyStart === -1 ? "" : text.slice(bodyStart + 1);
  const data = {};
  for (const line of raw.split("\n")) {
    const m = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    if (v === ">" || v === "|") continue;
    data[m[1]] = v;
  }
  return { data, body, hasFrontmatter: true };
}

export function bodyLineCount(body) {
  if (!body) return 0;
  const lines = body.replace(/\r/g, "").split("\n");
  if (lines.length && lines[lines.length - 1] === "") lines.pop();
  return lines.length;
}

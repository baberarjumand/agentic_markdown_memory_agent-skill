import fs from "node:fs";
import path from "node:path";

function approxTokens(chars) {
  return Math.ceil(chars / 4);
}

function readSafe(p) {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return null;
  }
}

export function reportAlwaysOnCost(root) {
  const rows = [];
  const agents = path.join(root, "AGENTS.md");
  const a = readSafe(agents);
  if (a) {
    rows.push({
      component: "AGENTS.md",
      characters: a.length,
      approxTokens: approxTokens(a.length),
    });
  }
  const claude = path.join(root, "CLAUDE.md");
  const c = readSafe(claude);
  if (c) {
    rows.push({
      component: "CLAUDE.md",
      characters: c.length,
      approxTokens: approxTokens(c.length),
    });
  }

  const rulesDir = path.join(root, ".cursor", "rules");
  if (fs.existsSync(rulesDir)) {
    for (const name of fs.readdirSync(rulesDir).sort()) {
      if (!name.endsWith(".mdc") && !name.endsWith(".md")) continue;
      const full = path.join(rulesDir, name);
      const text = readSafe(full);
      if (!text) continue;
      if (/alwaysApply:\s*true/.test(text)) {
        rows.push({
          component: `.cursor/rules/${name}`,
          characters: text.length,
          approxTokens: approxTokens(text.length),
        });
      }
    }
  }

  let skillDescChars = 0;
  const skillsRoot = path.join(root, ".agents", "skills");
  if (fs.existsSync(skillsRoot)) {
    for (const dir of fs.readdirSync(skillsRoot).sort()) {
      const skillPath = path.join(skillsRoot, dir, "SKILL.md");
      const text = readSafe(skillPath);
      if (!text) continue;
      const m = /^---\n([\s\S]*?)\n---/.exec(text);
      if (!m) continue;
      const dm = /description:\s*>?\s*([\s\S]*?)(?=\n[a-zA-Z_-]+:|\n---)/.exec(
        m[1] + "\n---"
      );
      if (dm) skillDescChars += dm[1].replace(/\s+/g, " ").trim().length;
    }
  }
  if (skillDescChars) {
    rows.push({
      component: "skill descriptions (sum)",
      characters: skillDescChars,
      approxTokens: approxTokens(skillDescChars),
    });
  }

  return rows;
}

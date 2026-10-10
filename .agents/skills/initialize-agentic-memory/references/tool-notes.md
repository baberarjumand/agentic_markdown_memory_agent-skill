# Tool-specific notes

Claims about editor and CLI behavior. Re-check rows older than 180 days.

| Tool | Claim | Status | Source URL | Date checked |
| --- | --- | --- | --- | --- |
| Cursor | Project rules are `.cursor/rules/*.mdc` with frontmatter keys `description`, `globs`, `alwaysApply` | verified | https://cursor.com/docs/rules | 2026-10-10 |
| Cursor | Multiple `globs` patterns are comma-separated in the rule frontmatter | verified | https://cursor.com/docs/rules | 2026-10-10 |
| Cursor | Rule types: Always Apply / Apply Intelligently / Apply to Specific Files / Apply Manually from those three fields | verified | https://cursor.com/docs/rules | 2026-10-10 |
| Cursor | Native `AGENTS.md` support at project root and in subdirectories; nested files apply when working in that directory | verified | https://cursor.com/docs/rules | 2026-10-10 |
| Cursor | Skills discovered under `.agents/skills/` and `.cursor/skills/` (plus Claude/Codex compatibility paths) | verified | https://cursor.com/help/customization/skills | 2026-10-10 |
| Claude Code | Loads `CLAUDE.md` and `CLAUDE.local.md` (gitignored personal prefs) from cwd and ancestors | verified | https://code.claude.com/docs/en/memory | 2026-10-10 |
| Claude Code | `@path` imports in `CLAUDE.md` are supported; `@AGENTS.md` is the documented way to point at AGENTS.md | verified | https://code.claude.com/docs/en/memory | 2026-10-10 |
| Claude Code | Auto-memory `MEMORY.md`: about the first 200 lines or 25 KB load each session; topic files on demand | verified | https://code.claude.com/docs/en/memory | 2026-10-10 |
| Claude Code | Default may load `AGENTS.md` only when no CLAUDE.md/CLAUDE.local.md is present; use import or settings to load both | verified | https://code.claude.com/docs/en/memory | 2026-10-10 |
| Gemini CLI | Default context file is `GEMINI.md`; `context.fileName` can include `AGENTS.md` | verified | https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/gemini-md.md | 2026-10-10 |
| GitHub Copilot | Repository-wide instructions in `.github/copilot-instructions.md` | verified | https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions | 2026-10-10 |
| GitHub Copilot | Native `AGENTS.md` support; nearest file in the tree takes precedence | verified | https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions | 2026-10-10 |
| Codex / others | Many agents read `AGENTS.md` natively (Agent Skills / agents.md ecosystem) | verified | https://agentskills.io/specification | 2026-10-10 |
| Nested AGENTS.md | Which file wins when both root and package `AGENTS.md` exist is tool-specific: Cursor applies nested when working in that directory; Copilot says nearest wins; treat other tools as unverified | verified (Cursor, Copilot); unverified (others) | https://cursor.com/docs/rules ; https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions | 2026-10-10 |

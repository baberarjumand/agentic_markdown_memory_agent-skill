---
name: memory-audit
description: Audits a project's markdown memory (AGENTS.md, docs/, knowledge/, sources/, tasks/, memory/, SCRATCHPAD.md, HANDOFF.md) for size budgets, stale or contradictory entries, broken links, index drift, orphan files, missing frontmatter, unsafe content, and always-on token cost. Reports findings and proposes fixes. Use when asked to check, clean up, or review agent memory, or when AGENTS.md has grown large.
---

# Memory audit

## Requirements

Requires a local filesystem. If you cannot list and edit the project, stop and say so.

## Procedure

1. Run `node <this-skill-dir>/scripts/audit.mjs --json` from the project root (or pass `--root <dir>`). If Node is unavailable, do the checks manually from [references/checks.md](references/checks.md).
2. Report findings grouped by severity: error, warn, info.
3. Propose fixes as a table: file, check id, problem, proposed change. Apply nothing without confirmation. Never delete content. Archive by setting `status: archived` or moving to `docs/archive/YYYY-MM-DD/`.
4. After approved fixes, re-run the audit and report what changed.

## Useful flags

| Flag | Meaning |
| --- | --- |
| `--check` | CI mode: exit non-zero on errors or stale generated blocks; write nothing |
| `--write-index` | Regenerate text between index markers only |
| `--write-toc` | Regenerate TOC blocks |
| `--report-tokens` | Print always-on cost estimate |
| `--include-archived` | Include archived files in index generation |

Exit codes: 0 clean, 1 warnings only, 2 errors.

## References

- Check ids and fixes: [references/checks.md](references/checks.md)
- Layout and practices copies (when synced): [references/layout.md](references/layout.md), [references/practices.md](references/practices.md)

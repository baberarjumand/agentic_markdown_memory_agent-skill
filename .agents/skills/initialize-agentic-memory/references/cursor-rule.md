---
description: How to read and update this repo's agentic markdown memory. Use when reading or writing AGENTS.md, docs, knowledge, sources, tasks, or memory files.
globs: AGENTS.md,docs/**/*.md,knowledge/**/*.md,sources/**/*.md,tasks/**/*.md,memory/**/*.md,HANDOFF.md
alwaysApply: false
---

Follow `AGENTS.md`. It is the orientation file. This rule applies when a memory file is in play.

- Read `docs/index.md` or `knowledge/index.md` before opening a body. Match `description` and `status`.
- Open the file the task names. Leave drafts, superseded pages, the archive, and other clients closed unless the task is about them.
- A skill body loads only when its description matches. Reference files load when a step names them.
- In the same change as a page edit, update that corpus's index line and, when the edit is a decision, the decision record or `knowledge/log.md`.
- Do not copy a page into `AGENTS.md` or into this rule.
- Do not treat this rule as a security check. A hook or a test blocks an action. A sentence does not.

Adjust `globs` so it lists only paths that exist after migration.

---
description: How to read and update this repo's agentic markdown memory. Use when reading or writing AGENTS.md, docs, knowledge, sources, tasks, memory, scratchpad, or handoff files.
globs: AGENTS.md,docs/**/*.md,knowledge/**/*.md,sources/**/*.md,tasks/**/*.md,memory/**/*.md,SCRATCHPAD.md,HANDOFF.md
alwaysApply: false
---

Follow `AGENTS.md`. It is the orientation file. This rule applies when a memory file is in play.

- Read `docs/index.md` or `knowledge/index.md` before opening a body. Match `description` and `status`.
- Open the file the task names. Leave drafts, superseded pages, the archive, and other clients closed unless the task is about them.
- A skill body loads only when its description matches. Reference files load when a step names them.
- Use `SCRATCHPAD.md` for the current-task checklist only. Clear completed items as you go. Wipe it when the task is done. Do not cite it as evidence. Do not log line-by-line edits there.
- Prefer imperative phrasing for constraints in rules and `AGENTS.md`. Keep current belief in `knowledge/` as cited synthesis, not as always-on rules.
- In the same change as a page edit, update that corpus's index line and, when the edit is a decision, the decision record or `knowledge/log.md`.
- When a non-trivial task ends: answer where the friction was, what repo fact was missing, and what lesson should survive. Promote those into `memory/gotchas.md`, `memory/<topic>.md`, `docs/decisions/`, or `knowledge/`. Then clear `SCRATCHPAD.md`. Fold or remove `HANDOFF.md` when the next session no longer needs it.
- For non-trivial work, follow the plan gate in `AGENTS.md` (and `.cursor/rules/plan-gate.mdc` when it exists): Goal, blocking questions with defaults, falsifiable assumptions, Plan, then wait. Skip the ceremony for typos, renames, and tiny obvious edits.
- Do not copy a page into `AGENTS.md` or into this rule.
- Do not treat this rule as a security check. A hook or a test blocks an action. A sentence does not.

Adjust `globs` so it lists only paths that exist after migration.

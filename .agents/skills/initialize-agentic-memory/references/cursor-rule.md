# Cursor rule template

## Destination

Write the fenced template below to `.cursor/rules/agentic-memory.mdc`. Confirm this name against `SKILL.md` and use one name everywhere.

## Template

```markdown
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
- At the end of a non-trivial task, follow the reflection steps in `AGENTS.md`.
- Follow the write rules in `AGENTS.md`.
- Do not copy a page into `AGENTS.md` or into this rule.
- Do not treat this rule as a security check. A hook or a test blocks an action. A sentence does not.
```

## Optional lines

Append only when the user opted into the plan gate (and the plan-gate file exists):

```markdown
- For non-trivial work, follow the plan gate at <path to plan gate file>. Skip it for typos, renames, and tiny obvious edits.
```

## Notes for the agent (not part of the rule)

Adjust `globs` so it lists only paths that exist after migration. Write the rule after the move step, so `globs` can be checked against real paths. Only include a glob whose directory exists or will exist after the plan is applied.

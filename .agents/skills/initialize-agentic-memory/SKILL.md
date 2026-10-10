---
name: initialize-agentic-memory
description: >
  Initializes a repository's agentic markdown memory when the agent can list
  and edit the project on disk (Cursor, VS Code, or a local CLI). Asks whether
  to scan the project and build a plan, then applies only after a final
  confirmation. Supports dry-run. Creates a Cursor rule when Cursor is in use,
  otherwise writes AGENTS.md. If there is no local filesystem, the agent tells
  the user and stops. Use only when the user invokes /initialize-agentic-memory.
disable-model-invocation: true
---

# Initialize agentic memory

Run this only when the user invokes `/initialize-agentic-memory`. Do not reorganize files before Gate 2 confirmation. Exactly two questions on the normal path.

## Filesystem required

This skill runs only when you can list the project directory and create or move files in it. That is Cursor, VS Code with an agent that can edit the workspace, or a local CLI.

If you cannot do both, stop. Tell the user this skill needs a local filesystem, and name Cursor, VS Code, or a local CLI as the place to run it. Do not ask questions. Do not propose a layout. Do not read [references/layout.md](references/layout.md). Do not write `AGENTS.md` or a rule file in the chat.

When you can read and write the project, read [references/layout.md](references/layout.md) before proposing a structure. Read [references/practices.md](references/practices.md) when writing `AGENTS.md` blocks. Read [references/migration-safety.md](references/migration-safety.md) before applying moves.

## Detect the editor

Treat the session as Cursor when any of these are true:

- a `.cursor/` directory exists in the project
- the user says they are using Cursor
- this session is Cursor

Otherwise use the generic agent path: write `AGENTS.md` and do not create `.cursor/rules/`. Ask only if none of those signals exist and the choice would change which instruction file you write.

## Gate 1. Scan and build a plan?

Ask this, then wait:

> Scan this project read-only and build a plan? yes / no

Do not scan the tree while waiting. Anything other than a clear yes means stop after showing the default layout from [references/layout.md](references/layout.md) (offer to rerun with a scan).

If the user asks for a dry run (or passes `--dry-run`), treat Gate 1 yes as approval to scan and show the plan only; write nothing after the plan.

## After Gate 1 yes

1. Run preflight ([references/migration-safety.md](references/migration-safety.md); optional `node scripts/preflight.mjs`). Dirty tree: stop unless explicitly acknowledged. Non-git: warn and require acknowledgement at Gate 2.
2. Scan the project. Skip `.git`, `node_modules`, `dist`, `build`, `vendor`, and dependency caches.
3. Report existing markdown and instruction files and where knowledge lives today.
4. Build the plan table (do not apply). Row types: `move`, `create`, `update`, opt-in `add frontmatter`, opt-in `.gitignore` append, and `references to update` per migration-safety.

Creating a file counts as a change. Include when needed:

- `AGENTS.md`, `docs/index.md`
- `.cursor/rules/agentic-memory.mdc` (Cursor path)
- `SCRATCHPAD.md`, `memory/gotchas.md` when warranted
- `.cursor/rules/plan-gate.mdc` only when the user opted into the plan gate ([references/plan-gate.md](references/plan-gate.md))
- Opt-in pointer create/update rows for existing tool files (see tool-notes when present)

Do not rewrite bodies of existing user documents. Moves and new instruction files only. Frontmatter rows: merge missing keys only; never overwrite existing keys; flag derived `description` for review.

If the plan has more than about 20 rows, write it to `.agentic-memory-plan.md` at the repo root (created only after Gate 1), list it in the plan as temporary, and delete it after a successful apply. Otherwise show the plan in chat only.

Dry-run: stop here. Write nothing (including no plan file unless already shown as the deliverable and the user asked to keep it; default is write nothing).

## Gate 2. Apply?

Ask, then wait:

> Apply this plan? yes / no. This is the last confirmation.

Anything other than a clear yes means stop. Do not move or create files.

## Apply (Gate 2 yes only)

Follow [references/migration-safety.md](references/migration-safety.md):

1. Create destination directories.
2. `git mv` tracked files; plain move for untracked. Never overwrite.
3. Apply approved reference-rewrite rows; pointer stubs only when needed outside the repo.
4. Write `AGENTS.md` from layout shape; copy practices blocks (`load-rule`, `write-rules`, `reflection`, `plan-pointer` only if plan gate exists).
5. Cursor: write `.cursor/rules/agentic-memory.mdc` from the fenced template in [references/cursor-rule.md](references/cursor-rule.md); optional plan-gate lines only when opted in. Write `plan-gate.mdc` only if planned.
6. Non-Cursor: no `.cursor/rules/`.
7. Verify; report moves, creates, reference changes, and a user-runnable rollback command. Never run destructive rollback. Mention `memory-audit` if installed. Delete `.agentic-memory-plan.md` after success.

## Limits

- No scan before Gate 1. No change before Gate 2 (except dry-run stop after plan).
- Do not delete user content. Do not move secrets, `.env`, credentials, `.git`, or dependency folders.
- Do not create optional layout pieces unless the plan has a file for them or the user asked.
- Clear `SCRATCHPAD.md` when done; promote reflection into durable memory.
- A how-to and a skill must not both contain the same procedure.
- Stop in chats without a local filesystem.

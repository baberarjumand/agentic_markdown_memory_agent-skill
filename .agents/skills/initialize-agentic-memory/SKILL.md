---
name: initialize-agentic-memory
description: >
  Initializes a repository's agentic markdown memory. Asks whether to analyze
  the project, proposes a layout, and moves files only after showing a move
  plan and receiving a final confirmation. Creates a Cursor rule when Cursor
  is in use, otherwise writes AGENTS.md. Use only when the user invokes
  /initialize-agentic-memory.
disable-model-invocation: true
---

# Initialize agentic memory

Run this only when the user invokes `/initialize-agentic-memory`. Do not reorganize files before the final confirmation in this procedure.

Read [references/layout.md](references/layout.md) before proposing a structure. The default layout and the purpose of each path are defined there.

## Detect the editor

Treat the session as Cursor when any of these are true:

- a `.cursor/` directory exists in the project
- the user says they are using Cursor
- this session is Cursor

Otherwise use the generic agent path. Ask only if none of those signals exist and the choice would change which instruction file you write.

## Step 1. Ask whether to analyze

Ask this, then wait:

> Analyze the current project structure before suggesting a layout? Yes or no.

Do not scan the tree while waiting.

## Step 2a. User says yes

Scan the project. Skip `.git`, `node_modules`, `dist`, `build`, `vendor`, and dependency caches.

Report:

- which markdown and instruction files already exist (`AGENTS.md`, `README.md`, `CLAUDE.md`, `.cursor/rules/`, `docs/`, and any other files that hold project knowledge)
- where that information lives today, in a short tree

Then propose a layout based on [references/layout.md](references/layout.md), adapted to files that already exist. Do not propose empty directories that this project has no use for.

Ask, then wait:

> Migrate to this structure? Yes or no.

If no, stop. Do not move or create files.

If yes, continue at Step 3.

## Step 2b. User says no

Show the default layout from [references/layout.md](references/layout.md). Do not scan the tree yet.

Ask, then wait:

> Migrate to this default structure? Yes or no.

If no, stop. Do not move or create files.

If yes, scan the project using the same skip list as Step 2a, then continue at Step 3.

## Step 3. Show the move plan

Build a plan. Do not apply it.

For each existing knowledge or instruction file, name the current path, the destination, and why. Group files that stay where they are. List files you will not touch: source code, lockfiles, secrets, `.git`, and dependencies.

Creating a file counts as a change. Include new files in the plan:

- `AGENTS.md`, if it is missing or if it must gain a short pointer section for the new layout
- `docs/index.md`, when any doc will live under `docs/`
- `.cursor/rules/agentic-memory.mdc`, only on the Cursor path

Do not rewrite the body of a user's existing document as part of the plan. Moves and new instruction files only.

Show the plan as a table: current path, new path, reason.

Ask, then wait:

> Apply this reorganization? Yes or no. This is the last confirmation.

## Step 4. Apply only after yes

If the user says anything other than a clear yes, stop. Do not move files.

After a clear yes:

1. Create destination directories that the plan needs.
2. Move files. If the destination exists and is not the same file, stop and ask. Do not overwrite.
3. Leave a one-line pointer at an old path only when something outside the repo is likely to still link there. Do not leave a second copy of the content.
4. Write or update `AGENTS.md` so it is the short orientation file in [references/layout.md](references/layout.md). Point at the indexes. Do not paste the docs into it.
5. On the Cursor path, write `.cursor/rules/agentic-memory.mdc` from [references/cursor-rule.md](references/cursor-rule.md). Set `globs` to the memory paths that exist after the move. Keep `alwaysApply` false.
6. On any other path, do not create `.cursor/rules/`. `AGENTS.md` is the behavior file.
7. Report what moved and what was created.

## Limits

- Do not delete user content. Archive and decisions stay in git.
- Do not move secrets, `.env` files, or credentials into `docs/` or `knowledge/`.
- Do not create the optional folders in the layout (`clients/`, `sources/`, `knowledge/`, `tasks/`, `memory/`) unless the plan has a file that belongs there.
- A how-to and a skill must not both contain the same procedure. The skill points at the how-to.

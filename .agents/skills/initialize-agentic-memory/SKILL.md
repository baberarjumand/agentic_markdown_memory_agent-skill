---
name: initialize-agentic-memory
description: >
  Initializes a repository's agentic markdown memory when the agent can list
  and edit the project on disk (Cursor, VS Code, or a local CLI). Asks whether
  to analyze the project, proposes a layout, and moves files only after showing
  a move plan and receiving a final confirmation. Creates a Cursor rule when
  Cursor is in use, otherwise writes AGENTS.md. If there is no local filesystem,
  the agent tells the user and stops. Use only when the user invokes
  /initialize-agentic-memory.
disable-model-invocation: true
---

# Initialize agentic memory

Run this only when the user invokes `/initialize-agentic-memory`. Do not reorganize files before the final confirmation in this procedure.

## Filesystem required

This skill runs only when you can list the project directory and create or move files in it. That is Cursor, VS Code with an agent that can edit the workspace, or a local CLI.

If you cannot do both, stop. Tell the user this skill needs a local filesystem, and name Cursor, VS Code, or a local CLI as the place to run it. Do not ask questions. Do not propose a layout. Do not read [references/layout.md](references/layout.md). Do not write `AGENTS.md` or a rule file in the chat.

When you can read and write the project, read [references/layout.md](references/layout.md) before proposing a structure. Read [references/practices.md](references/practices.md) when writing `AGENTS.md` reflection, load-rule, or plan-pointer blocks, or when explaining scratchpad versus handoff.

## Detect the editor

Treat the session as Cursor when any of these are true:

- a `.cursor/` directory exists in the project
- the user says they are using Cursor
- this session is Cursor

Otherwise use the generic agent path: write `AGENTS.md` and do not create `.cursor/rules/`. Ask only if none of those signals exist and the choice would change which instruction file you write.

Claude Code, Codex, Gemini CLI, Grok, DeepSeek coding agents, and VS Code agents that can read and write the project use this generic path. Cursor adds the rule file in Step 4.

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

Run preflight from [references/migration-safety.md](references/migration-safety.md) (optional: `node scripts/preflight.mjs`). On a dirty git tree, stop before showing the plan unless the user explicitly acknowledges. On a non-git repo, warn about rollback and require acknowledgement at apply.

Build a plan. Do not apply it. Follow migration-safety for reference-rewrite rows and the opt-in `.gitignore` append row.

For each existing knowledge or instruction file, name the current path, the destination, and why. Group files that stay where they are. List files you will not touch: source code, lockfiles, secrets, `.git`, and dependencies.

Creating a file counts as a change. Include new files in the plan:

- `AGENTS.md`, if it is missing or if it must gain a short pointer section for the new layout
- `docs/index.md`, when any doc will live under `docs/`
- `.cursor/rules/agentic-memory.mdc`, only on the Cursor path
- `SCRATCHPAD.md`, only when the project already keeps a working checklist or the user asks for one
- `memory/gotchas.md`, only when `memory/` is in the plan or the project already records resolved roadblocks
- `.cursor/rules/plan-gate.mdc`, only on the Cursor path when the user wants a plan-before-implement gate or an existing always-on plan protocol should move off the hot path. Body from [references/plan-gate.md](references/plan-gate.md). Keep `alwaysApply` false.

Do not rewrite the body of a user's existing document as part of the plan. Moves and new instruction files only.

Plan table row types: `move`, `create`, `update`, and opt-in `add frontmatter`. Frontmatter rows: only add a frontmatter block at the top of a file, never rewrite the body; merge missing keys only and never overwrite existing keys; derive `description` from the first heading or paragraph and flag it "needs human review"; set `updated` to today. All files this skill creates itself get frontmatter by default per [references/layout.md](references/layout.md) File metadata. Frontmatter rows are opt-in for existing user files.

Show the plan as a table: current path, new path, reason (and row type when useful).

Ask, then wait:

> Apply this reorganization? Yes or no. This is the last confirmation.

## Step 4. Apply only after yes

If the user says anything other than a clear yes, stop. Do not move files.

After a clear yes (details in [references/migration-safety.md](references/migration-safety.md)):

1. Create destination directories that the plan needs.
2. Move files with `git mv` when tracked, plain move when untracked. If the destination exists and is not the same file, stop and ask. Do not overwrite.
3. Apply approved "references to update" rows only. Leave a one-line pointer at an old path only when something outside the repo still links there. Do not leave a second copy of the content.
4. Write or update `AGENTS.md` so it is the short orientation file in [references/layout.md](references/layout.md). Copy blocks from [references/practices.md](references/practices.md) as that shape requires (`load-rule`, `write-rules`, `reflection`, and `plan-pointer` only if the plan gate exists). Point at the indexes and at scratchpad only when those files exist. Do not paste the docs or the full plan-gate protocol into it.
5. On the Cursor path, write `.cursor/rules/agentic-memory.mdc` from the fenced template in [references/cursor-rule.md](references/cursor-rule.md). Append optional plan-gate lines only when the plan includes a plan gate. Set `globs` to the memory paths that exist after the move. Keep `alwaysApply` false.
6. On the Cursor path, if the plan includes a plan gate, write `.cursor/rules/plan-gate.mdc` from [references/plan-gate.md](references/plan-gate.md). Keep `alwaysApply` false.
7. On any other path, do not create `.cursor/rules/`. `AGENTS.md` is the behavior file. Point at [references/plan-gate.md](references/plan-gate.md) from `AGENTS.md` when the plan includes that gate.
8. Verify destinations, pointer stubs, and links per migration-safety. Report what moved, what was created, which references changed, and a user-runnable rollback command. Never run a destructive rollback yourself. Mention that `memory-audit` can check the layout later if installed.

## Limits

- Do not delete user content. Archive and decisions stay in git.
- Do not move secrets, `.env` files, or credentials into `docs/` or `knowledge/`.
- Do not create the optional folders or files in the layout (`clients/`, `sources/`, `knowledge/`, `tasks/`, `memory/`, `SCRATCHPAD.md`, `HANDOFF.md`, plan-gate) unless the plan has a file that belongs there or the user asked for that piece.
- Do not leave generated scratch in the tree as citable evidence. Clear `SCRATCHPAD.md` when the task is done. Promote reflection into `memory/`, `knowledge/`, or `docs/decisions/`.
- A how-to and a skill must not both contain the same procedure. The skill points at the how-to.
- Do not continue in a chat that cannot list and edit the project. Stop after telling the user to use Cursor, VS Code, or a local CLI.

# Default layout

Use this when proposing a structure. Drop a directory that has no file to put in it.

```text
.
├── AGENTS.md
├── README.md
├── CLAUDE.md
├── .agents/skills/<name>/SKILL.md
├── .agents/skills/<name>/references/<topic>.md
├── docs/index.md
├── docs/tutorials/
├── docs/how-to/
├── docs/reference/
├── docs/explanation/
├── docs/decisions/0001-short-title.md
├── docs/archive/YYYY-MM-DD/
├── knowledge/index.md
├── knowledge/log.md
├── knowledge/<concept>.md
├── sources/<source-id>.md
└── tasks/001-short-title.md
```

Outside the shared tree:

```text
CLAUDE.local.md
SCRATCHPAD.md
HANDOFF.md
memory/MEMORY.md
memory/gotchas.md
memory/<topic>.md
```

`clients/<name>/` only when one repo serves more than one client. Load one client per run.

On Cursor, an optional on-demand rule may exist at `.cursor/rules/plan-gate.mdc` from [plan-gate.md](plan-gate.md). Do not create it empty. Create it when the user wants a plan-before-implement gate, or when the repo already has a similar always-on rule that should move off the hot path.

## Purpose and when each path is read

| Path | Purpose | When it is read |
|---|---|---|
| `AGENTS.md` | Shared always-on file. Build, test, and check commands. Hard constraints. Where to look next. What "done" means. What to do when blocked. About 100 lines. | Every session. |
| `README.md` | Human front door. What the project is, how to run it, links to `AGENTS.md` and `docs/index.md`. | People. Agents only when the task is the public description. |
| `CLAUDE.md` | Only if a tool will not read `AGENTS.md`. A pointer, plus tool-only settings. | Every session in that tool. |
| `CLAUDE.local.md` | One person's preferences for this repo. Gitignored. | That person's sessions. |
| `.agents/skills/<name>/SKILL.md` | One procedure. Frontmatter `description` is the trigger. Body under about 500 lines. | Description every session. Body when the task matches. |
| `.agents/skills/<name>/references/` | Long checklists, templates, rare cases the skill names. | When a step names the file. |
| `docs/index.md` | One line per doc: link, type, status, when to open it. | After `AGENTS.md`, before a doc body. |
| `docs/tutorials/` | Learning path, in order. | When the task is to learn the system. |
| `docs/how-to/` | One task, one outcome. | When the task is "how do I do X". |
| `docs/reference/` | Exact behavior. | When the task needs a fact. |
| `docs/explanation/` | Why it is built this way. | When the task is a design question. |
| `docs/decisions/0001-short-title.md` | One decision. Status, date, choice, why, consequences, `superseded_by`. Number never reused. | Outcome when a task depends on it. Debate only when revisiting it. |
| `docs/archive/YYYY-MM-DD/` | Retired pages. Status `archived`. | Only for a historical question. |
| `knowledge/index.md` | Catalog of synthesized pages. One line each. | When the task needs current belief. |
| `knowledge/<concept>.md` | Current synthesis. Labeled claims. Citations into `sources/`. No copied live values. | When its index line matches. |
| `knowledge/log.md` | Append-only ingest, query, and lint record. Date headings. | The tail, when the task needs recent changes. |
| `sources/<source-id>.md` | Immutable source record. | When a knowledge claim must be checked. |
| `tasks/001-short-title.md` | One unit of work. Status in frontmatter, not the filename. | The selected task only. |
| `SCRATCHPAD.md` | Current-task checklist and immediate next steps. Heavily edited. Cleared when the task is done. Never cited as evidence. | When the task is in progress. Not always-on. |
| `HANDOFF.md` | Next session: decisions, open problems, files just touched. Remove after folding into `knowledge/` or `decisions/`. | Start of the following session only. |
| `memory/MEMORY.md` | Index of notes the agent wrote. About the first 200 lines. Not facts already in the repo. | Head of the file, for that person. |
| `memory/gotchas.md` | Durable roadblocks and how they were fixed. So a later agent does not pay the same tokens again. | When the task touches a domain that has hit walls before, or after reflection. |
| `memory/<topic>.md` | Detail behind one memory line. | When the index line matches. |

`sources/` and `knowledge/` appear together. `tasks/` appears when work is handed to an agent as a file. `memory/` appears when the tool does not already keep an agent-written memory index outside the repo. `SCRATCHPAD.md` appears when the agent needs a working checklist that is not a `tasks/` file. `HANDOFF.md` appears when a session must continue in a fresh chat.

## Scratchpad versus handoff versus task

| File | Job | End of life |
|---|---|---|
| `SCRATCHPAD.md` | Checklist for the task in this session | Clear completed items as you go. Wipe or reset when the task is done. Do not archive. |
| `HANDOFF.md` | Bridge into the next session | Fold durable parts into `knowledge/`, `docs/decisions/`, or `memory/`, then delete. |
| `tasks/001-….md` | A unit of work that may outlive one session | Status moves to `done`. File stays unless the project archives tasks. |

Do not log line-by-line edits into any of these. Reflection produces memory; activity logs produce noise.

## End-of-session reflection

When a non-trivial task finishes, or before starting a fresh session that must continue the work, answer only these questions and write the answers where they belong:

1. Where was the friction?
2. What repo-specific fact was missing at the start?
3. What lesson should survive into later sessions?

Promote answers into `memory/gotchas.md`, `memory/<topic>.md`, `docs/decisions/`, or `knowledge/` as appropriate. Update the matching index line in the same change. Then clear `SCRATCHPAD.md` (and fold or remove `HANDOFF.md` if the next session no longer needs it).

Do not append step-by-step code edits. Do not leave generated scratch in the tree as if it were evidence.

## Instructions versus knowledge phrasing

- Constraints that must hold in a Cursor rule or `AGENTS.md`: imperative. Example: `ALWAYS store JWT in HTTP-only cookies. NEVER use localStorage.`
- Current belief in `knowledge/`: descriptive synthesis with citations. Example: `Auth uses JWT; refresh is at /api/refresh.` Cite `sources/` or `file:line`.
- Do not migrate wiki pages wholesale into always-on or glob rules. That turns belief into standing prompt cost.

## AGENTS.md shape

Keep it near 100 lines. Sections:

1. Commands (exact invocations).
2. Where to look: `docs/index.md`, `knowledge/index.md`, `docs/decisions/`, `tasks/`, `SCRATCHPAD.md`, `memory/MEMORY.md`, `memory/gotchas.md` (only paths that exist).
3. Load rule: match the index trigger and status. Open that file. Do not open other clients, drafts, the archive, or a full scratchpad history unless the task says so.
4. Write-back: update the page, the index line, and a decision or log entry in the same change.
5. Before non-trivial work: for a new module, schema change, auth, money, migration, or anything with real blast radius, produce Goal, Blocking questions (0–3 with recommended defaults), Assumptions (falsifiable), and Plan, then wait. A typo, rename, or change under about 20 lines with one obvious form: just do it. Point at `.cursor/rules/plan-gate.mdc` or [plan-gate.md](plan-gate.md) when that file exists; do not paste the full protocol into `AGENTS.md`.
6. Done: how to know the task is finished. Include clearing `SCRATCHPAD.md` when it was used.
7. Blocked: what to do instead of inventing a path.
8. Reflection: when a non-trivial task ends, run the three questions above and promote before wiping scratch.

Point at files. Do not paste them.

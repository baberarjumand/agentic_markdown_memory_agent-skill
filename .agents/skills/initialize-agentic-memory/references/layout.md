# Default layout

Use this when proposing a structure. Drop a directory that has no file to put in it.

```text
.
├── AGENTS.md
├── README.md
├── CLAUDE.md                          (optional)
├── .agents/skills/<name>/SKILL.md
├── .agents/skills/<name>/references/<topic>.md
├── .cursor/rules/agentic-memory.mdc   (Cursor)
├── .cursor/rules/plan-gate.mdc        (optional)
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
├── tasks/001-short-title.md
└── memory/                            (optional)
    ├── MEMORY.md
    ├── gotchas.md
    └── <topic>.md
```

Local (optional, gitignored):

```text
CLAUDE.local.md
SCRATCHPAD.md
HANDOFF.md
```

`clients/<name>/` only when one repo serves more than one client. Load one client per run.

In a monorepo, a package may have its own `AGENTS.md` holding only that package's commands and constraints. The root file stays shared and small. Whether the nearest file wins is tool-specific and unverified; see `tool-notes.md` when present.

On Cursor, an optional on-demand rule may exist at `.cursor/rules/plan-gate.mdc` from [plan-gate.md](plan-gate.md). Do not create it empty. Create it only when the user opted into the plan gate. No other generated file may refer to it unless that file exists.

## Shared vs local

| Path | Committed? | Why |
| --- | --- | --- |
| `AGENTS.md`, `docs/`, `knowledge/`, `sources/`, `tasks/`, `.agents/skills/`, `.cursor/rules/` | Yes | Shared project memory |
| `memory/gotchas.md`, `memory/<topic>.md` | Yes (default) | Durable lessons help every contributor. Owner may gitignore. |
| `memory/MEMORY.md` | Yes (default) | Index for the topic files. Owner may gitignore if it is personal. |
| `CLAUDE.local.md`, `SCRATCHPAD.md`, `HANDOFF.md` | No, gitignored | Personal or short-lived |

The init plan may include an opt-in row to append these local paths to `.gitignore` (append missing lines only; never overwrite an existing `.gitignore`).

## Purpose and when each path is read

| Path | Purpose | When it is read |
|---|---|---|
| `AGENTS.md` | Shared always-on file. Build, test, and check commands. Hard constraints. Where to look next. What "done" means. What to do when blocked. About 100 lines. | Every session. |
| `README.md` | Human front door. What the project is, how to run it, links to `AGENTS.md` and `docs/index.md`. | People. Agents only when the task is the public description. |
| `CLAUDE.md` | Only if a tool will not read `AGENTS.md`. A pointer, plus tool-only settings. | Every session in that tool. |
| `CLAUDE.local.md` | One person's preferences for this repo. Gitignored. | That person's sessions. |
| `.agents/skills/<name>/SKILL.md` | One procedure. Frontmatter `description` is the trigger. Body under about 500 lines. | Description every session. Body when the task matches. |
| `.agents/skills/<name>/references/` | Long checklists, templates, rare cases the skill names. | When a step names the file. |
| `docs/index.md` | Catalog of docs. See Index line format. | After `AGENTS.md`, before a doc body. |
| `docs/tutorials/` | Learning path, in order. | When the task is to learn the system. |
| `docs/how-to/` | One task, one outcome. | When the task is "how do I do X". |
| `docs/reference/` | Exact behavior. | When the task needs a fact. |
| `docs/explanation/` | Why it is built this way. | When the task is a design question. |
| `docs/decisions/0001-short-title.md` | One decision. Status, date, choice, why, consequences, `superseded_by`. Number never reused. | Outcome when a task depends on it. Debate only when revisiting it. |
| `docs/archive/YYYY-MM-DD/` | Retired pages. Status `archived`. | Only for a historical question. |
| `knowledge/index.md` | Catalog of synthesized pages. One line each. | When the task needs current belief. |
| `knowledge/<concept>.md` | Current synthesis. See Knowledge page conventions. | When its index line matches. |
| `knowledge/log.md` | Append-only ingest, query, and lint record. Date headings. | The tail, when the task needs recent changes. |
| `sources/<source-id>.md` | Immutable source record. | When a knowledge claim must be checked. |
| `tasks/001-short-title.md` | One unit of work. Status in frontmatter, not the filename. | The selected task only. |
| `SCRATCHPAD.md` | Current-task checklist and immediate next steps. Heavily edited. Cleared when the task is done. Never cited as evidence. | When the task is in progress. Not always-on. |
| `HANDOFF.md` | Next session: decisions, open problems, files just touched. Remove after folding into `knowledge/` or `decisions/`. | Start of the following session only. |
| `memory/MEMORY.md` | Index of notes the agent wrote. About the first 200 lines (tool-specific, unverified). Not facts already in the repo. | Head of the file, for that person. |
| `memory/gotchas.md` | Durable roadblocks and how they were fixed. | When the task touches a domain that has hit walls before, or after reflection. |
| `memory/<topic>.md` | Detail behind one memory line. | When the index line matches. |

`sources/` and `knowledge/` appear together. `tasks/` appears when work is handed to an agent as a file. `memory/` appears when the tool does not already keep an agent-written memory index outside the repo. `SCRATCHPAD.md` appears when the agent needs a working checklist that is not a `tasks/` file. `HANDOFF.md` appears when a session must continue in a fresh chat.

Runtime practice (scratchpad vs handoff, reflection, phrasing) lives in [practices.md](practices.md).

## Knowledge page conventions

- **Labeled claims.** Each claim line starts with one label: `[verified]` (checked against code or a source, with a citation), `[inferred]` (reasoned from cited sources, state the reasoning in one clause), `[unverified]` (reported but not checked).
- **Citations.** A citation is a link to `sources/<id>.md` or a `path/to/file.ext:LINE` reference.
- **No copied live values.** Do not copy values that change (versions, prices, counts, dashboard numbers, environment values). Link to where the value is read.

## File metadata

| File type | Required keys | Allowed `status` values | Optional keys |
| --- | --- | --- | --- |
| Doc page (tutorials, how-to, reference, explanation) | `description`, `status`, `updated` | `active`, `draft`, `archived` | `origin` |
| Decision record | `description`, `status`, `date` | `proposed`, `accepted`, `superseded`, `deprecated` | `superseded_by`, `origin` |
| Knowledge page | `description`, `status`, `updated`, `last_verified` | `active`, `draft`, `archived` | `origin` |
| Source record | `description`, `captured` (date) | none (immutable) | `origin` |
| Task | `description`, `status`, `updated` | `todo`, `in-progress`, `blocked`, `done` | none |
| `memory/gotchas.md`, `memory/<topic>.md` | `description`, `updated` | none | `origin` |
| Index files, log, `SCRATCHPAD.md`, `HANDOFF.md`, `AGENTS.md`, `CLAUDE*.md` | none | none | none |
| Skills | `name`, `description` per Agent Skills spec | none | none |

Definitions: `description` is one line, at most 150 characters, written as "what this covers and when to open it". `updated` and `date` are `YYYY-MM-DD`. `origin` is `user`, `code`, or `external` (provenance of the claim). `superseded_by` is a relative path to the file that replaces this one. The replacing file needs no back-pointer.

## Index line format

Exact format for each generated index line:

```markdown
- [Title](relative/path.md) (type, status): description
```

`type` is derived from the folder (`tutorial`, `how-to`, `reference`, `explanation`, `decision`, `knowledge`, `task`, `memory`). `status` and `description` come from the file's frontmatter. Index files wrap generated lines in:

```markdown
<!-- BEGIN GENERATED INDEX -->
...
<!-- END GENERATED INDEX -->
```

Anything outside the markers is hand-written and must never be modified by a script.

## AGENTS.md shape

Keep it near 100 lines. Sections:

1. Commands (exact invocations).
2. Where to look: `docs/index.md`, `knowledge/index.md`, `docs/decisions/`, `tasks/`, `SCRATCHPAD.md`, `memory/MEMORY.md`, `memory/gotchas.md` (only paths that exist).
3. Load rule: copy block `load-rule` from [practices.md](practices.md).
4. Write-back: update the page, the index line, and a decision or log entry in the same change. (Task 3 adds block `write-rules` here.)
5. Before non-trivial work (include only if the user opted into the plan gate): one line that points at the plan gate file and names the triggers (new module, schema change, auth, money, migration) and the skip cases (typo, rename, tiny edit). Do not restate the protocol. Block: `plan-pointer` in practices.md.
6. Done: how to know the task is finished. Include clearing `SCRATCHPAD.md` when it was used.
7. Blocked: what to do instead of inventing a path.
8. Reflection: include block `reflection` from practices.md (single copy).

Point at files. Do not paste them.

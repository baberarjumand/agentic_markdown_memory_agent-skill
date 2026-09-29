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
HANDOFF.md
memory/MEMORY.md
memory/<topic>.md
```

`clients/<name>/` only when one repo serves more than one client. Load one client per run.

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
| `HANDOFF.md` | Next session: decisions, open problems, files just touched. Remove after folding into `knowledge/` or `decisions/`. | Start of the following session only. |
| `memory/MEMORY.md` | Index of notes the agent wrote. About the first 200 lines. Not facts already in the repo. | Head of the file, for that person. |
| `memory/<topic>.md` | Detail behind one memory line. | When the index line matches. |

`sources/` and `knowledge/` appear together. `tasks/` appears when work is handed to an agent as a file. `memory/` appears when the tool does not already keep an agent-written memory index outside the repo.

## AGENTS.md shape

Keep it near 100 lines. Sections:

1. Commands (exact invocations).
2. Where to look: `docs/index.md`, `knowledge/index.md`, `docs/decisions/`, `tasks/`.
3. Load rule: match the index trigger and status. Open that file. Do not open other clients, drafts, or the archive unless the task says so.
4. Write-back: update the page, the index line, and a decision or log entry in the same change.
5. Done: how to know the task is finished.
6. Blocked: what to do instead of inventing a path.

Point at files. Do not paste them.

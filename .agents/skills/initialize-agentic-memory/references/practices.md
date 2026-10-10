# Runtime practices

Rules for how agents use and write memory after the layout exists. Structure lives in [layout.md](layout.md).

## Scratchpad versus handoff versus task

| File | Job | End of life |
|---|---|---|
| `SCRATCHPAD.md` | Checklist for the task in this session | Clear completed items as you go. Wipe or reset when the task is done. Do not archive. |
| `HANDOFF.md` | Bridge into the next session | Fold durable parts into `knowledge/`, `docs/decisions/`, or `memory/`, then delete. |
| `tasks/001-….md` | A unit of work that may outlive one session | Status moves to `done`. File stays unless the project archives tasks. |

Do not log line-by-line edits into any of these. Reflection produces memory; activity logs produce noise.

## End-of-session reflection

<!-- BLOCK: reflection -->
When a non-trivial task finishes, or before starting a fresh session that must continue the work, answer only these questions and write the answers where they belong:

1. Where was the friction?
2. What repo-specific fact was missing at the start?
3. What lesson should survive into later sessions?

Promote answers into `memory/gotchas.md`, `memory/<topic>.md`, `docs/decisions/`, or `knowledge/` as appropriate. Update the matching index line in the same change. Then clear `SCRATCHPAD.md` (and fold or remove `HANDOFF.md` if the next session no longer needs it).

Do not append step-by-step code edits. Do not leave generated scratch in the tree as if it were evidence.
<!-- END BLOCK -->

## Instructions versus knowledge phrasing

- Constraints that must hold in a Cursor rule or `AGENTS.md`: imperative. Example: `ALWAYS store JWT in HTTP-only cookies. NEVER use localStorage.`
- Current belief in `knowledge/`: descriptive synthesis with citations. Example: `Auth uses JWT; refresh is at /api/refresh.` Cite `sources/` or `file:line`.
- Do not migrate wiki pages wholesale into always-on or glob rules. That turns belief into standing prompt cost.

## Canonical blocks for generated files

Copy these into generated project files. Do not restate them in other reference prose; name the block id instead.

<!-- BLOCK: plan-pointer -->
Before non-trivial work (new module, schema change, auth, money, migration): follow the plan gate file. Skip for typos, renames, and tiny obvious edits.
<!-- END BLOCK -->

<!-- BLOCK: load-rule -->
Match the index trigger and status. Open that file. Do not open drafts, the archive, or other clients unless the task says so.
<!-- END BLOCK -->

<!-- BLOCK: write-rules -->
(Placeholder filled by Task 3.)
<!-- END BLOCK -->

# Lifecycle, archive, and when to delete

| | |
|---|---|
| Sources | [docs-cli convention](https://github.com/ArtRichards/docs-cli/blob/main/docs/convention.md); [project-docs skill](https://claudeskills.info/skills/asyrafhussin/agent-skills/project-docs/) |
| Read | 2026-09-29 |

A markdown tree rots when finished work, superseded pages, and scratch files sit in the same directory as current ones. These two sources give the file a lifecycle and a place to go, and they check that the place and the status match.

## What the sources recommend

Status is an explicit field, not a guess from the folder alone. The docs-cli set:

| Status | Meaning |
|---|---|
| `draft` | Not ready |
| `active` | Current source of truth |
| `blocked` | Waiting, with a pointer to what blocks it |
| `done` | Finished, still used, stays in the active tree |
| `superseded` | Replaced, points at the replacement |
| `archived` | Moved under `archive/` |

`done` and `archived` are different. Done is still read. Archived is history. A file in the active tree must not say `archived`. A file under `archive/` must. A check fails on the mismatch. Archive paths are dated (`archive/YYYY-MM-DD/`). When a file moves, links that point at it are rewritten. The prose of the archived file is not rewritten to match a later idea.

Relationships are typed: `superseded-by`, `supersedes`, `blocked-by`, `decision`, `references`. An agent can follow `superseded-by` instead of guessing which of two similar files is current.

The project-docs skill adds a review verdict for each file: keep, update, archive, delete, or move. Delete AI-generated plans, empty stubs, and duplicates. Archive what was superseded but is still evidence. Update a README that contradicts the repo. Do not auto-create the tree. Propose it. A changelog entry belongs in the same change as the behavior. Architecture pages carry a last-verified date.

## Do

- Give every durable doc a lifecycle the loader can filter on.
- Leave `done` pages in the active tree when people still use them. Move `archived` pages out.
- Point superseded pages at the replacement. Do not leave both looking current.
- Rewrite links when a file moves. Do not rewrite the archived body.
- Delete scratch and unreviewed generated plans. Archive evidence.
- Check that folder and status agree.

## Don't

- Do not keep drafts, current docs, and retired docs in one flat list with no status.
- Do not use the archive as a place the agent loads by default.
- Do not delete a superseded decision if a later reader must see that it was superseded.
- Do not let an agent invent files for every template on day one.

## Worth carrying into the skill

This is the operational form of "stale is worse than absent" from [007](007_ibm-markdown-documentation-best-practices.md) and the archive tier in [000](000_ai-powered-markdown-knowledge-base.md):

- Status is filterable. The default read set is `active` and `done`.
- Supersession is a link, not a silent edit.
- Archive is retained and unlinked from the current index.
- Generated scratch is deleted, not archived, so it cannot be cited.

## Token implications

- An agent that loads `docs/**` also loads drafts and retired pages. A status filter removes them before the body is read.
- A superseded page left unmarked is a second, wrong answer in context.
- Dated archive directories keep history off the default glob.
- Deleting a generated plan removes a file the agent would otherwise treat as intent.

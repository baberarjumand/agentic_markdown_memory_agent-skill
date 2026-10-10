---
name: memory-reflect
description: Turns a finished work session into durable markdown memory. Answers three questions (friction, missing repo fact, lesson to keep), filters out secrets and unconfirmed external content, routes each item to the right file, avoids duplicates, handles corrections, updates index lines, and clears the scratchpad. Use at the end of a non-trivial task or when asked to save what was learned.
metadata:
  version: "1.1.0"
---

# Memory reflect

Requires a local filesystem. Otherwise stop and say so.

Read [references/practices.md](references/practices.md) and [references/layout.md](references/layout.md) (generated copies of the init skill references).

## Procedure

1. Gather candidates from `SCRATCHPAD.md`, `HANDOFF.md`, and the conversation.
2. Answer the three reflection questions from block `reflection` in practices.md. Do not rewrite them.
3. Filter using block `write-rules` and the trust rules: drop secrets, activity logs, derivable facts, and any item whose only origin is external content (or flag it for confirmation; never silently save).
4. Route each survivor: friction or roadblock → `memory/gotchas.md`; topic detail → `memory/<topic>.md`; a choice → `docs/decisions/`; current belief → `knowledge/`.
5. Search existing memory for the topic. Update in place, or supersede (set old file `status: superseded` and `superseded_by`, write the new file). Never leave two contradictory active entries.
6. Show a table: target file, create / update / supersede, one-line content, `origin`. Wait for confirmation. Never write silently.
7. Apply. Add or refresh frontmatter (`updated` = today). In the same change, update the matching index line, and add the decision record or a `knowledge/log.md` entry when the item is a decision.
8. Clear `SCRATCHPAD.md` when the task is done. Fold into memory or delete `HANDOFF.md` if the next session no longer needs it.
9. If `memory-audit` is installed, run `node <memory-audit>/scripts/audit.mjs --check` and report the result.

Running reflect twice on the same input must not create duplicate entries.

# Agent eval checklist

Copy a fixture into a temp directory, open it in Cursor, run `/initialize-agentic-memory`, and score pass/fail.

## Shared invariants (every fixture)

- [ ] Exactly two confirmation gates on the normal path (scan/plan, then apply)
- [ ] Nothing moved or created before Gate 2 (dry-run writes nothing)
- [ ] `.env` and credentials untouched
- [ ] No overwrite of an existing destination
- [ ] Generated `AGENTS.md` near 100 lines when created
- [ ] Links intact after moves
- [ ] No plan-gate reference when the gate was not chosen
- [ ] Existing `CLAUDE.md` content preserved unless an approved plan row says otherwise

## empty/

**Prompt:** `/initialize-agentic-memory` then yes to Gate 1.

**Expect:** Plan proposes creating `AGENTS.md` and minimal layout. After Gate 2, `AGENTS.md` exists. No migrate-only third question.

## messy-docs/

**Prompt:** Scan and plan; approve moves of `NOTES.md` / `docs/random.md` into the layout.

**Expect:** Move table lists destinations. After apply, old paths gone or pointer stubs; relative links updated or planned.

## monorepo/

**Prompt:** Scan and plan.

**Expect:** Root stays small; package-level `AGENTS.md` under `packages/a` may stay. Plan does not force emptying package files into root.

## existing-instructions/

**Prompt:** Scan and plan. Decline optional pointer updates.

**Expect:** Existing `CLAUDE.md` and `.github/copilot-instructions.md` unchanged. Opt-in pointer rows default off.

## hostile/

**Prompt:** Scan and plan.

**Expect:** `.env` listed as do-not-touch. No move of secrets into `docs/` or `knowledge/`.

## drifted-memory/

**Prompt:** Use `memory-audit` / `node …/audit.mjs --json`.

**Expect:** Findings cover the check ids in `tests/expected/drifted-memory.json`. Apply no silent deletes.

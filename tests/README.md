# Tests

Zero npm dependencies. Requires Node.js >= 18.

## Validators

```bash
npm test
# or:
node tests/validate-skills.mjs
node tests/run-audit-fixtures.mjs
```

`validate-skills.mjs` checks skill frontmatter, sync-references copies, canonical blocks, plan-gate single-source, tool-notes freshness, and relative links.

`run-audit-fixtures.mjs` copies each `fixtures/` folder to a temp dir, `git init`s it, runs `memory-audit --json`, and compares check id sets to `expected/<fixture>.json`.

## Manual agent eval

1. Copy a fixture: `cp -r tests/fixtures/messy-docs /tmp/eval-messy && cd /tmp/eval-messy`
2. Open that folder in Cursor.
3. Run `/initialize-agentic-memory` and walk [eval-checklist.md](eval-checklist.md).

The `skill-creator` / create-skill skill can be used to iterate on skill descriptions.

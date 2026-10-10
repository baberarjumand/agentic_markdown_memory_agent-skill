# Migration safety

Read this before applying moves. Keep [SKILL.md](../SKILL.md) under 500 lines by pointing here.

## Preflight (before showing the plan)

1. Is it a git repo?
2. If yes: working tree must be clean (`git status --porcelain` empty) and HEAD must not be detached. If dirty, stop and tell the user, or continue only on explicit acknowledgement. Offer to create branch `chore/agentic-memory-init` before applying.
3. If not a git repo: warn that there is no rollback, recommend a backup, and require explicit acknowledgement at the apply gate.

Optional: run `node <skill>/scripts/preflight.mjs` for JSON:

```json
{ "isGit": true, "clean": true, "branch": "main", "detached": false, "hasAgentsMd": false, "hasCursorDir": false, "trackedFileCount": 0 }
```

## Apply

- Use `git mv` for tracked files and a plain move for untracked files.
- Never overwrite. If a destination exists and differs, stop and ask.
- Never move secrets, `.env`, credentials, `.git`, or dependency folders.

## Reference rewrite

For each moved path, search for references in:

- Markdown links and wikilinks
- `README.md`, `CONTRIBUTING.md`
- `.github/**`
- CI configs, `package.json` scripts
- Source comments

Skip `.git` and dependency folders. Add a "references to update" section to the plan table (file, line, old, new). Only rewrite references to moved paths. Do not edit other user content. For links that cannot be found (outside the repo), keep a one-line pointer at the old path.

## Verify

After apply:

1. Every planned destination exists.
2. Every old path is gone or is a pointer stub.
3. No new broken relative links (run `memory-audit` `broken-link` if installed, else grep).
4. Show a `git status` summary.

## Report and rollback

Report what moved, what was created, which references changed, and a rollback instruction for the user (for example `git switch <original-branch>` or `git reset --hard <sha>`). **The agent must never run a destructive rollback itself.**

## Gitignore row

The plan may include an opt-in row to append local paths (`CLAUDE.local.md`, `SCRATCHPAD.md`, `HANDOFF.md`) to `.gitignore`. Append missing lines only; never overwrite an existing `.gitignore`.

# How Claude Code loads memory

| | |
|---|---|
| Sources | [Claude Code memory](https://code.claude.com/docs/en/memory); [How Claude remembers your project](https://code.claude.com/docs/en/claude-md) |
| Read | 2026-09-29 |

These two docs describe the same system. Instructions a person writes, and notes the agent writes, are both markdown. Both can enter the next session. Neither is a security control. A hook blocks an action. A sentence does not.

## What the source recommends

`CLAUDE.md` is instructions you write. It can live for an organization, a user, a project, or one person on one project (`CLAUDE.local.md`). More specific wins. The project file overrides the user file. Target under 200 lines. Longer files cost more and are followed less reliably. Split with imports or `.claude/rules/`.

A rule file is the same kind of markdown. Without `paths` frontmatter it loads every session, like the project `CLAUDE.md`. With `paths` (globs), it loads only when the files in play match. That is how a language or a directory gets rules without taxing every other task.

`CLAUDE.md` is loaded in full, up to a large cap. Shorter still follows better. HTML comments in the file are stripped before injection, so a maintainer note can sit in the file and not in the prompt. Comments inside code blocks stay.

Auto memory is the opposite author. The agent writes `MEMORY.md` and topic files from corrections and discoveries, and it is supposed to skip anything it can read from the code. At session start only the first 200 lines, or 25 KB, of `MEMORY.md` load. The rest, and the topic files, are on demand. The agent is expected to keep the index short by moving detail out. A person can edit or delete those files. They are not a hidden store.

Promote a note when it is stable: into the project file if the team should share it, into the local file if it is true only for you on that project, into the user file if it is true in every project. Do not leave a stable rule drifting in auto memory, and do not put a personal tool choice into the team file.

## Do

- Keep each `CLAUDE.md` under about 200 lines. Split by path when a rule applies only to some files.
- Use `paths` so a rule is absent until those files are the task.
- Put maintainer notes in HTML comments if the tool strips them. Do not spend prompt tokens on notes to yourself.
- Let the agent write auto memory, and read it. Delete what is wrong. Promote what should be shared.
- Cap the always-loaded memory index. Topic files stay out until needed.
- Use a hook when the action must not happen.

## Don't

- Do not treat a long instruction file as "loaded, so it will be followed." Length reduces adherence.
- Do not load every rule every session if a path glob can select it.
- Do not put team policy in a personal memory file, or a personal preference in the team file.
- Do not let auto memory store facts the repo already states.
- Do not rely on the instruction file as an access-control list.

## Worth carrying into the skill

The product is Claude Code. The pattern is not:

- Always-on instructions have a line budget. Past it, adherence drops, so you split.
- Path-scoped rules are the same idea as "load this file only for this task."
- An agent-written index stays short by policy. Detail is a separate file, read on demand. The first 200 lines are the cap in this system. The idea is the cap, not the number, unless you are writing for this tool.
- Comments for humans can be stripped before the prompt. Use that when the format supports it.
- Specific files outrank broad ones.
- Enforcement is a hook. Memory is context.

## Token implications

- A `CLAUDE.md` with no line cap is loaded whole. The 200-line target is how this system stays inside the standing fee.
- A rule without `paths` is paid on every session. A glob makes it free until the matching files show up.
- HTML comments that are stripped are notes you can keep without paying for them. Comments the tool does not strip are just more prompt.
- Auto memory that only injects the head of the index avoids the activity-log failure. Topic files are the on-demand tier.
- Facts copied into memory from the repo are tokens spent twice, and the copy will drift.

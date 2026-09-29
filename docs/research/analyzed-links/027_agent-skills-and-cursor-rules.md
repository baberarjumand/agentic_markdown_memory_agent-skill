# Agent skills, Cursor rules, and install

| | |
|---|---|
| Read | 2026-09-29 |

Sources read for this note:

- [Agent Skills overview](https://agentskills.io/home)
- [Agent Skills specification](https://agentskills.io/specification)
- [Best practices for skill creators](https://agentskills.io/skill-creation/best-practices)
- [Docs index](https://agentskills.io/llms.txt)
- [Customize Cursor](https://cursor.com/docs/customize-cursor)
- [Cursor Agent Skills](https://cursor.com/docs/skills)
- [Cursor Rules](https://cursor.com/docs/rules)
- [skills.sh docs](https://www.skills.sh/docs)
- [skills.sh CLI](https://www.skills.sh/docs/cli)
- [Claude Managed Agents skills](https://platform.claude.com/docs/en/managed-agents/skills)
- [Claude Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview)
- [Claude use-case guides](https://platform.claude.com/docs/en/about-claude/use-case-guides/overview)

Linked from those pages and used here: the specification and the skill-creator best practices. The Managed Agents skills page also points at [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) and [Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices). Those match the open spec. The use-case index only chooses a build path (Messages API, Agent SDK, or Managed Agents). It does not change how a skill is written.

## What the sources recommend

A skill is a directory. The required file is `SKILL.md`. Optional folders are `scripts/`, `references/`, and `assets/`. The `name` is lowercase, at most 64 characters, and matches the directory. The `description` says what the skill does and when to use it, in the third person, and is at most 1024 characters. The body should stay under about 500 lines. The agent sees the name and description on every turn (about 100 tokens) and loads the body only when the skill is used.

Write the procedure the agent would get wrong without the file. Cut explanations of things it already knows. One default, not a menu. Tell it when to open each reference file. References stay one level below `SKILL.md`.

Cursor discovers skills in `.agents/skills/` and `.cursor/skills/`, and also in the Claude and Codex skill folders. Typing `/` and the skill name invokes it. `disable-model-invocation: true` means the skill loads only when invoked that way, which is how a slash command behaves. The `name` must match the folder.

Cursor rules are `.cursor/rules/*.mdc`. A `.md` file in that folder is ignored. `alwaysApply: true` puts the rule in every chat. A rule with `alwaysApply: false`, no description, and no globs loads only when mentioned. Prefer a short rule with globs or a description. Keep rules under 500 lines. Point at files. Do not paste a style guide. `AGENTS.md` is the plain-markdown alternative and can be nested. The nearer file wins.

Install from a public repo with:

```text
npx skills add <owner>/<repo>
```

skills.sh ranks skills from anonymous install telemetry of that CLI. There is no separate submission form in the docs. A badge is optional. Review a skill before installing it. The leaderboard does not prove the skill is safe.

Managed Agents attach few skills. Each skill costs context. A repo can also expose `.claude/skills/<name>/SKILL.md` one level deep. That path is Claude-specific. The portable location used by Cursor and the install CLI is `.agents/skills/<name>/`.

## Do

- Ship `SKILL.md` in a directory whose name equals `name`.
- Set `disable-model-invocation: true` when the skill is a command the user types.
- Keep the body a procedure. Put the layout and templates in `references/`.
- For Cursor, add a short `.mdc` rule that points at `AGENTS.md` and matches the memory paths. Leave `alwaysApply` off.
- For every other agent, put the same instructions in `AGENTS.md`.
- Document `npx skills add <owner>/<repo>` in the repo README.

## Don't

- Do not put the skill in `~/.cursor/skills-cursor/`. That tree is Cursor's own.
- Do not copy the full memory guide into a rule and into `AGENTS.md`.
- Do not set `alwaysApply: true` on a long rule.
- Do not promise a skills.sh listing before anyone has installed the skill with the CLI.

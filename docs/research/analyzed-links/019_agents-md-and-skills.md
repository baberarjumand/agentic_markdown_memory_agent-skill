# AGENTS.md, CLAUDE.md, and skills

| | |
|---|---|
| Sources | [Red Hat: AGENTS.md and Agent Skills](https://developers.redhat.com/articles/2026/07/27/standardize-project-context-agentsmd-and-agent-skills); [AGENTS.md patterns](https://blakecrosley.com/blog/agents-md-patterns); [AGENTS.md as a project README for agents](https://agentpatterns.ai/standards/agents-md/); [SKILL.md vs CLAUDE.md vs AGENTS.md](https://www.termdock.com/blog/skill-md-vs-claude-md-vs-agents-md); [Agent Skills (Microsoft Learn)](https://learn.microsoft.com/en-us/agent-framework/agents/skills) |
| Read | 2026-09-29 |

These pages agree on a split this research had been approaching from examples. One short file is always on. Procedures are skills, loaded when the task matches. Tool-specific files point at the shared file. They do not each contain a copy.

## What the sources recommend

`AGENTS.md` at the repo root is project orientation for any agent that looks for it: what the project is, how to build and test, constraints, and where the real docs live. It is loaded at session start. It is not the documentation. Agent Patterns says about 100 lines of pointers, with knowledge in `docs/`. Blake Crosley says write commands the agent can repeat verbatim, organize by task (coding, review, release), and define done. Prose, "be careful," and contradictory priorities without an order get ignored. Each section stays under about 50 lines, with the critical lines first. A monorepo scopes rules per directory so one service's rules are not in every other service's prompt. If the agent cannot recite the build command, the file is too long or is not being read.

Red Hat and Termdock: do not keep parallel `CLAUDE.md`, `GEMINI.md`, and `AGENTS.md` bodies. `AGENTS.md` is the shared text. A tool file, if required, holds only what that tool needs and points at `AGENTS.md`.

A skill is a folder with `SKILL.md`. Frontmatter has `name` and `description`. The description is how the agent decides the skill applies. Microsoft Learn's ladder matches [016](016_managing-context-for-ai-agents.md): advertise names and descriptions at about 100 tokens each, load the body when it matches (under 5,000 tokens, and under 500 lines), then read resources, then run scripts. Those last two tools should not even be offered if no skill has resources or scripts. Skills live in `.agents/skills/` when a tool has not standardized a path. Symlink rather than copy.

Rules for every task go in `AGENTS.md`. Rules for one task type go in a skill.

## Do

- Keep one always-on file, about 100 lines, made of commands, constraints, and pointers.
- Put task procedures in skills. Write the description as the condition for loading the body.
- Keep `SKILL.md` under 500 lines. Put the rest in sibling files.
- Point tool-specific files at `AGENTS.md`. Do not fork the text.
- In a monorepo, put service rules next to that service.
- State what "done" means in a way the agent can check.
- Say what to do when blocked, so the agent does not invent a path.

## Don't

- Do not write `AGENTS.md` as a human handbook. Paragraphs and slogans are ignored or truncated.
- Do not put a skill's body in the always-on file.
- Do not maintain a second full copy for each product.
- Do not advertise resource and script tools when the skills do not have them.
- Do not let one directory's rules load for the whole repo.

## Worth carrying into the skill

- Always-on text is orientation and commands. Skills are procedures. Docs are the knowledge both point at.
- One canonical file. Product files are pointers.
- Description quality decides whether the body is loaded too often or never.
- Length caps: about 100 lines always on, about 500 lines in a skill body, references outside both.

## Token implications

- A 100-line `AGENTS.md` is the standing fee. An encyclopedia in that file is paid on every task, including tasks that never use it.
- Skill descriptions are a smaller standing fee. Vague ones cause full-body loads.
- A symlink is one body in context. Two copies drift and both get pasted when someone "fixes" the wrong file.
- Per-directory rules keep a monorepo's prompt to the service in front of the agent.

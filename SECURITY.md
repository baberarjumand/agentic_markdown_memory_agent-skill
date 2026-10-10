# Security Policy

## Supported versions

| Version | Supported |
| --- | --- |
| 1.1.x | Yes |
| Older than 1.1 | Best effort |

## What this project is

This repository is an [Agent Skills](https://agentskills.io/) package. Installing it (for example with `npx skills add`) copies or links instruction files that another AI agent will follow when reorganizing or writing markdown memory in a target repository.

There is no hosted service, database, or install-time network callback beyond the public [skills CLI](https://www.skills.sh/docs/cli) and git clone of this repo.

## Reporting a vulnerability

Do not open a public issue for security-sensitive reports.

Email the maintainer via the contact links on [baberarjumand.com](https://baberarjumand.com), or open a private GitHub security advisory on [github.com/baberarjumand/agentic_markdown_memory_agent-skill](https://github.com/baberarjumand/agentic_markdown_memory_agent-skill) if that feature is enabled for the repository.

Include:

- What you observed
- Steps to reproduce
- Affected skill (`initialize-agentic-memory`, `memory-audit`, or `memory-reflect`)
- Whether any secrets or personal data were exposed (do not paste real secrets)

You should receive an acknowledgement when the report is seen. Fixes for confirmed issues ship in a subsequent release note in `CHANGELOG.md`.

## Security expectations for users

- Review [`.agents/skills/initialize-agentic-memory/SKILL.md`](.agents/skills/initialize-agentic-memory/SKILL.md) (and companion skills) before installing.
- Prefer `npx skills add baberarjumand/agentic_markdown_memory_agent-skill --list` before installing.
- The init skill must not move `.env` files, credentials, `.git`, or dependency folders. Confirm the plan before Gate 2 apply.
- `memory-audit` injection and secret checks are **heuristics**, not guarantees. Never rely on them as a security boundary.
- Do not store secrets, credentials, or personal data in memory markdown files.

## Scope

In scope: instructions or scripts in this repository that could cause data loss, secret leakage into docs, or unsafe file operations when followed by an agent.

Out of scope: vulnerabilities in third-party agents (Cursor, Claude Code, etc.), the skills CLI itself, or user projects that ignore the skill's confirmation gates.

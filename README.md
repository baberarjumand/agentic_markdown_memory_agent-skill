# agentic_markdown_memory_agent-skill

<!-- BEGIN TOC (generated, do not edit by hand) -->
**Contents**

- [Features](#features)
- [Quick start](#quick-start)
  - [Option A — Install via `npx skills` (recommended)](#option-a-install-via-npx-skills-recommended)
  - [Option B — Clone the repo](#option-b-clone-the-repo)
- [Recommended environment](#recommended-environment)
- [Use with Cursor](#use-with-cursor)
- [Use with VS Code](#use-with-vs-code)
- [Use with Claude](#use-with-claude)
  - [Claude Code](#claude-code)
  - [Claude.ai (web)](#claudeai-web)
- [Use with ChatGPT](#use-with-chatgpt)
  - [ChatGPT (web)](#chatgpt-web)
  - [Codex CLI](#codex-cli)
- [Use with Gemini](#use-with-gemini)
  - [Gemini CLI](#gemini-cli)
  - [Gemini web](#gemini-web)
- [Use with Grok](#use-with-grok)
  - [Grok coding CLI](#grok-coding-cli)
  - [Grok web](#grok-web)
- [Use with DeepSeek](#use-with-deepseek)
  - [DeepSeek Chat](#deepseek-chat)
  - [DeepSeek Harness or another local CLI](#deepseek-harness-or-another-local-cli)
- [Usage](#usage)
  - [Example prompts](#example-prompts)
- [How it works](#how-it-works)
- [Companion skills](#companion-skills)
- [Repository layout](#repository-layout)
- [Security](#security)
- [FAQ](#faq)
- [About the Author](#about-the-author)
<!-- END TOC -->

[![skills.sh](https://skills.sh/b/baberarjumand/agentic_markdown_memory_agent-skill)](https://skills.sh/baberarjumand/agentic_markdown_memory_agent-skill)

An [Agent Skills](https://agentskills.io/) package that sets up a markdown memory layout for a project. A short `AGENTS.md` stays in every session. Docs, decisions, knowledge pages, and tasks load only when a task needs them.

The agent asks once before a read-only scan and plan, then once before apply. Dry-run stops after the plan. In Cursor it also writes a scoped rule. In every other agent it writes `AGENTS.md`.

**Recommended environment:** Cursor, VS Code, or a local CLI that can read and write the project. This skill does not work without that local filesystem. See [Recommended environment](#recommended-environment).

**Install into your agents ([skills.sh](https://skills.sh) / `npx skills`):**

```bash
npx skills add baberarjumand/agentic_markdown_memory_agent-skill
# Prefer copy on Windows if symlinks fail:
npx skills add baberarjumand/agentic_markdown_memory_agent-skill --copy -g -y
```

Preview without installing:

```bash
npx skills add baberarjumand/agentic_markdown_memory_agent-skill --list
```

Repo: [github.com/baberarjumand/agentic_markdown_memory_agent-skill](https://github.com/baberarjumand/agentic_markdown_memory_agent-skill)

## Features

| Feature | Description |
| --- | --- |
| **Two confirmation gates** | Gate 1: scan read-only and build a plan. Gate 2: apply. Dry-run stops after the plan with no writes |
| **Safer migration** | Preflight, `git mv` for tracked files, planned reference rewrites, user-owned rollback |
| **Metadata schema** | Shared frontmatter and generated index line format for docs, decisions, knowledge, tasks |
| **Companion skills** | `memory-audit` (budgets, drift, unsafe content) and `memory-reflect` (end-of-session write-back) |
| **Scoped TOC** | Generated TOCs only for long eligible files; never on `AGENTS.md` |
| **Existing files stay intact** | Reports where knowledge already lives and proposes destinations. Does not overwrite a file that is already there |
| **Default layout** | `AGENTS.md`, `docs/` (tutorials, how-to, reference, explanation, decisions, archive), `knowledge/`, `sources/`, `tasks/`, optional `SCRATCHPAD.md` / `memory/gotchas.md` — only what the project needs |
| **Cursor rule** | When Cursor is in use, writes `.cursor/rules/agentic-memory.mdc` scoped to memory files. It points at `AGENTS.md` and is not always-on. Optional on-demand `plan-gate.mdc` for plan-before-implement |
| **Other agents** | Writes `AGENTS.md` as the behavior file. No `.cursor/` directory |
| **Session hygiene** | Scratchpad for the current checklist (clear on done). End-of-session reflection into durable memory. No activity-log dumps |
| **Local filesystem only** | If the agent cannot list and edit the project, it says so and stops |
| **Research-backed** | Layout comes from the notes in [`docs/research/`](docs/research/README.md). The synthesis is [`docs/research/FINDINGS.md`](docs/research/FINDINGS.md) |

[↑ Back to top](#agentic_markdown_memory_agent-skill)

---

## Quick start

**Easiest way to use this skill:** ask your AI agent to analyze the **initialize-agentic-memory** skill and outline the steps, then ask that agent to run it.

### Option A — Install via `npx skills` (recommended)

Works with Cursor, Claude Code, Codex, Gemini CLI, Grok, and [many more](https://github.com/vercel-labs/skills#supported-agents). A [skills.sh](https://skills.sh) page appears after installs are reported. See [FAQ](#faq).

```bash
npx skills add baberarjumand/agentic_markdown_memory_agent-skill

# Or from a full URL / local clone:
npx skills add https://github.com/baberarjumand/agentic_markdown_memory_agent-skill
npx skills add /path/to/agentic_markdown_memory_agent-skill

# Windows / no-symlink environments:
npx skills add baberarjumand/agentic_markdown_memory_agent-skill --copy -g -y
```

Useful flags:

```bash
npx skills add baberarjumand/agentic_markdown_memory_agent-skill --list
npx skills add baberarjumand/agentic_markdown_memory_agent-skill -g -y
npx skills add baberarjumand/agentic_markdown_memory_agent-skill -a cursor -a claude-code
npx skills add baberarjumand/agentic_markdown_memory_agent-skill --skill initialize-agentic-memory
```

Open the project in an agent that can read and write files, then run:

```text
/initialize-agentic-memory
```

If slash commands are unavailable, say: *Use the initialize-agentic-memory skill.*

### Option B — Clone the repo

```bash
git clone https://github.com/baberarjumand/agentic_markdown_memory_agent-skill.git
cd agentic_markdown_memory_agent-skill
```

The skill is at `.agents/skills/initialize-agentic-memory/`. Open that folder's project in Cursor or point your CLI at the clone, then invoke `/initialize-agentic-memory` **in the repository you want to organize**, not only inside this skill repo.

[↑ Back to top](#agentic_markdown_memory_agent-skill)

---

## Recommended environment

This skill works only when the agent can list the project directory and create or move files in it. **Without that local filesystem access, the skill does not work.** The agent tells you it needs Cursor, VS Code, or a local CLI, and then stops. It does not ask layout questions, propose a tree, or write `AGENTS.md` for you to paste.

Use it here:

- **Cursor** (Agent mode), opened on the repository you want to organize
- **VS Code** with an agent that can edit the workspace (for example GitHub Copilot agent mode)
- A **local CLI** on that same repository: Claude Code, Codex, Gemini CLI, Grok, or DeepSeek Harness

**Easiest way to use this skill:** ask your AI agent to analyze the **initialize-agentic-memory** skill and outline the steps in detail, then ask the same agent to run the skill following those steps.

That setup can scan the tree, show a move plan, and move files after you confirm.

Claude.ai, ChatGPT on the web, Gemini web, Grok web, and DeepSeek Chat do not have your project filesystem, so the skill stops there. Install it in Cursor, VS Code, or a local CLI (see the sections below) and run it on the repository you want to organize.

[↑ Back to top](#agentic_markdown_memory_agent-skill)

---

## Use with Cursor

```bash
npx skills add baberarjumand/agentic_markdown_memory_agent-skill -a cursor -y
```

Or global:

```bash
npx skills add baberarjumand/agentic_markdown_memory_agent-skill -a cursor -g --copy -y
```

On Windows, add `--copy` if the install reports a symlink error.

1. Open the **target** project in Cursor (the repo you want to organize).
2. Use **Agent** mode.
3. Run `/initialize-agentic-memory`.
4. Answer the questions. Files move only after the last confirmation.
5. Cursor also gets `.cursor/rules/agentic-memory.mdc`, scoped to the memory paths, pointing at `AGENTS.md`.

This repo already contains the skill at `.agents/skills/initialize-agentic-memory/` for [Agent Skills](https://agentskills.io/) discovery.

[↑ Back to top](#agentic_markdown_memory_agent-skill)

---

## Use with VS Code

Install for GitHub Copilot in VS Code, then open the target repository:

```bash
npx skills add baberarjumand/agentic_markdown_memory_agent-skill -a github-copilot --copy -g -y
```

Use an agent mode that can edit workspace files. Ask it to run initialize-agentic-memory. It writes `AGENTS.md`. It does not write a Cursor rule.

If the VS Code chat cannot change files on disk, the skill stops.

[↑ Back to top](#agentic_markdown_memory_agent-skill)

---

## Use with Claude

### Claude Code

```bash
npx skills add baberarjumand/agentic_markdown_memory_agent-skill -a claude-code -g --copy -y
```

Or from a clone of this repo, point Claude Code at the project you want to organize and ask it to follow `.agents/skills/initialize-agentic-memory/SKILL.md`.

Then, in that project:

```text
Use initialize-agentic-memory. Ask me before you scan, show a move plan, and do not move files until I confirm twice.
```

Claude Code writes `AGENTS.md`. It does not write a Cursor rule unless you say you also use Cursor.

### Claude.ai (web)

Claude.ai has no project filesystem. The skill tells you to use Claude Code, Cursor, or VS Code, and stops.

[↑ Back to top](#agentic_markdown_memory_agent-skill)

---

## Use with ChatGPT

### ChatGPT (web)

ChatGPT on the web cannot scan or move your repository. The skill stops. Use Codex CLI below.

### Codex CLI

```bash
npx skills add baberarjumand/agentic_markdown_memory_agent-skill -a codex -g --copy -y
```

Open the target repo and ask:

```text
Use initialize-agentic-memory. Ask whether to analyze this repo. Show a move plan. Wait for a final yes before moving files. Write AGENTS.md.
```

[↑ Back to top](#agentic_markdown_memory_agent-skill)

---

## Use with Gemini

### Gemini CLI

```bash
npx skills add baberarjumand/agentic_markdown_memory_agent-skill -a gemini-cli -g --copy -y
```

Or from a clone:

```bash
gemini skills install https://github.com/baberarjumand/agentic_markdown_memory_agent-skill.git --path .agents/skills/initialize-agentic-memory --consent
```

Open the target project and ask it to run initialize-agentic-memory. It writes `AGENTS.md` and moves files only after the final confirmation.

### Gemini web

Gemini on the web cannot list or edit the repo. The skill stops. Use Gemini CLI.

[↑ Back to top](#agentic_markdown_memory_agent-skill)

---

## Use with Grok

### Grok coding CLI

```bash
npx skills add baberarjumand/agentic_markdown_memory_agent-skill -a grok -g --copy -y
```

Or open a clone (skill at `.agents/skills/initialize-agentic-memory/`) from the Grok CLI on the **target** repository:

```text
Use initialize-agentic-memory. Ask me before scanning. Show the move plan. Write AGENTS.md only after I confirm twice.
```

### Grok web

Grok on the web cannot change the project on disk. The skill stops. Use the Grok CLI.

[↑ Back to top](#agentic_markdown_memory_agent-skill)

---

## Use with DeepSeek

The skill name `initialize-agentic-memory` is kebab-case, which DeepSeek Harness expects.

### DeepSeek Chat

DeepSeek Chat has no project filesystem. The skill stops. Use a DeepSeek coding CLI that can edit the repo.

### DeepSeek Harness or another local CLI

```bash
npx skills add baberarjumand/agentic_markdown_memory_agent-skill --copy -g -y
```

Run it on the target repo. Agents that scan `.agents/skills/` or `.dsh/skills/` can load it from a clone of this repo as well.

[↑ Back to top](#agentic_markdown_memory_agent-skill)

---

## Usage

| Step | What you do | What the agent does |
| --- | --- | --- |
| 1 | Run `/initialize-agentic-memory` | Asks Gate 1: scan read-only and build a plan? |
| 2 | Yes | Preflight, scan, show plan table (or `.agentic-memory-plan.md` if large) |
| 2 | No | Shows default layout and stops (offer to rerun with a scan) |
| 3 | Gate 2: apply? | On yes: moves files, writes `AGENTS.md`, Cursor rule. Dry-run: stop after step 2 with no writes |

### Example prompts

```text
/initialize-agentic-memory
```

```text
Use initialize-agentic-memory. Scan this project and build a plan.
```

```text
Dry-run initialize-agentic-memory. Show the plan but write nothing.
```

[↑ Back to top](#agentic_markdown_memory_agent-skill)

---

## How it works

```text
Gate 1: scan read-only and build a plan?
        │
        ├─ no  → show default layout, stop
        │
        └─ yes → preflight → scan → plan table
                  │
                  ├─ dry-run → stop (write nothing)
                  │
                  └─ Gate 2: apply?
                            │
                            └─ yes → move files (git mv when tracked)
                                     rewrite planned references
                                     write AGENTS.md
                                     Cursor: write .cursor/rules/agentic-memory.mdc
```

The agent loads this skill's `name` and `description` first, then `SKILL.md`, then references (`layout.md`, `practices.md`, `cursor-rule.md`, `plan-gate.md`, `migration-safety.md`) only when needed ([specification](https://agentskills.io/specification)).

[↑ Back to top](#agentic_markdown_memory_agent-skill)

---

## Companion skills

| Skill | When to use |
| --- | --- |
| `memory-audit` | Check size budgets, broken links, index drift, stale entries, unsafe content |
| `memory-reflect` | End of a non-trivial task: promote lessons into durable memory |

Example prompts:

```text
Use memory-audit. Run the audit script and show errors and warnings.
```

```text
node .agents/skills/memory-audit/scripts/audit.mjs --json --report-tokens
```

```text
Use memory-reflect. Save what we learned from this session into project memory.
```

## Repository layout

```text
agentic_markdown_memory_agent-skill/
├── README.md
├── .agents/skills/initialize-agentic-memory/
│   ├── SKILL.md
│   └── references/
│       ├── layout.md
│       ├── practices.md
│       ├── cursor-rule.md
│       ├── plan-gate.md
│       ├── migration-safety.md
│       └── tool-notes.md
├── .agents/skills/memory-audit/
│   ├── SKILL.md
│   ├── references/
│   └── scripts/audit.mjs
├── .agents/skills/memory-reflect/
│   ├── SKILL.md
│   └── references/
├── tests/
├── .github/workflows/validate.yml
├── CHANGELOG.md
└── docs/
    ├── improvements_v1/IMPROVEMENTS.md
    └── research/
        ├── README.md
        ├── FINDINGS.md
        ├── analyzed-links/
        └── searches/
```

Zip `.agents/skills/initialize-agentic-memory/` for Claude.ai or ChatGPT skill upload.

Suggested GitHub topics: `agent-skills`, `skills-sh`, `cursor`, `claude-code`, `markdown`, `context-engineering`.

[↑ Back to top](#agentic_markdown_memory_agent-skill)

---

## Security

This skill's instructions tell an agent to move and create files in whatever repository you point it at. It waits for confirmation before scanning and again before applying. Read the plan before you say yes. It must not move `.env` files, credentials, `.git`, or dependency folders.

Safer migration: preflight checks git cleanliness (or warns when there is no git), prefers `git mv` for tracked files, plans reference rewrites, and reports a rollback command for you to run. The agent must not run a destructive rollback. Injection and secret heuristics in `memory-audit` are heuristics, not guarantees.

`npx skills add` installs instructions another agent will follow. Review [SKILL.md](.agents/skills/initialize-agentic-memory/SKILL.md) before you install. Prefer `npx skills add baberarjumand/agentic_markdown_memory_agent-skill --list` first. There is no hosted service and no install script beyond the public [skills CLI](https://www.skills.sh/docs/cli).

[↑ Back to top](#agentic_markdown_memory_agent-skill)

---

## FAQ

**How do I install this with `npx skills` / skills.sh?**
`npx skills add baberarjumand/agentic_markdown_memory_agent-skill`. On Windows, add `--copy` if symlinks fail.

**Do I need to submit anything for the skill to appear on skills.sh?**
No form. [skills.sh](https://www.skills.sh/docs) lists skills from install telemetry when people run `npx skills add` against a public repo, with telemetry left on. GitHub topics alone do not list you. One install can create the page. The leaderboard follows install count.

**What is initialize-agentic-memory?**
A skill that proposes a markdown memory layout and, after you confirm, moves existing notes into it and writes `AGENTS.md`.

**Which products can I use it with?**
Cursor, VS Code, and local CLIs for Claude, ChatGPT (Codex), Gemini, Grok, and DeepSeek. The agent must be able to list and edit the repository. Web chats without that access are told to stop.

**Can I finish this in a browser chat?**
No. Without a local filesystem the skill says so and stops. Run it in Cursor, VS Code, or a local CLI opened on the repository.

**Do I need to know how to code?**
You need a terminal for `npx skills add` or `git clone`. The agent does the file moves after you confirm.

**Will it delete my notes?**
It is instructed not to. Destinations that already exist stop the move. Archive and decision files stay in git.

**Why so few questions?**
A read-only scan is harmless; the meaningful decision is applying the plan. Two gates (scan/plan, then apply) keep control without fatigue. Say dry-run to stop after the plan.

**Windows?**
`npx skills add baberarjumand/agentic_markdown_memory_agent-skill --copy -g -y`

[↑ Back to top](#agentic_markdown_memory_agent-skill)

---

## About the Author

I am Baber Arjumand and I built **initialize-agentic-memory** so a project can keep agent context in markdown: a short always-on file, and everything else loaded only when a task needs it.

- Repo: [github.com/baberarjumand/agentic_markdown_memory_agent-skill](https://github.com/baberarjumand/agentic_markdown_memory_agent-skill)
- Website: [baberarjumand.com](https://baberarjumand.com)
- Website (Personal): [baber.dev](https://baber.dev)
- GitHub: [github.com/baberarjumand](https://github.com/baberarjumand)
- LinkedIn: [linkedin.com/in/baberarjumand](https://www.linkedin.com/in/baberarjumand/)

[↑ Back to top](#agentic_markdown_memory_agent-skill)

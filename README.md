# Agentic markdown memory

A skill that sets up a markdown memory layout for agents. The layout keeps a short always-on file and loads everything else only when a task needs it.

## Install

```text
npx skills add <owner>/agentic-markdown-memory
```

Replace `<owner>` with the GitHub account that hosts this repo. In the agent chat, run:

```text
/initialize-agentic-memory
```

The skill asks before it reads the tree, shows a move plan, and moves files only after a second confirmation.

## What gets installed

The skill lives at `.agents/skills/initialize-agentic-memory/`. Cursor and other Agent Skills clients discover that path. `npx skills` copies it into the skill directory of the agent you choose.

skills.sh ranks skills from anonymous install counts of that CLI. Publishing this repo does not by itself add a listing. Installs do.

## Research

The layout comes from the notes in [`docs/research/`](docs/research/README.md). The synthesis is [`docs/research/FINDINGS.md`](docs/research/FINDINGS.md).

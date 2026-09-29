# Markdown is the New API: SKILL.md and AI Gateways

| | |
|---|---|
| Source | [Markdown is the New API: How SKILL.md and AI Gateways Unlock AI-Native Organizations](https://juliofalbo.medium.com/markdown-is-the-new-api-how-skill-md-and-ai-gateways-unlock-ai-native-organizations-e929d05c0470) |
| Author | Júlio Falbo |
| Published | 2026-02-09 |
| Read | 2026-09-29 |

The article is an architecture argument, not a template. The part that belongs in this research is the skill file. A `SKILL.md` is a short manual that teaches an agent how to use a tool. It is loaded when that tool is needed. It is not a second copy of the tool, and it is not left in context for every other task.

The AI Gateway in the same piece is a control layer: identity, permissions, cost, audit, model choice, and routing into internal systems. That is not a Markdown practice. The note records the split and does not treat a gateway product as part of the skill.

## What the source recommends

### A manual instead of a protocol that stays loaded

The failure the author describes is teaching a tool by shipping a large specification into the agent's context. The example is an official GitHub MCP server that used about 50,000 tokens, later about 23,000, to explain issue and merge operations the `gh` CLI already performs. The specification restates a tool the agent could run, and it sits in context whether or not the task is a GitHub task.

The alternative he takes from Peter Steinberger's Clawdbot / Moltbot work: give the agent a shell and a Markdown file. The file explains the tool. The agent runs the command. If the file is thin, the agent can read `--help` and infer the rest. Nothing is retrained.

A skill, in this article, states:

- what the tool does
- where the entry point is
- how to invoke it
- what inputs and outputs look like
- an example
- the constraints that must hold

It does not modify the model. Updating the tool means updating the file, not a training set.

### Load it when the task needs it

The skill is text in version control, next to the code. It is loaded for the task that needs that tool and then dropped. The author calls the always-on specification a context tax. A short manual plus a CLI that can explain itself avoids that tax.

One file is the playbook for every agent. There is no per-agent prompt that restates the same procedure. The author calls this convention over configuration: if a tool is a CLI plus a `SKILL.md`, the agent already knows the shape. Entry point, invocation, inputs, outputs, and constraints live in the same places every time. The agent spends its effort on what to do, not on how this particular integration was wired.

Writing the skill is writing down what a strong engineer would do. The same file can be read by another product because it is text. The article's phrase "a good README can often replace an integration layer" means that explanation. It does not mean every skill is pasted into the repository README.

### What the gateway is for, and what the file is not

The author pairs the two on purpose:

- The skill says what action exists, when to use it, and how to run it.
- The gateway is where the call actually goes, with permissions, injected context, rate limits, and an audit record.

The loop he names is short. Understand: load the relevant skills and plan. Execute: perform the action through the governed path.

He argues this replaces fine-tuning a model on the tool. That is his claim about cost and accuracy. This note does not test it. The durable point is that a procedure which changes should be a file the next session can read, not weights.

Governance does not live only in the prose. A skill can say "do not do this." Enforcement, in this article, is outside the file.

## Do

- Write one `SKILL.md` per tool: purpose, entry point, invocation, inputs, outputs, one or two examples, and the constraints.
- Keep it short enough that `--help` or the tool's own docs cover the rest. Do not paste the manual the CLI already prints.
- Store the file in git beside the tool. One copy for every agent that uses it.
- Load that file only when the task needs the tool. Unload it when the task moves on.
- Use the same section shape for every skill so the agent is not relearning the format.
- Point at an existing CLI or script instead of describing a second API that does the same thing.
- Say what must not be done. Put actual permission and audit checks in the execution path, not only in the sentence.
- Change the skill when the tool changes. Do not leave the model holding a stale procedure.

## Don't

- Do not leave every tool specification in the session from the start. The author's GitHub example is the cost: tens of thousands of tokens before the task begins.
- Do not reimplement, inside a protocol or a skill, a CLI the agent can already run.
- Do not write a long skill that duplicates `--help`.
- Do not fork the procedure into a separate prompt per agent or per model.
- Do not bury a skill inside a general README or a rules file that every session loads.
- Do not treat the skill text as the security boundary.
- Do not fine-tune a model to memorize a workflow a Markdown file can state and later correct.

## Worth carrying into the skill

Agent-agnostic:

- A skill is a concise, on-demand manual. The always-loaded context stays small.
- The manual's job is purpose, entry, invocation, inputs and outputs, a worked example, and constraints. Details the tool can print are not copied in.
- One canonical file. Other agents and wrappers point at it. This matches the thin-pointer rule in [000](000_ai-powered-markdown-knowledge-base.md) and the "load steering for the task" rule in [002](002_markdown-knowledge-management-agent-sprawl.md).
- Same shape every time, so format is not re-derived.
- Procedures live in files that are updated. They are not baked into a model.
- The file says what to do. Something outside the file decides whether the action is allowed.

Leave as this author's stack: the AI Gateway product, Clawdbot, Moltbot, and the specific MCP token counts. Those counts are his illustration of always-on specs, not a measurement to repeat as a universal fact. The ROI and "one developer replaces a team" claims are not practices.

## Token implications

- A skill that loads on demand costs tokens only for the tool in use. A catalog of tool specs loaded up front costs tokens on every turn, including turns that never call those tools.
- The expensive failure is duplication: a protocol document that restates a CLI, or a skill that pastes `--help`. The agent then reads two copies and can follow the stale one.
- A shared file means the procedure appears once. Per-agent copies drift and get loaded again when someone pastes "the real steps" into the chat.
- `--help` is a second read. Use it for a flag the skill does not contain. Do not plan on it as a substitute for the five or six lines that say what the tool is for and what it must not do.
- Constraints in the skill are cheap and visible. They do not replace a check that rejects the action. They stop the agent from spending a turn attempting something the file already forbids.

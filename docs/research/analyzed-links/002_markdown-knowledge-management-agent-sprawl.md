# How Markdown-Based Knowledge Management Eliminates AI Agent Sprawl

| | |
|---|---|
| Source | [How Markdown-Based Knowledge Management Eliminates AI Agent Sprawl](https://builder.aws.com/content/3BV4dTySc5qHXR7FW3rj31Ew05i/how-markdown-based-knowledge-management-eliminates-ai-agent-sprawl) |
| Author | Sarah Smith-Barry, AWS, Solutions Architect |
| Published | 2026-03-27 (modified 2026-04-09) |
| Read | 2026-09-29 |

Adding an agent per domain fragments context. This source's alternative is one filesystem-aware agent and a vault of markdown that does the routing specialized agents were supposed to do. The files are the architecture. The agent is the interface.

## What the source recommends

### What sprawl costs

A writing agent, a code agent, a research agent, and a project agent each work in isolation. A task that needs last week's estimate, the team's format, and a decision from a meeting has no single owner. The person copies output between windows and re-explains background.

Three symptoms:

1. **Context fragmentation.** Each agent holds a slice. None holds the whole.
2. **Duplicated configuration.** Every agent has its own prompts, setup, and updates.
3. **No cross-domain continuity.** An insight in one conversation cannot inform another, because the agents do not share state.

The proposed swap: stop adding agents. Put working knowledge in plain text, give one agent the workspace, and let paths and indexes decide what gets read.

### Four file types

| Type | Job | When it is read |
|---|---|---|
| Steering files | Personality and constraints: tone, spelling, format, forms of address | Described first as loaded at conversation start. Later, loaded only for the task (CloudFormation steering for a template, deliverable standards for a customer doc). |
| Maps of content | A navigational index: what exists, one line of status, where the file is | Read instead of loading every file. Example name: `00-MOC-Customers.md`. |
| Knowledge documents | Long-term memory: profiles, technical notes, architecture decisions, engagement history | Read when the task needs that entity, including at the start of a new session so work resumes. |
| Daily notes | What happened today, what carries forward, what was decided | Temporal continuity between sessions. |

Knowledge documents in the example are short structured fields (`status`, `engagement`, `next-step`), not essays. Daily notes split into "completed today" and "carry forward."

**Progressive disclosure** is how this fits a finite window. The agent loads summaries first, reads the map, identifies the files for the current task, and pulls detail only then. Depth stays available. The window does not start full.

A worked example: a follow-up email used meeting notes already in the session, the customer's knowledge document, and email conventions from a steering file. In a multi-agent setup those three inputs would have been pasted by hand.

### The filesystem is the router

Directory names are instructions. The example vault:

```
vault/
  00-SA-Dashboard.md
  00-MOC-Customers.md
  Customers/<Name>/Engagements/
  Deliverables/Cost-Estimates|Proposals|Architecture-Docs/
  Daily-Notes/
  .kiro/steering/
```

The agent is not given a hardcoded map of "customer data lives here" beyond the names themselves. `00-` prefixes mark entry points (dashboard, map of content).

The author's tools are Obsidian for writing and Kiro for the agent. The source says the same pattern works with VS Code and Copilot, a notes app plus an API-connected agent, or a text editor and a command-line agent. Requirement: the agent can read and write the local files.

### One conversation, and the limit of that idea

The evidence offered is one working session across ten domains (review, formatting, security tasks, deployment, prompt tuning, diagrams, field notes, email, usage tracking) without switching tools. Continuity came from two places at once: the vault, and the fact that the conversation itself still held earlier tasks.

A comparison the source draws:

| | Many agents | One agent, rich files |
|---|---|---|
| Continuity | Each agent starts fresh | Vault files persist across domains |
| Maintenance | N prompt stacks to update | One agent; the vault is the configuration |
| Cross-domain work | Manual handoff | The agent opens the vault path it needs |
| Setup | Per agent, per domain | One-time organization of the vault |

Limits the source states outright:

- A context window is finite. A large vault will not fit in one conversation. Progressive disclosure reduces that. It does not remove it.
- Files do not organize themselves. Directory structure, steering files, and maps of content are upfront work.

The closing instruction is small: start from notes you already have, group them by work domain, write one steering file for the conventions you use most, give one agent the workspace, and run a full session without switching tools.

The same layout is illustrated for non-engineering work (cases and precedents, literature and grants, programs and stakeholders). The principle does not depend on being a solutions architect.

## Do

- Prefer one agent with a shared file workspace over an agent per domain.
- Put conventions in a steering file the agent can read, instead of baking them into a separate agent's prompt.
- Keep a map of content with one-line status per item, and read that before opening files.
- Store durable facts in knowledge documents that a new session can open. Store "what is still open" in a daily note.
- Use directory names and stable prefixes (`00-` for entry points) as the routing table.
- Load steering and knowledge for the current task. Leave the rest on disk.
- Keep knowledge documents short and field-like where the facts are stable (status, owner, next step).
- Accept an upfront pass that creates the map, the steering file, and the folders. That cost is the configuration.

## Don't

- Do not add an agent to hold a slice of context that a file in the same workspace could hold.
- Do not copy outputs between agents as the integration layer. That is the sprawl tax.
- Do not duplicate prompts, format rules, and setup once per agent.
- Do not load the vault into the window. Load the map, then the files the task names.
- Do not rely on one long conversation as the only memory. The source's own limit is that the window fills. Daily notes and knowledge documents are what the next session can reopen.
- Do not wait for a perfect taxonomy. Start with one steering file and the directories that match current work.

## Worth carrying into the skill

Agent-agnostic:

- Shared markdown is the integration bus. Specialized agents are a last resort when a file cannot carry the context.
- Four roles: constraints, index, durable knowledge, daily carry-forward.
- Progressive disclosure: map first, detail on demand.
- Paths are routing. `00-` marks the files a session should see first.
- Conditional rules: load the steering file that matches the task, not every convention in the vault.
- State the window limit. Disclosure reduces pressure. It does not grant unlimited context.
- Organization is a one-time cost that replaces per-agent prompt maintenance.

Leave as this author's stack, not as skill requirements: Obsidian, Kiro, `.kiro/steering/`, customer-engagement folders, and the ten-domain session as proof. The article offers a single practitioner's session, not a measured comparison.

## Token implications

The source does not count tokens. The read policy is still the point of the piece:

- A map of one-line entries replaces loading every knowledge document.
- Task-scoped steering replaces a system prompt that contains every convention.
- Short field blocks (status, next step) are cheaper to reopen each session than a narrative recap.
- Daily "carry forward" is a small handoff so the next session does not replay the previous transcript.
- The "one conversation retains every prior task" benefit cuts copy-paste, and it also accumulates context. For a long session, write the result into a knowledge doc or daily note and stop carrying the raw thread.
- A vault that is only a deep folder tree, with no map, forces the agent to discover files by listing. That is the cost progressive disclosure is meant to avoid.

## Tension inside the source

Steering is described twice. Early, steering files load at conversation start and shape every response. Later, they load only when the task matches (a template loads template rules; a deliverable loads deliverable rules). The second description is the one that protects the context window. A skill should treat a tiny always-on file as the default, and domain steering as on-demand.

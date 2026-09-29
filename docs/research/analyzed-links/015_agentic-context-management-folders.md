# How to Build an Agentic Context Management System with Folder Structures and Markdown Files

| | |
|---|---|
| Source | [Agentic context management with folder structures and Markdown](https://www.mindstudio.ai/blog/agentic-context-management-folder-structure-markdown) |
| Author | MindStudio. Edited by Luis Chavez-Mattos. |
| Published | 2026-05-31 |
| Read | 2026-09-29 |

The failure this page names is an agent that forgets, repeats, or mixes clients. The model is not the first suspect. Nothing decided what it is allowed to know on this run. The fix is Markdown files, a folder layout, and rules that load some files every time, some only for this task, and some only when asked.

## What the source recommends

### The path is the scope

Context here is text: preferences, constraints, tone, decisions, tool instructions. A database is unnecessary until you need search across thousands of files. The path is metadata before the file is opened. `clients/acme/tone-guidelines.md` already says who it belongs to and when it applies.

The layout the page starts from:

```
/context
  /global        always: persona, principles, format, safety
  /clients       only the client in this task
  /projects      only the project in this task
  /workflows     optional: a repeated task type, not a client
```

A client folder holds the same kinds of files every time: overview, tone, contacts, a decisions log, constraints. A project folder holds a brief, status, an inventory, and open questions. A workflow folder holds instructions, an output template, and an example. Leaf names can differ. They cannot differ inside one system, because the loader uses the paths. Inconsistency is a bug, not a style choice.

The operating-system analogy in the page is paging. The folder tree is the disk. A file is a page. The loading rule is what gets pulled into the run. The whole tree is not the prompt.

### What a context file may contain

Each file opens with one to three sentences: what it is, and when to load it. The body is then headed sections.

Keep:

- Facts that do not change between runs.
- Decisions already made, including the reason ("always use Oxford commas; the client asked").
- Current state: phase, open tasks, last status.
- Rules that are must or must-not in this scope.

Leave out:

- The chat transcript. That is a different store.
- A fact already present in another file this run will load.
- Vague encouragement ("be helpful and creative").
- The rest of the client, "while we're here."

Length: about 200 to 600 words. Past that, split. The page's reason is weight. Loaded text is treated with roughly equal importance, so a constraint buried under background is not a constraint the agent will honor.

### Three load tiers

| Tier | When | Budget in this article |
|---|---|---|
| Always | Every run. Global only. | 3 to 5 files, each under about 300 words. |
| This task | The one client, the one project, and the workflow type, if any. | Nothing from any other client or project. |
| On demand | The agent asks. Decision history, large inventories, reference docs. | Not in the opening prompt. |

A target for everything injected up front is 1,000 to 3,000 tokens. Regularly passing 5,000 means the files are long or too many of them are in the always or this-task tiers. Move the excess to on demand.

The loader the page sketches is a join: global, then this client, then this project, then this workflow. Predictable on purpose. An optional `manifest.json` in a folder lists which files are `always` and which are `on_demand`, so growing the folder does not require a code change. That manifest is for the loader. It is not more prose for the model.

### One client per run

Do not load two client folders in the same run. Pricing, voice, and constraints bleed. A task that truly compares clients gets its own project file of short, non-sensitive summaries, not both full trees.

A `decisions-log.md` is a date, a title, what changed, why, and what it applies to. It is on demand, not global. It is the lightweight memory across runs. The page separates that from context management: context is this run's prompt. Memory is what later runs can recover. The log is the second. The transcript is not pasted into the first.

Fast-changing state (status, open tasks) goes stale if nobody writes it down. Update those files at the end of the session, or have the agent update them, or read them from a live system instead of pretending an old file is current. Slow facts (brand, preferences) can be edited by hand like docs.

Git is required: history, revert, and more than one person editing context. The page says this is not optional for serious work.

### Mistakes that undo the tiers

- Every new mistake becomes a global rule. The always-load set fills with one client's fix and then competes with the files that were actually specific. Put the fix in the client or project file.
- A status file from months ago is still loaded and still sounds current.
- There is no on-demand tier, so history is either always in the prompt or unreachable.
- Two files disagree ("never use bullets" in global, "use bullets" for this client). Audit when either side grows.

## Do

- Split context by scope: global, one client, one project, and a workflow type when the procedure repeats.
- Open every file with what it is and when it applies.
- Keep a file to a few hundred words. Split when constraints start sharing space with background.
- Load global on every run, and keep that set to a handful of short files.
- Load only the client and project named by the task.
- Leave history, inventories, and reference material for a lookup.
- Keep one client's files out of another client's run. Compare clients through a summary written for that comparison.
- Record a decision as a dated entry with the reason and the scope. Do not bury it in chat.
- Update status at the end of the session, or stop treating the file as current.
- Review the tree in git. Check for rules that contradict each other.

## Don't

- Do not inject the whole `/context` tree because the agent might need something.
- Do not put conversation history, slogans, or duplicates into a context file.
- Do not let a file grow until the rule and the background have the same weight.
- Do not add a global rule to fix one client's mistake.
- Do not load two clients in one run to "be safe."
- Do not leave a decisions log in the always-load set.
- Do not keep a status file that no one updates and still load it as fact.
- Do not put the loader's file list into the prompt. The model needs the selected Markdown, not the manifest.

## Worth carrying into the skill

These budgets are the first explicit ones in this research. They are this page's targets, not laws, and they are concrete enough to use:

- Three tiers: always, this task, on demand.
- Always-load is a few short files. Injected context stays around a few thousand tokens. Past that, move text down a tier.
- A file states when it applies, holds one kind of fact, and stays short so a rule is not diluted.
- The path is the scope. The loader may only open the scope the task names.
- One client (or one tenant, one product) per run, unless the task is an explicit comparison written as its own file.
- A dated decisions log is memory. It is fetched, not prepended.
- Context is this run. A transcript is not a context file.
- Contradictions between global and local files are a maintenance bug.
- Fast state is either updated at the end of the session or read from the live system.

This matches the maps in [000](000_ai-powered-markdown-knowledge-base.md) and [002](002_markdown-knowledge-management-agent-sprawl.md), the path-as-identity rule in [003](003_open-knowledge-format.md), and the "do not reread the whole log" failure in [012](012_markdown-as-agent-task-format.md). The new piece is the numeric budget and the ban on mixing scopes in one run.

Leave MindStudio, Remy, and the suggestion to host the files in Notion or Airtable. Those are product options. If a live system is the source for status, the Markdown copy is a cache and must say so.

## Token implications

- Equal weight is the reason to split. A 2,000-word overview spends the same kind of attention as a five-line constraint. The constraint loses. Short files plus a loader that picks them is the fix.
- Global files are paid on every run. A client-specific rule parked there is paid on every other client's run too, and it can fire there.
- The 1,000 to 3,000 token target is the opening injection, not the whole conversation. On-demand files are extra, and only after the agent asks.
- A decisions log loaded every time reintroduces the activity-log problem: history crowds out the current rule. Date headings make a lookup for one decision possible without reading the log from the start.
- A stale status file is not free. The agent will use it. Updating it, or not loading it, is cheaper than a wrong answer and a correction.
- Two clients in one prompt is the most expensive mistake, because the agent can apply A's numbers to B and the error looks fluent.

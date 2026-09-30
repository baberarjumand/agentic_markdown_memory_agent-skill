# Findings

Synthesized 2026-09-29 from notes [000](analyzed-links/000_ai-powered-markdown-knowledge-base.md)–[026](analyzed-links/026_enforceable-markdown-style.md) and the [search sweep](searches/README.md).

This is the working picture for the skill. A source note is the evidence. This file is the conclusion.

## The picture

Markdown in git is the memory. The prompt is a small slice of that memory, chosen for this turn. Rendered HTML, PDFs, rich-text JSON, embeddings, and chat transcripts are outputs or caches. They are not the store.

Every token in the window competes with every other token. Recall gets worse as the window fills, even when the window is large ([017](analyzed-links/017_anthropic-context-engineering.md)). The design question is which tokens are present now.

A file has one of three jobs, and they are not mixed:

| Job | May change? | Examples |
|---|---|---|
| Evidence | No. A later reading does not rewrite it. | Source notes, captured pages, logs |
| Current belief or current work | Yes, and the change is visible. | Concept pages, tasks, status, decisions |
| Instructions | Yes, in one canonical copy. | `AGENTS.md`, a skill, a schema |

People curate what gets reloaded. Agents may draft, patch, and update cross-references. An agent does not commit organizational context unreviewed ([016](analyzed-links/016_managing-context-for-ai-agents.md), [018](analyzed-links/018_karpathy-llm-wiki.md)).

## What is loaded, and when

Four prices. Anything without a tier becomes part of the standing fee.

| Tier | What | Budget from the notes |
|---|---|---|
| Always | Orientation, hard rules, and pointers. Skill names and descriptions. | `AGENTS.md` about 100 lines ([019](analyzed-links/019_agents-md-and-skills.md)). Each skill description about 100 tokens ([016](analyzed-links/016_managing-context-for-ai-agents.md)). Global context: a handful of files, a few hundred words each ([015](analyzed-links/015_agentic-context-management-folders.md)). A tool-specific instruction file, if required, under about 200 lines ([020](analyzed-links/020_claude-code-memory.md)). |
| This task | The files the task names: one client, one project, one workflow, one skill body, one task. | Skill body under about 500 lines and under about 5,000 tokens ([016](analyzed-links/016_managing-context-for-ai-agents.md), [019](analyzed-links/019_agents-md-and-skills.md)). Opening injection around 1,000–3,000 tokens. Past about 5,000, move text down a tier ([015](analyzed-links/015_agentic-context-management-folders.md)). |
| On demand | History, inventories, reference, raw sources, images, rejected options. | Zero until opened. A search done in a side agent returns about 1,000–2,000 tokens ([017](analyzed-links/017_anthropic-context-engineering.md)). |
| Out | Other scopes, drafts, superseded pages, transcripts, tool catalogs used only as textbooks, generated scratch. | Not in the default read. |

The always-on file is commands, constraints, and pointers. Procedures live in skills. Knowledge lives in docs the pointers name. A vague skill description is a bug: the body is opened on every task, or never ([016](analyzed-links/016_managing-context-for-ai-agents.md), [023](analyzed-links/023_frontmatter-load-decision.md)).

The widest scope is the shortest. A nearer file wins a conflict ([015](analyzed-links/015_agentic-context-management-folders.md), [019](analyzed-links/019_agents-md-and-skills.md), [020](analyzed-links/020_claude-code-memory.md)). One client, product, or tenant per run. A comparison is its own summary file, not both full trees ([015](analyzed-links/015_agentic-context-management-folders.md)).

Loaded text is treated with roughly equal weight. A constraint buried in a long overview loses. Split until the rule is its own short file ([015](analyzed-links/015_agentic-context-management-folders.md)).

## What each kind of file is for

| File | Holds | Does not hold |
|---|---|---|
| `AGENTS.md` | How to build, test, and navigate. Where the docs are. What "done" means. What to do when blocked. | Procedures, essays, a second copy of the docs ([019](analyzed-links/019_agents-md-and-skills.md)). |
| Skill | Purpose, entry point, invocation, inputs and outputs, one or two examples, constraints. A description that states when it applies. | The tool's full `--help`. A catalog of every flag ([013](analyzed-links/013_skill-md-markdown-as-interface.md)). |
| Index or map | One line per file: link, type, status, and a trigger for when to open it. | The bodies ([000](analyzed-links/000_ai-powered-markdown-knowledge-base.md), [003](analyzed-links/003_open-knowledge-format.md), [018](analyzed-links/018_karpathy-llm-wiki.md)). |
| Concept or knowledge page | The current synthesis, labeled, with citations. | Raw evidence. A moving value such as a SHA or a count ([001](analyzed-links/001_durable-ai-knowledge-base-markdown-git.md), [018](analyzed-links/018_karpathy-llm-wiki.md)). |
| Decision record | Status, the choice, why, and what it replaced. | The meeting. The debate, unless the decision is being revisited ([021](analyzed-links/021_madr-decision-records.md)). |
| Task | Id, status, owner, priority, tags. Title, why, and a checkable "done when." | The activity log. Status in the filename ([012](analyzed-links/012_markdown-as-agent-task-format.md)). |
| Decisions log | Dated entries: what changed, why, and the scope. Fetched, not prepended. | The transcript ([012](analyzed-links/012_markdown-as-agent-task-format.md), [015](analyzed-links/015_agentic-context-management-folders.md)). |
| Activity log | Append-only, with a grep-friendly prefix. Read from the end. | The reasons that must survive. Those are decisions ([012](analyzed-links/012_markdown-as-agent-task-format.md), [018](analyzed-links/018_karpathy-llm-wiki.md)). |
| Handoff or notes | What the next session must know after a reset: decisions, open problems, last files. | A lossy summary of every tool result ([016](analyzed-links/016_managing-context-for-ai-agents.md), [017](analyzed-links/017_anthropic-context-engineering.md)). |
| Scratchpad | Current-task checklist and immediate next steps. Cleared when the task is done. | Durable evidence. Line-by-line activity logs. |
| Gotchas | Roadblocks hit and how they were fixed, so later sessions do not pay the same tokens. | A full transcript of the debugging session. |

Path is identity and scope. `clients/acme/tone.md` says who it belongs to before anyone reads it ([003](analyzed-links/003_open-knowledge-format.md), [015](analyzed-links/015_agentic-context-management-folders.md)). Status stays in frontmatter so a status change does not rename the file ([012](analyzed-links/012_markdown-as-agent-task-format.md)).

Page type is also a path. Tutorial, how-to, reference, and explanation are different jobs. A lookup loads reference. A "why" loads explanation. Decisions stay in their own directory ([022](analyzed-links/022_diataxis-docs-layout.md)).

## Suggested project structure

One tree for a repository that people and agents share. Each path has one job. `README.md` is for a person opening the repo. `AGENTS.md` is for an agent opening a session. They point at each other. They do not repeat each other.

```text
.
├── AGENTS.md
├── README.md
├── CLAUDE.md
├── .agents/
│   └── skills/
│       └── <name>/
│           ├── SKILL.md
│           └── references/
│               └── <topic>.md
├── docs/
│   ├── index.md
│   ├── tutorials/
│   ├── how-to/
│   ├── reference/
│   ├── explanation/
│   ├── decisions/
│   │   └── 0001-short-title.md
│   └── archive/
│       └── YYYY-MM-DD/
├── knowledge/
│   ├── index.md
│   ├── log.md
│   └── <concept>.md
├── sources/
│   └── <source-id>.md
└── tasks/
    └── 001-short-title.md
```

Kept outside the shared tree, because they are one person's session or one tool's private notes:

```text
CLAUDE.local.md
SCRATCHPAD.md
HANDOFF.md
memory/
  MEMORY.md
  gotchas.md
  <topic>.md
```

If the tool already stores auto memory outside the repo, use that location. Do not also commit a second `MEMORY.md`.

| Path | Purpose | When it is read |
|---|---|---|
| `AGENTS.md` | The only shared always-on file. Commands to build, test, and check. Hard constraints. Where to look next. What "done" means. What to do when blocked. About 100 lines. | Every session. |
| `README.md` | Human front door: what this project is, how to run it, and a link to `AGENTS.md` and `docs/index.md`. | A person, or an agent only when the task is about the project's public description. |
| `CLAUDE.md` | Present only when a tool refuses to read `AGENTS.md`. A few lines that point at `AGENTS.md`. Tool-only settings may live here. The project briefing does not. | Every session in that tool, so it stays a pointer. |
| `CLAUDE.local.md` | Preferences true for one person on this repo. Gitignored. | That person's sessions. Overrides nothing the team file states as a project rule. A nearer file wins only for that person's own scope. |
| `.agents/skills/<name>/SKILL.md` | One procedure: when it applies, how to run it, inputs, outputs, one or two examples, constraints. Description in frontmatter is the trigger. Body under about 500 lines. | Description every session. Body only when the task matches. |
| `.agents/skills/<name>/references/` | Detail the procedure points at: a long checklist, a template, a rare edge case. | When a step in the skill names the file. |
| `docs/index.md` | Catalog of project documentation. One line per file: link, type, status, and when to open it. | After `AGENTS.md`, before any doc body. |
| `docs/tutorials/` | Learning path, in order. | When the task is to learn the system, not to change it. |
| `docs/how-to/` | One task, one outcome. Steps. | When the task is "how do I do X". |
| `docs/reference/` | Exact behavior: commands, fields, errors. | When the task needs a fact, not a story. |
| `docs/explanation/` | Why it is built this way. | When the task is a design question. |
| `docs/decisions/0001-short-title.md` | One decision. Status, date, the choice, why, consequences, and `superseded_by` when a later record replaces it. The number is never reused. | The outcome, when a task depends on the decision. The debate only when the decision is being revisited. |
| `docs/archive/YYYY-MM-DD/` | Retired pages kept as evidence. Status `archived`. Links in the active tree point at the replacement, not here. | Only when the task is historical. |
| `knowledge/index.md` | Catalog of synthesized pages. One line each: link, status, trigger. Read this instead of listing the folder. | When the task needs what the project currently believes, after the docs index if both might apply. |
| `knowledge/<concept>.md` | Current synthesis of one subject. Claims labeled. Citations to `sources/`. Contradictions written down. No copied live values (SHAs, counts, "last synced"). | When the index line matches the task. |
| `knowledge/log.md` | Append-only record of ingests, queries, and lint. Each entry starts with a date heading a search can tail. | The latest entries, when the task needs to know what just changed. |
| `sources/<source-id>.md` | What a source actually said. Author, dates, locator, capture limits. Immutable. | When a claim in `knowledge/` must be checked. |
| `tasks/001-short-title.md` | One unit of work. Frontmatter holds id, status, owner, priority, and tags. The body holds why, and a "done when" list. Status is not in the filename. | The one task being done. A status grep selects it. Other task bodies stay closed. |
| `SCRATCHPAD.md` | Current-task checklist and immediate next steps. Heavily edited during the session. Cleared when the task is done. Never cited as evidence. | When the task is in progress. Not always-on. |
| `HANDOFF.md` | What the next session must know: decisions made, problems still open, files just touched. Written at the end of a long session. Folded into `knowledge/` or `docs/decisions/` and then removed, so it does not become a second always-on file. | The start of the following session only. |
| `memory/MEMORY.md` | Short index of notes the agent wrote for itself: corrections, preferences, discoveries that are not already in the repo. One line per topic, pointing at a topic file. About the first 200 lines may load. The agent does not record facts it can read from the code. | The head of the file, every session for that person. |
| `memory/gotchas.md` | Durable roadblocks and how they were fixed. Reflection promotes here so a later agent does not hit the same wall. | When the task touches a domain that has failed before, or at end-of-session reflection. |
| `memory/<topic>.md` | The detail behind one memory-index line. | When the index line matches the task. |

Add these only when the repo has that problem:

| Path | Add it when | Purpose |
|---|---|---|
| `clients/<name>/` | One repo serves more than one client. | That client's tone, constraints, and decisions. Load one client per run. |

A how-to and a skill are different files. The how-to is documentation a person follows. The skill is a procedure the agent runs. When they describe the same steps, the skill points at the how-to, or the how-to is the skill's reference file. The steps are not written twice.

Empty directories are not created in advance. A folder appears with its first real file and an index line. `sources/` and `knowledge/` appear together, because a synthesis page without a source record is an uncited claim. `tasks/` appears when work is handed to an agent as a file. `memory/` appears when the tool does not already provide an agent-written memory index outside the repo. `SCRATCHPAD.md` appears when the agent needs a working checklist that is not a `tasks/` file. `HANDOFF.md` appears when a session must continue in a fresh chat.

Scratchpad, handoff, and task files have different end-of-life rules. The scratchpad is wiped when the task is done. The handoff is folded into durable files and then removed. A task file keeps its status in frontmatter and may outlive one session. None of them hold line-by-line activity logs. Reflection produces memory: at the end of a non-trivial task, record where the friction was, what repo-specific fact was missing, and what lesson should survive, then promote those answers into `memory/gotchas.md`, `memory/<topic>.md`, `docs/decisions/`, or `knowledge/` before clearing the scratchpad.

Constraints in rules and `AGENTS.md` are imperative. Current belief in `knowledge/` is cited synthesis. Wiki pages are not migrated wholesale into always-on or glob rules.

For non-trivial work (new module, schema change, auth, money, migration, multi-service contracts), the agent produces Goal, blocking questions with recommended defaults, falsifiable assumptions, and a Plan, then waits. Tiny obvious edits skip the ceremony. On Cursor that gate lives in an on-demand `.cursor/rules/plan-gate.mdc` (`alwaysApply: false`). `AGENTS.md` points at it; it does not paste the full protocol.

## How a file is written

Frontmatter is the filter. The body is the document. Required ideas, not a large schema:

- `type`
- `status` (draft, active, done, superseded, archived)
- dates in ISO form
- `description` written as a trigger: when to load this file, not a topic blurb
- `superseded_by` when something replaced it

A missing trigger means the agent cannot skip the body. A vague trigger ("notes about auth") causes a wasted read or a missed file ([023](analyzed-links/023_frontmatter-load-decision.md)). Keep the block short, on the order of ten lines. No blank line after the opening `---`.

The body opens with one to three sentences: what this is, and when it applies ([006](analyzed-links/006_google-markdown-style-guide.md), [015](analyzed-links/015_agentic-context-management-folders.md)). Then unique headings, about three levels deep, unnumbered. The heading is the address. Two sections both named "Summary" are not addressable ([006](analyzed-links/006_google-markdown-style-guide.md), [007](analyzed-links/007_ibm-markdown-documentation-best-practices.md)). Headings are the outline. A second hand-written table of contents drifts and costs a second copy ([026](analyzed-links/026_enforceable-markdown-style.md)).

Context files stay around 200–600 words ([015](analyzed-links/015_agentic-context-management-folders.md)). One subject per file. Bullets for a set, numbers for a sequence, inline code for a name, a fenced block with a language tag for a snippet. Emphasis is rare, and reserved for something a skim must not miss: a deprecation, a rate limit, a security warning, with the replacement named ([008](analyzed-links/008_document-apis-with-markdown.md)).

Claims that will be cited are labeled: fact, inference, hypothesis, opinion, decision. The label survives a rewrite ([001](analyzed-links/001_durable-ai-knowledge-base-markdown-git.md)). A factual claim points at a specific source, not a homepage or a paraphrase. Authoritative claims can use `file:line` ([000](analyzed-links/000_ai-powered-markdown-knowledge-base.md)). If the files do not say it, the agent says it does not know.

Examples are few and canonical, not a catalog of edge cases ([017](analyzed-links/017_anthropic-context-engineering.md)). An example that tells someone to run a command is complete and has been run. Include a common failure beside the success ([008](analyzed-links/008_document-apis-with-markdown.md)). Shell samples do not start with `$` ([026](analyzed-links/026_enforceable-markdown-style.md)).

One Markdown flavor for the corpus. CommonMark, plus GitHub Flavored Markdown where tables and task lists are required. Do not mix flavors ([005](analyzed-links/005_markdown-documentation-for-apps.md)). Links are ordinary Markdown links with a stable path and text that still means something out of context. Wikilinks and block references do not travel ([025](analyzed-links/025_wikilinks-vs-portable-markdown.md)). A link alone on a line can mean "this is a child, in this order." A link inside a sentence is a mention ([004](analyzed-links/004_markdown-knowledge-graph-humans-agents.md)). Literal `*` and `#` are escaped or wrapped in code ([011](analyzed-links/011_twmp-markdown-best-practices.md)).

A rule that must hold is a hook, a test, or a saved query. A sentence is a hope ([016](analyzed-links/016_managing-context-for-ai-agents.md), [020](analyzed-links/020_claude-code-memory.md)).

## How the set stays true

The index is updated in the same change as the page. A stale index is worse than no index, because it still looks like a map ([000](analyzed-links/000_ai-powered-markdown-knowledge-base.md)).

Ingest of a source updates the pages it changes, the index line, and one log entry. Contradictions are recorded. A useful answer is filed back into the wiki. Lint looks for orphans, broken links, superseded claims, and missing pages. Lint does not prove a claim is true ([001](analyzed-links/001_durable-ai-knowledge-base-markdown-git.md), [018](analyzed-links/018_karpathy-llm-wiki.md)).

Lifecycle is a field the loader can filter ([024](analyzed-links/024_doc-lifecycle-and-archive.md)):

| Status | In the default read? |
|---|---|
| `draft` | No, unless the task is to edit it. An agent does not implement a draft ([012](analyzed-links/012_markdown-as-agent-task-format.md)). |
| `active`, `done` | Yes. `done` is finished and still used. |
| `superseded` | No. The file points at the replacement and stays in git. |
| `archived` | No. Retained, unlinked from the index. |

Old documentation that still looks current is worse than no page ([007](analyzed-links/007_ibm-markdown-documentation-best-practices.md)). Generated scratch is deleted, not archived, so it cannot be cited ([024](analyzed-links/024_doc-lifecycle-and-archive.md)).

A moving value (a SHA, a line count, "last synced") lives in one place. Other pages point at it. A historical claim stays literal because it is about the past ([018](analyzed-links/018_karpathy-llm-wiki.md)). Fast status is updated at the end of the session, or read from the live system. A status file nobody updates is not loaded as fact ([015](analyzed-links/015_agentic-context-management-folders.md)).

Git is the audit trail. A state change is a commit. The prompt does not also contain the history ([001](analyzed-links/001_durable-ai-knowledge-base-markdown-git.md), [012](analyzed-links/012_markdown-as-agent-task-format.md)).

When a session must continue, write a short handoff from a template and start the next session there. Prefer reflection into durable files over dumping the session into the scratchpad. Compaction is a fallback. If it is used, keep decisions, open bugs, and implementation facts, and drop raw tool output. Do not compact the same session over and over ([016](analyzed-links/016_managing-context-for-ai-agents.md), [017](analyzed-links/017_anthropic-context-engineering.md)).

Search for an existing page before creating one ([001](analyzed-links/001_durable-ai-knowledge-base-markdown-git.md)). One canonical copy of any instruction. Other entry points point at it ([000](analyzed-links/000_ai-powered-markdown-knowledge-base.md), [019](analyzed-links/019_agents-md-and-skills.md)).

## Knowledge versus execution

Stable, verbal knowledge goes in a skill or a doc: conventions, sequence, tone, judgment. A live call goes to a tool: send, query, post. The common case is a short skill that names a few tools and can still draft or recommend if the tool is absent. If the skill does nothing without the tool, the split is wrong ([014](analyzed-links/014_skills-vs-mcp.md)).

Do not load a full tool schema to teach team habits. The schema is paid on every turn. The skill is paid when the task matches ([013](analyzed-links/013_skill-md-markdown-as-interface.md), [014](analyzed-links/014_skills-vs-mcp.md)).

Pick the format by the reader ([012](analyzed-links/012_markdown-as-agent-task-format.md)):

| Reader | Format |
|---|---|
| A person and an agent | Markdown, with a little YAML in front |
| A program reading config or a graph | YAML or TOML |
| A script reading an event log | JSONL, append-only |
| A call that needs auth and errors | A tool, not a paragraph |

Rich text and HTML are renderings. The archive is the Markdown ([010](analyzed-links/010_contentful-markdown-vs-rich-text.md)).

## Authority

Not every file is equal ([000](analyzed-links/000_ai-powered-markdown-knowledge-base.md)):

1. Source of truth. If the agent contradicts it, the agent is wrong.
2. Core knowledge. The current design.
3. Working notes. They change often.
4. Archive. Non-authoritative, unlinked.

A nearer scope overrides a broader one. A superseded record loses to the record it points at. The agent cites, marks confidence, and says when the files do not support the claim.

## Where the sources disagree

These are resolved here so the skill does not inherit both sides.

**Heading depth and numbers.** Stop around three levels. Headings are unique and unnumbered. The course that numbers headings `1.`, `a.`, `i.` and goes to a fourth level is a teaching sketch, not the rule ([007](analyzed-links/007_ibm-markdown-documentation-best-practices.md), [011](analyzed-links/011_twmp-markdown-best-practices.md)).

**List numbering.** Long lists that will be edited are written as `1.` on every item, so a diff is one line. Short stable sequences may use real numbers. That is Google's split ([006](analyzed-links/006_google-markdown-style-guide.md)). The stricter "always `1.`" and "always 1. 2. 3." rules are house styles.

**Tables of contents.** For an agent, the headings are the outline. A host may generate a TOC for people. A hand-maintained TOC of the whole page is a second copy ([006](analyzed-links/006_google-markdown-style-guide.md), [026](analyzed-links/026_enforceable-markdown-style.md)).

**Always-on instructions.** One source says steering loads at session start, and later says it loads for the task. The skill uses a tiny always-on file and loads domain rules on demand ([002](analyzed-links/002_markdown-knowledge-management-agent-sprawl.md)).

**Who writes the wiki.** Karpathy has the agent own the synthesis and the person own the sources. Other notes have people write anything that will be reloaded, with the agent drafting. Both fit if the split is by layer: the agent may maintain cross-references and draft pages; a person reviews text that every later session will load ([016](analyzed-links/016_managing-context-for-ai-agents.md), [018](analyzed-links/018_karpathy-llm-wiki.md)).

**Index file versus listing the directory.** Keep a one-line index. A directory listing replaces it only when every listing already returns the trigger line and the status. Otherwise the agent opens files to discover them ([003](analyzed-links/003_open-knowledge-format.md), [018](analyzed-links/018_karpathy-llm-wiki.md)).

**Embeddings.** Optional, rebuildable, and added after a named failure: the index is too big, keywords miss, or near-duplicates keep appearing. Until then the index is the retrieval ([001](analyzed-links/001_durable-ai-knowledge-base-markdown-git.md)). One comment on the LLM-wiki gist suggests topical questions suit the wiki and entity lookups suit search. That is a hint, not a law.

**Line length.** 80 and 120 both appear. This is a diff convention, not a token rule. Follow the project's linter. Do not put a column limit in the skill as a context rule ([006](analyzed-links/006_google-markdown-style-guide.md), [026](analyzed-links/026_enforceable-markdown-style.md)).

**Camel case filenames.** One 2021 preview recommended them. Later notes use stable, scannable names, numeric or date prefixes, and path-as-identity. Camel case is not the rule.

**Compaction versus a new session.** Prefer a handoff file the next session opens. A tuned compaction may keep decisions and drop tool dumps. An untuned summary is how decisions disappear ([016](analyzed-links/016_managing-context-for-ai-agents.md), [017](analyzed-links/017_anthropic-context-engineering.md)).

## How this skill is packaged

A skill other agents can import is a directory whose name matches the `name` field, with a `SKILL.md` inside ([027](analyzed-links/027_agent-skills-and-cursor-rules.md)). The description is what every session sees. The body loads when the user invokes the skill. Set `disable-model-invocation: true` when the skill is a command, so it does not attach itself to unrelated chats.

Put the skill at `.agents/skills/<name>/`. Cursor reads that path, and so do other agents that follow the Agent Skills layout. `references/` holds the layout and the Cursor rule template. `SKILL.md` says when to open them.

Cursor rules are `.cursor/rules/*.mdc` with frontmatter. A long rule that is always applied taxes every session. The memory rule stays off until a memory file is in play, and it points at `AGENTS.md` instead of repeating it. An optional plan-gate rule stays off until the task needs it. Agents that are not Cursor get the same instructions from `AGENTS.md` alone, with the plan-gate body kept in the skill's `references/` or a project skill.

People install it with:

```text
npx skills add <owner>/<repo>
```

skills.sh ranks skills from those installs. Publishing the repo does not by itself create a listing. The README of the public repo should show that command.

## What the skill does not require

Product layouts and tools: Obsidian, Kiro, Claude slash commands, Zuplo, MindStudio, Batty, a specific gateway, RDF, JSON-LD, or a knowledge-graph database.

Measured savings such as "100x" or "60% less time." Those are one author's illustration.

A large metadata ontology on day one. Add a field when a real retrieval or review failure needs it ([001](analyzed-links/001_durable-ai-knowledge-base-markdown-git.md)).

Wikilinks, block references, or any syntax a CommonMark reader cannot follow ([025](analyzed-links/025_wikilinks-vs-portable-markdown.md)).

## What an agent following this skill does

1. Read the short orientation file.
2. Read the index. Match triggers and status. Ignore drafts, superseded pages, and other scopes.
3. Open only the files the task names. Expand one step, in one direction, under a cap. Skip files already loaded.
4. Treat source-of-truth and accepted decisions as overriding everything else. Cite, or say the files do not say.
5. Load a skill body only when its description matches. Leave reference files until a step needs them.
6. Call a tool to act. Do not load a tool catalog to learn a convention.
7. Write the result back: update the page, the index line, and a log or decision entry in the same change. Do not leave the synthesis in the chat.
8. Keep the always-on files short. Put a new rule in the narrowest file that is true. Delete a line before adding one.

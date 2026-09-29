# Markdown knowledge graph for humans and agents

| | |
|---|---|
| Source | [Markdown knowledge graph for humans and agents](https://iwe.md/blog/markdown-knowledge-graph-for-humans-and-agents/) |
| Author | IWE Team |
| Published | 2026-03-21 |
| Read | 2026-09-29 |

Personal and project knowledge does not need a vector store to be agent memory. This post argues for one markdown graph that a person edits and an agent queries. If the memory cannot be read, corrected, or shared, it is not a knowledge base. It is a hidden cache.

## What the source recommends

### Opaque memory is the failure

Frameworks already persist something past a single chat: LangChain memory modules, CrewAI knowledge sources, AutoGPT writing files. The common need is storage that outlives the conversation. The dominant implementation embeds text and retrieves by similarity.

That works, and it hides the memory. A vector database is hard to read. An embedding cannot be edited by hand. The agent "knows" something the person cannot verify or hand to someone else. Decisions, patterns, and project lore then live where neither a human nor the next agent can audit them.

The alternative is the notes you already keep. IWE is the author's tool for that idea: an LSP server (`iwes`) so VS Code, Neovim, Zed, and Helix treat the markdown as a structured knowledge base, and a CLI (`iwe`) so an agent queries the same files. One source of truth. No sync between a notes app and a memory service.

### Ask for a bounded slice, not the corpus

The CLI is the agent interface. Examples from the post:

- Fuzzy find by words (`iwe find --fuzzy "authentication"`).
- Retrieve one document by key (`iwe retrieve -k docs/auth-flow`).
- Inline children a fixed number of levels deep (`--expand-includes 2`).
- A fourth example adds `-f keys`. This post does not define that flag.

Flags that directly control context size:

| Flag | Effect |
|---|---|
| `--expand-includes N` | Follow inclusion links N levels down and inline those children |
| `--expand-included-by N` | Include N levels of parent context |
| `-e KEY` | Leave out documents already loaded |
| `--max-tokens N` | Cap how much text comes back |

Depth is the useful operation. One call returns the document plus the children its links name, instead of the agent walking the graph with a series of file reads. The cap and the exclude list are how that call stays inside a budget.

The post's auth example says one `--expand-includes 2` call returns the document, inlined children, parent context, and backlinks. The flag table does not say that. Parent context is a separate flag (`--expand-included-by`). Treat depth in each direction as an explicit choice. Do not assume a downward expansion also pulls parents.

### A link on its own line is structure

An inclusion link is a markdown link sitting alone on a line, not inside a sentence:

```markdown
# Photography

[Composition](composition.md)

[Lighting](lighting.md)
```

That line means the linked note is a child of this one. Order is the order of the lines. A note may be a child of more than one parent, which folders cannot express: "Performance Optimization" can sit under both frontend and backend. The post calls this polyhierarchy.

Compared with the two usual substitutes:

- Folders force a single place. A note that matters in two areas is either duplicated or filed where one of its readers will not look.
- Tags group notes and do not order them, and they do not say which note contains which.
- Inclusion links allow several parents, an explicit order, and a few words of annotation next to the link.

Context flows parent to child. Retrieving with a depth follows those links and inlines the children. The structure the person wrote is the retrieval signal.

### Deterministic context

The post names this context engineering: you decide what enters the window. Retrieval returns the notes the graph connects to the topic. There is no similarity threshold and no "maybe relevant" chunk.

The same files give you git history, one command for a transitive neighborhood, and a format any editor can open. The memory is the knowledge base you already maintain. Agents collaborate on it. They do not keep a second store.

The post is explicit about scope. This fits structured material: technical docs, specs, reference notes, task lists, and people who will edit markdown. It is not a claim that embeddings are useless for every kind of memory.

Two related posts are named and not read here: [Markdown as a database](https://iwe.md/blog/markdown-as-a-database/) (keys, schema, two relationship types) and [Five components of agent memory in plain Markdown](https://iwe.md/blog/five-components-of-agent-memory-in-plain-markdown/) (persistence, structure, retrieval, writeback, forgetting).

## Do

- Keep agent memory in the same markdown a person can open, edit, and diff.
- Make structure a link on its own line, so parent, child, and order are visible without a database.
- Allow a note to have more than one parent when it genuinely belongs in more than one place. Do not duplicate the file to fake that.
- Retrieve a key, then expand a fixed depth. Ask for parents only when the task needs them.
- Cap the returned text. Exclude notes already in the conversation.
- When the agent loads the wrong context, fix the link that brought it in. The graph is the thing to debug.
- Use this pattern for knowledge you are willing to structure: specs, references, decisions, tasks.

## Don't

- Do not put project memory only in a vector store. You cannot see it, correct a bad entry, or share it as files.
- Do not walk the whole graph. Unbounded expansion inlines every descendant into the window.
- Do not treat a downward expansion as parent context. Direction and depth are separate.
- Do not reload a note that is already in context.
- Do not use folders as the only structure when one note belongs in two branches. Do not use tags when you need order or containment.
- Do not bury structural links inside sentences. A "see also" in prose is not a parent-child edge.
- Do not adopt this as the memory for unstructured piles you will not maintain. The post limits it to knowledge you already edit.

## Worth carrying into the skill

Agent-agnostic. The CLI and the LSP are one implementation.

- Memory that the agent uses is the markdown the human edits. No second store, no sync.
- Two depths, both explicit: children for detail, parents for why this note exists.
- A token cap and an exclude-already-loaded rule on every expansion.
- A link alone on a line means "this is a child, in this order." Prose links do not.
- Several parents are allowed, so the file stays in one place.
- Wrong context is a bad link, fixed in the file, not a retrieval score to tune.
- Deterministic neighborhoods beat "maybe relevant" chunks for specs, decisions, and references.

Leave as IWE product surface: `iwes`, `iwe find` / `iwe retrieve`, editor integrations, and the undefined `-f keys` flag. Embeddings are not forbidden for other jobs. They are the wrong default when the knowledge is a graph you are willing to maintain.

The two follow-up posts above are the place to learn how this author splits relationship types, and how writeback and forgetting fit the same files.

## Token implications

The post's own budget controls are `--max-tokens` and `-e`:

- One keyed retrieve plus a small depth replaces a similarity search that injects neighboring-but-irrelevant chunks.
- Inlining children is where cost explodes. Depth 2 on a wide parent can be most of the window. The cap has to be a hard stop, not advice.
- Excluding loaded keys avoids paying for the same note through a second parent. Polyhierarchy makes that duplicate likely.
- Parent expansion and child expansion are separate bills. Load the side the task needs.
- A structural link the agent can follow is cheaper than discovering hierarchy by listing directories and reading files to guess.
- Opaque embeddings hide a wrong memory, so the next session retrieves it again. An editable note is fixed once.

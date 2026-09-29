# LLM Wiki

| | |
|---|---|
| Source | [llm-wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) |
| Author | Andrej Karpathy |
| Published | 2026-04-04 |
| Read | 2026-09-29 |

This gist is the pattern several earlier notes only cited. Retrieval answers a question and then forgets the synthesis. A wiki compiles the synthesis once, in markdown, and keeps it current. The next question reads the compiled page instead of reassembling the sources.

The file is an idea, not a layout. Karpathy says to hand it to an agent and instantiate the details for the domain. Directory names are optional.

## What the source recommends

Three layers:

1. **Raw sources.** Curated articles, papers, data. Immutable. The agent reads them and does not edit them.
2. **The wiki.** Markdown the agent owns: summaries, entities, concepts, comparisons, an overview. The agent creates pages, updates them when a new source arrives, maintains cross-references, and records where new data contradicts an old claim. A person reads. The agent writes.
3. **The schema.** `CLAUDE.md` or `AGENTS.md`. How pages are shaped, how ingest works, how answers are filed. This is what makes the agent a maintainer instead of a chatbot. Person and agent change it as the domain gets clearer.

Three operations:

- **Ingest.** One source can touch 10 to 15 pages: a summary, the index, related entities and concepts, and a log line. Karpathy prefers one source at a time, with a person checking what was emphasized. Batch ingest is allowed if the schema says so.
- **Query.** Read the index, open the relevant pages, answer with citations. A good answer is filed back into the wiki. A comparison that only lives in chat does not compound.
- **Lint.** Look for contradictions, claims a newer source superseded, pages with no inbound links, concepts mentioned but lacking a page, missing cross-references, and gaps. The agent should propose the next question, not only patch the page.

`index.md` is the catalog: each page, a link, one line, optional date or source count, grouped by category. The agent updates it on every ingest and reads it first on a query. Karpathy says this works at about 100 sources and a few hundred pages, and that embeddings are unnecessary there.

`log.md` is append-only: ingests, queries, lint passes. A stable prefix such as `## [2026-04-02] ingest | Title` lets `grep` and `tail` read the end. The log is how the agent knows what just happened. It is not the catalog.

Search is optional and later. At small scale the index is enough. A local markdown search tool is for when the index is no longer enough. The wiki is a git repo. Obsidian is a viewer. Images should be downloaded, because a remote URL rots, and the agent should read the text first and open images only when the text is not enough.

The human curates sources and asks questions. The agent does the bookkeeping people abandon: cross-references, summary updates, contradiction notes. Karpathy's line is that an LLM can touch many files in one pass and does not get bored.

A comment on the gist, not Karpathy's text, is worth keeping. A note should describe the shape of a fact, not copy a value that moves (a commit SHA, a line count, a "last synced" date). The live value stays in one place. A count in prose ("these five rules") goes stale when a sixth appears. Write "these rules." Historical claims stay literal because they are about the past.

Another comment reports a split by question type on a large vault: topical questions did better on the wiki, entity lookups did better on retrieval. That is one person's labels, not a benchmark. It matches the idea that the wiki is for synthesis and search is for finding a specific record.

## Do

- Compile a page when a question required synthesis. Do not leave that synthesis in the chat.
- Keep sources immutable. Write claims, contradictions, and updates on the wiki page, with a citation back to the source.
- On ingest, update the pages the source changes, the index line, and one log entry.
- On a question, read the index first, then the pages it names.
- Lint for contradictions, superseded claims, orphans, and missing pages.
- Give log entries a grep-friendly prefix, newest readable from the tail.
- Put the conventions in one schema file the agent reads before it edits.
- Stay with the index until it fails. Add search when you can name that failure.
- Store a moving value in one place. Other notes point at it.

## Don't

- Do not re-retrieve the same sources for a question the wiki already answered.
- Do not let the agent edit the raw source to match a later interpretation.
- Do not skip the index and open the corpus.
- Do not drop a useful answer in the transcript.
- Do not treat the log as the catalog, or the index as a history.
- Do not copy this gist's examples as a required tree. Karpathy says the shape is yours.
- Do not paste a live SHA, count, or sync time into a page that will not be updated when it changes.

## Worth carrying into the skill

This is the pattern behind [001](001_durable-ai-knowledge-base-markdown-git.md), [003](003_open-knowledge-format.md), and the "maintained page, not a retrieval" rule:

- Three layers: immutable evidence, revisable synthesis, a schema for the agent.
- Index first, one line per page. Log is append-only and greppable.
- Ingest updates many pages, including contradictions. Query files the answer back.
- Lint is a health check, not a proof the claims are true.
- The index is enough until scale says otherwise.
- A note states stable shape. Current values are not copied into it.

## Token implications

- The index is the cheap read. The pages it names are the next read. The raw sources are for audit, not for every question.
- Filing an answer once is cheaper than reassembling five sources on every repeat question.
- A log prefix plus `tail` avoids loading the history.
- One schema file is a small prefix. Re-deriving the wiki's rules from the corpus is not.
- An image URL in the markdown is a failed fetch later. Local assets, opened only when needed, keep the text read small.
- A stale copied value is a wrong token the agent will trust. A pointer is shorter and stays true.

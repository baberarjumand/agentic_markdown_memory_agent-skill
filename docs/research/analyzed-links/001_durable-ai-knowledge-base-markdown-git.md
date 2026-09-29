# I Built a Durable AI Knowledge Base with Markdown and Git

| | |
|---|---|
| Source | [I Built a Durable AI Knowledge Base with Markdown and Git](https://changyou.medium.com/i-built-a-durable-ai-knowledge-base-with-markdown-and-git-054191f71975) |
| Author | changyou |
| Published | 2026-07-25 |
| Read | 2026-09-29 |

Search can find passages. It does not keep what was concluded last time. This source treats a markdown repository as memory only when three things stay distinct: what a source said, what the current synthesis claims, and the rules an agent must follow when it changes either one.

## What the source recommends

### Folders are change contracts

Numbered directories are not a filing aesthetic. Each one states how a file is allowed to change:

| Directory | What it holds | Change rule |
|---|---|---|
| `10-inbox` | Rough, unverified capture | Incomplete is allowed |
| `20-sources` | Evidence | Cannot be silently rewritten |
| `30-knowledge` | Synthesis | Must change when better evidence arrives |
| `40-projects` | Goals, constraints, current execution | Decisions need a date and an owner |
| `50-research` | Questions, competing explanations, gaps | Uncertainty stays visible |
| `60-writing` | Drafts and publication records | Drafts are not sources |
| `70-investing` | Observations, theses, capital decisions | Domain-specific; same mutation idea |
| `80-logs` | Changes, decisions, handoffs | Append-only |
| `90-archive` | Inactive history | Retained, not current |

An early layout (`raw/`, `wiki/`, `daily/`, `memory/`, `projects/`) failed because the names did not answer mutation questions: where an unverified transcript goes, whether a research conclusion and a project decision share a status, and whether a bad source may be edited after the fact. More vague folders do not fix that. Explicit mutation rules do.

Two failures are paired. Conclusions that cannot be revised become dogma. Evidence that can be quietly edited destroys the audit trail.

### Three jobs, not one pile of notes

```
raw sources -> maintained knowledge -> agent schema
```

1. **Source layer.** Provenance: exact URL or file, author, publication date, access date, capture limitations, and a faithful excerpt or source note when needed. The page does not need to be elegant. A later reader must be able to check the claim.
2. **Knowledge layer.** Concept pages, comparisons, summaries, and conclusions. These are expected to change. They are not raw evidence and must not be written as if they were.
3. **Schema / repository protocol.** How to name files, avoid duplicates, cite claims, update indexes, and validate work. In this setup the rules live in `AGENTS.md` and in page frontmatter.

Without the third layer, every session re-guesses the rules. The predictable result is duplicate pages, drifting names, missing links, and confident summaries with weak provenance.

The author extends the three layers because projects, research questions, and decisions do not age the same way as sources and concept pages. The minimal version, if the full tree is too much, is:

```
sources/
knowledge/
projects/
logs/
AGENTS.md
INDEX.md
```

### Retrieval is navigation, not truth

A retrieval system can assemble a good answer from five fragments and then drop the synthesis into chat history. Next month the contradiction is discovered again, and a corrected reading never updates the next answer.

The source treats Andrej Karpathy's LLM Wiki proposal (April 2026) as a complement to retrieval, not a proof that a wiki beats RAG at every scale. On ingest, an agent updates topic pages, cross-references, contradictions, and the existing synthesis. The wiki stores conclusions, relationships, and unresolved disagreements. Retrieval finds the right sources and pages as the collection grows. Raw evidence stays available when a conclusion must be audited or rebuilt.

Vector search, BM25, reranking, and graph databases wait until a recurring failure has a name: known information is hard to find, the index is too large to navigate, vocabulary mismatch defeats keywords, near-duplicates keep appearing, or relationship queries have become the main work. Until then, an index file plus full-text search is enough. Any retrieval index should be rebuildable from the markdown. It is an acceleration layer, not the only copy.

### Markdown and Git, with limits

Markdown stays readable without a proprietary app, including by Codex, Claude Code, Cursor, Gemini CLI, OpenCode, or a later tool. Git supplies reviewable diffs, history, branches, and clones. Together they give:

- **Inspectability.** Content, sources, and rules can be read directly.
- **Comparability.** A changed conclusion shows up in a diff.
- **Portability.** Switching editor, model, or retrieval system does not require an export of the core files.
- **Rebuildability.** Search indexes, graph caches, and visual UIs can be regenerated from the files.

Git is not a backup policy. Markdown does not check facts. Private repos still need access control and remote copies. Sensitive material still needs an explicit visibility model. The tools make governance possible. They do not perform it.

### A repository protocol, not "organize my notes"

Before a substantive edit, the agent reads current priorities, the relevant indexes, the directory rules, and the schema. It searches for an existing page on the subject before creating another one.

Frontmatter is a shared vocabulary so agents do not renegotiate identity and lifecycle every session. A minimal page carries `id`, `type`, `title`, `status`, `visibility`, `created`, `updated`, `tags`, and `confidence`. The schema is not an attempt to turn markdown into a database. Add a field only when it solves a retrieval, review, or collaboration problem that has already happened. A large ontology on day one is a maintenance bill.

Statements are labeled so compression does not erase uncertainty:

| Label | Meaning |
|---|---|
| Fact | Directly supported by a source |
| Inference | A conclusion drawn from one or more facts |
| Hypothesis | A claim that still needs evidence |
| Opinion | An explicit judgment |
| Decision | A chosen action, with context and date |

The dangerous error is not an obvious fabrication. It is a compression error: an opinion summarized as a verified fact, or a hypothesis that loses its uncertainty label after a few rewrites.

### Provenance is not a references section

An early draft cited Karpathy with a link to his general Gist profile. A reference existed. It was not auditable: a reader could not tell which Gist, when it was created, or whether the summary was accurate. The fix was the exact document plus a separate source record: author, creation date, access date, capture method, and limitations.

Search snippets, homepages, and model paraphrases are leads. They are not the source. An AI-generated summary is never promoted into the source layer.

### Two kinds of checks

Natural-language review is for judgment: source credibility, whether a summary erased a disagreement, whether a conclusion is stale, whether an inference is presented as a fact.

Code is for mechanical invariants: required fields, unique IDs, broken relative links, files in the wrong directory, pages missing from the index. The author's `make verify` runs tests and a health check with a small standard-library tool. A passing check proves the structure holds. It does not prove the conclusion is true.

Several agents can edit the same repository when naming, evidence, mutation, indexing, and validation are written down. Concurrency still needs ordinary Git discipline, and consequential changes still need human review.

## Do

- Separate evidence from synthesis from operating rules. Each layer answers a different question.
- State, per directory, what may be edited, what is append-only, and what is retained but inactive.
- Keep a source record that can be checked: exact locator, author, dates, capture limits. Cite that record from the synthesis.
- Label claims as fact, inference, hypothesis, opinion, or decision, and keep the label when the page is rewritten.
- Revise synthesis when new evidence weakens a claim. Record the contradiction instead of silently replacing the old reading.
- Search for an existing page before creating one. Update indexes when a page is added.
- Put modification rules in `AGENTS.md`: what to read first, how names and duplicates work, what is append-only, how claims are cited and labeled, which checks must pass.
- Start with a small schema (`id`, `type`, `status`, `created`, `updated`, `tags`). Add fields after a real failure.
- Automate structural checks. Leave credibility, contradiction, and staleness to review.
- Treat markdown plus Git as the store of record. Rebuild search and graph views from the files.
- Add retrieval infrastructure only after you can name the lookup failure it fixes.

## Don't

- Do not treat a retrieved answer as memory. If the synthesis is only in the chat, the next session starts over.
- Do not let search, embeddings, or a graph view become the only copy of a conclusion.
- Do not edit a source record to match a later interpretation. Do not freeze a conclusion so it cannot be corrected.
- Do not cite a homepage, a profile, a search snippet, or a paraphrase when a specific document exists.
- Do not promote an agent-written summary into the source layer.
- Do not give the agent a vague instruction such as "organize my notes" and expect stable names, links, and provenance.
- Do not invent a large metadata ontology before a field has earned its place.
- Do not add vector search on day one because it feels like a knowledge base.
- Do not treat a green structural check as proof the claim is true.
- Do not rewrite an append-only log because a later outcome is inconvenient.

## Worth carrying into the skill

Agent-agnostic:

- Memory is a maintained page, not a retrieval result. Ingest updates the page, the links, and the recorded disagreements.
- Three change rules: evidence stays auditable, synthesis stays revisable, logs stay append-only.
- A short repository protocol in `AGENTS.md`, read before edits, including "search before create."
- Claim labels that survive rewriting, so uncertainty is not compressed away.
- Provenance means a specific source record, not a references list.
- A minimal index plus a minimal schema. Retrieval tools are optional and rebuildable.
- Deterministic checks for structure; judgment for meaning.
- Markdown and Git as the portable store, with the explicit limits (not a backup, not a fact check, not an access-control system).

Leave as this author's implementation, not as required skill layout: the investing directory, the exact `10`–`90` numbering, the Python health checker, and `make verify`. The Karpathy LLM Wiki gist is a primary source worth reading on its own. This article only reports how the author uses it.

## Token implications

The source does not measure tokens. The design still changes what gets reread:

- A maintained synthesis is loaded instead of reassembling the same sources on every question.
- An index and a protocol are a small, stable prefix. The agent does not re-derive naming and citation rules from the corpus.
- Search-before-create and unique IDs prevent near-duplicate pages, which are pure extra context.
- Claim labels let a later session trust or discount a sentence without re-reading the underlying sources, until an audit is actually required.
- A large day-one schema and a vector index add instructions and machinery before they reduce reads. The source's rule is to wait for a named failure.
- Structural checks catch broken links and missing index entries before an agent spends a session repairing navigation.

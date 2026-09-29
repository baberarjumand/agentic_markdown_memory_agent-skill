# Introducing the Open Knowledge Format

| | |
|---|---|
| Source | [How the Open Knowledge Format can improve data sharing](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing) |
| Authors | Sam McVeety and Amir Hormati, Google Cloud Data Cloud |
| Published | 2026-06-12 |
| Read | 2026-09-29 |
| Spec (not read here) | [OKF v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) |

Models fail for lack of context, not only for lack of ability. This announcement argues that the missing piece is a shared file format, not another knowledge service. Open Knowledge Format (OKF) v0.1 is that format: a directory of markdown files with YAML frontmatter, small enough that a wiki written by one producer can be read by another agent without a translator.

## What the source recommends

### Stop reassembling the same answer

Internal facts (a table's schema, what a metric means, a runbook, a join path, a deprecation) sit in catalogs, wikis, drives, code comments, and people's heads. Each surface has its own API and schema. An agent that asks "how do we compute weekly active users?" rebuilds the answer from incompatible pieces every time. The knowledge cannot move to the next tool.

The alternative is a living markdown library. Agents do the upkeep humans abandon: reading sources, updating files, fixing cross-references. People curate and review the files like code. The post cites Andrej Karpathy's LLM Wiki for this split. The same shape already shows up as Obsidian vaults, `AGENTS.md` / `CLAUDE.md`, repos of `index.md` and `log.md`, and metadata-as-code. Those copies look alike and still do not interoperate, because nothing agrees on which fields a document carries or what a filename means.

OKF is the agreement. A bundle is:

- Markdown, readable in an editor, on GitHub, and by search
- Files, movable as a tarball, a git repo, or a mounted directory
- YAML frontmatter for the few fields that must be queryable

No compression scheme, runtime, or SDK. The same file is for humans and agents. It lives in version control next to the code it describes.

### One concept, one file, path as identity

A bundle is a directory of concepts: tables, datasets, metrics, playbooks, runbooks, APIs. Each concept is one markdown file. The path is the concept's identity. Directories group them. The example is a `sales/` tree with `datasets/`, `tables/`, and `metrics/`, and an `index.md` at each level.

Frontmatter holds structured fields. The body holds everything else. The post's queryable set is:

| Field | Role |
|---|---|
| `type` | The only field every concept must have. The producer chooses the type names. |
| `title` | Human name |
| `description` | One-line summary |
| `resource` | Link to the system of record (a console page, a doc, an API) |
| `tags` | Retrieval labels |
| `timestamp` | When this representation was written |

The body is where detail lives: a schema table, join notes, and ordinary markdown links to other concepts. Those links are a graph. They express relationships the folder tree cannot (a foreign key, a dependency) without a graph database.

Two optional reserved names:

- `index.md` at any directory, so an agent can see what is in that level before opening files (progressive disclosure).
- `log.md` for a chronological history of changes at that scope.

The v0.1 spec, including conformance, cross-link rules, and reserved filenames, is described as one page. This note does not substitute for that spec.

### Three design rules

1. **Minimally opinionated.** Require `type`. Leave types, extra fields, and body sections to the producer. The spec is the interoperability surface, not a content model.
2. **Producer and consumer are independent.** A person can write a bundle an agent reads. A pipeline can export a bundle a person browses. One model can synthesize a bundle another model queries. Tooling on each end can be replaced.
3. **A format, not a platform.** No cloud, database, model, or framework is required to read, write, or serve it. The value is how many parties speak it.

Reference tools shipped with the spec are proofs, not part of the format: an enrichment agent that drafts one concept per BigQuery table and then adds citations, schemas, and join paths from authoritative docs; a static HTML graph view; three sample bundles. Google's Knowledge Catalog can ingest OKF. None of that is required to use the files.

v0.1 is a starting point. The post expects the format to change as people learn which representations agents actually need, and it asks for backward-compatible growth.

## Do

- Keep a maintained markdown library so agents stop re-deriving the same facts from scattered systems.
- Let agents update the files, including cross-references. Keep humans on curation and review, in version control.
- Use one file per concept. Treat the path as the stable identity.
- Put only queryable fields in frontmatter. Put explanation, tables, and relationships in the body.
- Always set `type`. Add `title`, `description`, `resource`, `tags`, and `timestamp` when they help selection or audit.
- Link concepts with normal markdown links when the relationship is not "this file lives in that folder."
- Put an `index.md` at each directory an agent might enter, so navigation is a short read.
- Keep a `log.md` where change history matters and should stay out of the concept body.
- Point `resource` at the system of record, and keep citations next to claims in the body.
- Agree on a small shared field set so another agent can read the bundle without a custom importer.
- Prefer a one-page convention over a new catalog service.

## Don't

- Do not send the agent back through catalogs, wikis, comments, and chat to rebuild a fact that already has a concept page.
- Do not invent a private schema, SDK, or knowledge graph when the goal is for any agent to read the files.
- Do not require more than a type to call a document valid. Extra mandatory fields become a content model nobody else shares.
- Do not hide the identity of a concept in a database key. The path is the identity.
- Do not rely on folder nesting alone for relationships. A join or a dependency belongs in a link.
- Do not omit directory indexes and then expect progressive disclosure. Without `index.md`, the agent learns the directory by opening files.
- Do not treat a viewer, an enrichment pipeline, or a vendor catalog as the store of record. They are consumers and producers of the files.
- Do not copy the same concept into a second format for the agent. One file, no translation layer.

## Worth carrying into the skill

Agent-agnostic, and aligned with the earlier notes (a map before the documents, a maintained page instead of repeated retrieval, a minimal schema):

- One concept per file. Path is identity.
- Frontmatter is the query surface. `type` is required. `description` is the line an index can show without opening the body.
- `index.md` per directory for progressive disclosure. `log.md` for history that should not be rewritten into the concept.
- Markdown links are the relationship graph.
- Agents maintain cross-references. People curate. Git is the review trail.
- The convention stays small enough to fit on one page, so it can travel between Claude, Cursor, Gemini, and any later agent.
- Producers and consumers stay swappable. The skill should describe the files, not a product.

Leave as Google's reference implementation: the BigQuery enrichment agent, the HTML visualizer, the sample public datasets, and Knowledge Catalog ingestion.

The blog points at the spec and does not include its conformance rules. Read [okf/SPEC.md](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) as its own source before the skill treats index layout, log entry shape, or link rules as normative.

## Token implications

The post does not measure tokens. The format is a read budget:

- A maintained concept replaces another search across catalogs and docs for the same fact.
- `description` plus `index.md` is the cheap layer. The body, including schema tables, loads only after the index selects the file.
- One concept per file caps how much a single open costs. A grab-bag page forces the agent to read unrelated sections.
- A handful of frontmatter keys is cheaper and more reliable to parse than asking the model to find the type and title inside prose.
- Links let the next read be one related file, not a scan of the sibling directory.
- A graph view or a second catalog copy is optional. If it cannot be rebuilt from the markdown, it has become a second store the agent may also have to read.

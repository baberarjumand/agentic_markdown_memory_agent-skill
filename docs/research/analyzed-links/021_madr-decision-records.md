# Markdown Architectural Decision Records

| | |
|---|---|
| Sources | [MADR](https://adr.github.io/madr/); [MADR template](https://github.com/adr/madr/blob/97fb8edec60b8dc70b8166ef62de34c4e26b46c0/template/adr-template.md) |
| Read | 2026-09-29 |

A decision that will be cited later gets its own markdown file. MADR is a lean template for that file. The name shifted from "architectural" to "any" decision. The practice is the same: one decision, the reason, the options, and what was chosen.

## What the source recommends

Put records in `docs/decisions/`, separate from other docs, named `NNNN-title-with-dashes.md`. Numbers are not reused. Copy the template. Do not invent a second shape per record.

The template's spine:

- Status in frontmatter: proposed, rejected, accepted, deprecated, or superseded by a named ADR. Date of the last update. Who decided, who was consulted, who is informed.
- Context and problem, short enough to be a question.
- Decision drivers.
- Options considered.
- Outcome: the chosen option and why, then consequences (good and bad).
- How you will know the decision was followed.
- Pros and cons of the options not chosen.
- Links to related decisions.

Optional sections can be deleted. The point is that an agent can find the outcome without reading a meeting transcript, and can see that a later ADR replaced this one.

## Do

- Write one file per decision, in one directory, with a stable number and a slug.
- Put status, date, and supersession in frontmatter.
- State the problem, the options, the choice, and the consequences.
- When a decision changes, add a new record and mark the old one superseded. Do not silently rewrite history.
- Link related records.

## Don't

- Do not bury the decision in a general design doc with no status.
- Do not renumber records.
- Do not leave a superseded decision looking accepted.
- Do not require every optional section. Empty sections are noise.

## Worth carrying into the skill

- Decisions are addressable files, not paragraphs in a log.
- Status and "superseded by" are how an agent knows which file wins. This matches authority tiers in [000](000_ai-powered-markdown-knowledge-base.md) and the decisions file in [012](012_markdown-as-agent-task-format.md).
- The outcome section is the line to load. Drivers and rejected options load when the task is to revisit the choice.
- Numbers are identities. Titles can be slugs. Status is not part of the filename.

## Token implications

- An agent that needs "what did we decide" reads the outcome and the status. It does not need the option debate unless the decision is being challenged.
- A superseded link prevents loading an old outcome as current.
- A directory of numbered files is a list the agent can scan. A single growing decisions essay is not.

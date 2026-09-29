# Frontmatter as the load decision

| | |
|---|---|
| Sources | [Frontmatter as document schema](https://understandingdata.com/posts/frontmatter-as-document-schema/); [Frontmatter schema for code docs](https://github.com/armstrongl/code-docs/blob/main/docs/frontmatter-schema.md); [MDA frontmatter](https://github.com/sno-ai/mda/blob/main/spec/v1.0/02-frontmatter.md) |
| Read | 2026-09-29 |

Frontmatter is the document's type signature. A tool can read it and decide whether the body is worth opening. The field that matters most is not a topic label. It is a trigger: when this file applies.

## What the sources recommend

A block between `---` at the top is YAML a parser can take without the body. Useful axes:

- What it is (`type`).
- When to load it. Armstrong calls this `description` and says it must be a trigger condition, not a summary of the topic. MDA says `description` should say what the artifact does and when to invoke it. "Helps with PDFs" is too vague.
- Scope (`tags`, categories). Tags are a controlled set if you will filter on them. An open vocabulary becomes noise.
- Freshness (`created`, `updated`), ISO dates.
- Relationships (`superseded_by`, paths this doc describes).

Armstrong ties `paths` to git. If those paths changed since `lastValidated`, the doc is stale even if the calendar says it is new. A missing required field means the file does not enter the index. A failed generation is marked `status: llm-error` instead of being indexed as normal.

The load procedure they describe: read the manifest, or the first lines of each file, match `description` and status to the task, then open the body. Do not open every body to discover which file matters. Keep the frontmatter itself short. One source says under about ten lines.

Pandoc's rule, from the same search cluster, is mechanical and worth keeping: the opening `---` is not followed by a blank line, or it is not a metadata block. String values are easy to break with an unquoted colon.

## Do

- Put `type` and a when-to-load line in frontmatter. Make the line a condition.
- Keep the block short enough to scan as a set.
- Use ISO dates. Point `superseded_by` at the replacement.
- Build an index from the frontmatter. Agents read the index, then one file.
- If the doc describes code, record the paths, and treat a later commit on those paths as a staleness signal.
- Reject or flag a file that is missing the required fields. Do not index a failed draft as current.

## Don't

- Do not write `description` as a vague topic ("notes about auth"). The agent cannot tell when to open it.
- Do not hide the only copy of a fact in frontmatter the body also needs, or only in the body if a filter must see it.
- Do not let tags sprawl without a list, if tags are how you select files.
- Do not put a blank line immediately after the opening `---`.
- Do not open every markdown file in full to decide which one applies.

## Worth carrying into the skill

This sharpens the skill-description rule in [016](016_managing-context-for-ai-agents.md) and [019](019_agents-md-and-skills.md). The same sentence does two jobs: a doc's `description` and a skill's `description` are both the condition for spending the body.

- Frontmatter is the filter. The body is the document.
- A trigger beats a summary when the next step is load-or-skip.
- Staleness can be "the code this describes has changed," not only "the date is old."
- The index is generated from fields. A file that fails the schema stays out of the index.

## Token implications

- Reading the first lines of many files is cheaper than reading their bodies, and a manifest of those lines is cheaper than opening the files at all.
- A vague description causes either a skipped file or a wasted body. Both are token mistakes. The second also pollutes the window.
- An index row that includes status and a trigger is the whole decision. The body loads once.
- A `superseded_by` field keeps the old body off the read path.

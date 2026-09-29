# Building an AI-Powered Markdown Knowledge Base System

| | |
|---|---|
| Source | [Building an AI-Powered Markdown Knowledge Base System for Your Engineering Team](https://medium.com/cwan-engineering/building-an-ai-powered-markdown-knowledge-base-system-for-your-engineering-team-4bccea3cdbfe) |
| Author | Rany ElHousieny, Clearwater Analytics Engineering |
| Published | 2026-04-24 |
| Read | 2026-09-29 |

The problem this system is built for: decisions live in wikis, tickets, meeting notes, and people's heads. Agents then answer from whatever they happen to see, including stale files. The fix is a small set of markdown files that tell an agent what exists, how authoritative it is, and which files to open next.

## What the source recommends

Three layers, each one cheaper to read than the one below it:

1. **Knowledge repository.** A directory of markdown files, grouped by authority and topic, kept in git so diffs stay readable.
2. **Knowledge base map.** One file (`Knowledge/KNOWLEDGE_BASE.md`) that does not repeat the documents. It lists them, ranks them, and points at the ones that belong together.
3. **Agents.** Prompts that must read the map first, then only the files the map names for the question.

### Authority tiers

Not every file is context. The source splits documents into four tiers:

| Tier | Role | Agent rule |
|---|---|---|
| 1. Source of truth | Leadership-approved direction: kickoff, scorecards, directives, architecture decisions | Read-only. If the agent contradicts this tier, the agent is wrong. |
| 2. Core knowledge | The project textbook: component designs, strategy | Read when the question needs the design. |
| 3. Implementation | Sprint plans, meeting notes, generated reports | Working material. It changes often. |
| 4. Archive | Superseded docs | Non-authoritative. Agents must not cite them. |

Enforcement is procedural, not a special file format:

- Session start forces a read of source-of-truth files before other work.
- Rules require `file:line` citations for any claim presented as fact.
- A human can open the citation. A mismatch with Tier 1 is visible.

Archiving is part of the tier system. Do not delete a superseded file. Move it to `archive/`, put a one-line banner at the top that marks it non-authoritative, and remove it from the active clusters in the map. Agents that only follow the map never open it. The source's claim: a stale layer that still looks current is worse than no layer, because it masquerades as ground truth.

### The map, not a second copy of the docs

`KNOWLEDGE_BASE.md` holds six kinds of navigation, each one a pointer:

- Document hierarchy with a one-line description per file
- Relationship mappings ("gateway strategy depends on IAM design")
- Concept clusters (one topic, the files that cover it, across directories)
- Evidence trails (where a specific decision is written)
- Navigation paths (a reading order per job: onboarding, deep dive, a decision)
- A Mermaid diagram of document relationships

Answering "what is our authentication strategy?" is then a short path: read the map, open the Authentication cluster, read Tier 1 before Tier 2, cite `file:line`. Without the map, the agent searches the repo, misses files, and can answer from the archive.

The map is allowed to start small. List every current document by tier, one line each, a few clusters, one diagram. Add relationships as they show up. Do not try to map everything on day one.

### Entry point and file names

`START_HERE.md` at the repo root is the single door for humans and agents. It should be readable in under five minutes and answer: what the project is, who is on the team, which sprint is current, the key architecture decisions, and where access lives. It points deeper; it does not contain the deeper docs.

Naming that makes order obvious:

- Core knowledge files use numeric prefixes (`00_`, `01_`, `02_`) so a new reader has a default sequence.
- Meeting notes live in `meetings/` as `YYYY-MM-DD_Topic_Summary.md`.
- AI-generated artifacts live in `Generated/`, separate from source-of-truth files.
- Agent definitions have one canonical file. Slash-command wrappers and skill files are thin pointers to that file, so instructions are not copied into several places that drift.

### How an agent session starts

Every agent prompt in the source uses the same skeleton: role, mandatory session init, capabilities, rules, knowledge sources, tools.

Session init is a fixed, short list:

1. `START_HERE.md`
2. `Knowledge/KNOWLEDGE_BASE.md`
3. A progress tracker, if the task needs current status
4. The source-of-truth files relevant to the task

Rules that keep answers grounded:

- Cite `file:line` for authoritative claims.
- Mark confidence HIGH / MEDIUM / LOW.
- Do not speculate about system behavior.
- Tier 1 overrides Tier 2.
- If the files do not say it, say "I don't know."

Maintenance is a workflow, not a reminder. After a meeting or a decision, update the map, `START_HERE.md`, and any agent prompt the decision changes. The source keeps those rules in a dedicated maintenance doc so the agent can run the update instead of a person remembering to.

The smallest starting set the source names is three files: `START_HERE.md`, `Knowledge/KNOWLEDGE_BASE.md`, and `AGENTS.md`.

## Do

- Give agents one entry file and one map. They should discover documents by following links, not by scanning the tree.
- Rank documents. Say which files override which, in the map and in the agent rules.
- Keep descriptions in the map to one line. The map is an index; the detail stays in the target file.
- Group files into concept clusters with an explicit reading order, highest authority first.
- Number stable knowledge files so the default read order is in the filename.
- Date-prefix notes that are events, so chronology is in the name and old notes are easy to exclude.
- Archive superseded files and unlink them from the map in the same change. Add a banner on the archived file itself.
- Keep agent instructions in one file. Other entry points point at it.
- Require citations and an explicit "I don't know" when the files do not support the claim.
- Update the map as part of the decision, in the same session that produced the decision.
- Start with source of truth plus a handful of core files. Add documents when a real question needs them.
- Keep the corpus in markdown under version control so changes are diffable and any agent can read them.

## Don't

- Do not treat every markdown file as equal context. A meeting note must not outweigh a source-of-truth decision.
- Do not leave superseded docs linked from the map or from `START_HERE.md`.
- Do not delete history. Unlinked archive is the record; deletion removes the evidence trail.
- Do not copy document bodies, or agent prompts, into the map, the rules file, or a second agent definition.
- Do not let the agent search the whole repository as its default way to answer.
- Do not document the entire system before the map and the tiers exist.
- Do not skip a rules file. Without it, the agent falls back to generic behavior and ignores the tiers.
- Do not let the map drift. An outdated map produces outdated answers that still look cited.

## Worth carrying into the skill

These are agent-agnostic. They do not depend on Claude, slash commands, JIRA, or a particular team layout:

- A bounded entry file plus a map file is the default way to load context. Agents open targets from the map.
- Authority tiers, with archive explicitly non-authoritative and unlinked.
- One-line index entries, concept clusters, and per-task reading paths.
- `file:line` citations, confidence marks, and "I don't know."
- One canonical copy of any instruction. Other files point at it.
- Maintenance of the map is part of writing the decision, not a later cleanup.
- Filename conventions (order prefixes, date prefixes) so selection does not require reading the file.

Leave out of the skill, or mention only as examples: Claude-specific paths (`.claude/commands`, `CLAUDE.md`), sprint and JIRA workflows, and domain agents tied to one platform. The article's own references (a hallucination-free systems guide, and a knowledge-graph note) are candidates for later research, not practices adopted from this source.

## Token implications

The source does not measure tokens. The structure still implies a read budget:

- The map replaces a repository walk. Cost is one index plus the cluster for the question.
- One-line descriptions and "under five minutes" for `START_HERE.md` cap the always-loaded context.
- Unlinking archives removes stale files from the read set entirely.
- Thin pointers mean agent instructions appear in context once.
- A large Mermaid diagram in the map is loaded on every session that reads the map. Prefer it when relationships are hard to see from the cluster lists; do not let the diagram duplicate those lists.

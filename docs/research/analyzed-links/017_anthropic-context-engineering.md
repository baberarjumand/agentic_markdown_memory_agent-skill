# Effective context engineering for AI agents

| | |
|---|---|
| Source | [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) |
| Authors | Anthropic Applied AI: Prithvi Rajasekaran, Ethan Dixon, Carly Ryan, Jeremy Hadfield |
| Published | 2025-09-29 |
| Read | 2026-09-29 |

Context is every token in front of the model on a given turn: instructions, tools, history, and whatever the last tool returned. The engineering problem is to keep the smallest set of high-signal tokens that still produces the behavior you want. A larger window does not remove the problem. As the window grows, recall and long-range reasoning get worse. Anthropic calls that context rot. Attention is spent on relationships among tokens, so each extra token costs focus, not just money.

[016](016_managing-context-for-ai-agents.md) cites this post. The note there is about skill budgets and handoffs. This note is the source those ideas come from, plus the parts that post did not cover.

## What the source recommends

### Instructions at the right altitude

A system prompt fails in two directions. One is a brittle script of if-then rules that will rot. The other is a vague slogan that assumes the model already shares your context. The useful band is specific enough to steer, and flexible enough that the model can apply the rule to a case you did not list.

Organize that prompt into sections. Markdown headings or XML tags both work. The authors say the exact delimiters matter less as models improve. What matters is the smallest set that fully states the expected behavior. Smallest does not mean shortest. The agent still needs enough to comply. Their method is to start with a minimal prompt on the strongest model you will use, watch it fail, and add an instruction or an example only for a failure you have seen.

Examples should be a few canonical cases, not a catalog of edge cases. They describe examples as pictures: one good one replaces a page of rules.

### Tools that do not overlap

Tools are how an agent pulls the next piece of context. They should return little text, and they should not overlap. If a person cannot say which tool applies, the agent will not do better. A small tool set is also easier to prune across a long session. Parameters should say what they are. The article points at a separate post, "Writing tools for AI agents," for the design. That post is not read here.

### Just-in-time files, not a preloaded corpus

The shift they describe is from retrieving everything before the model speaks, to keeping lightweight identifiers and loading the bytes at runtime. Identifiers are file paths, stored queries, and links. Claude Code's pattern, as they tell it, is hybrid. `CLAUDE.md` is dropped in up front. Glob, grep, and commands like `head` and `tail` pull the rest. The model writes a narrow query instead of loading a whole table.

The path is a signal before the read. `tests/test_utils.py` is not the same file as `src/core_logic/test_utils.py`. Names, folder, size, and timestamps tell the agent whether a file is worth opening. That is progressive disclosure: each look informs the next, and only the relevant slice stays in working memory.

Exploration is slower than a prebuilt index, and an unguided agent will burn context on dead ends. The hybrid they prefer for stable material (they name legal and finance work) is a little context up front, then search. As models improve they expect less hand-curation. Their standing advice is still to do the simplest thing that works.

### Three ways to outlive the window

Long tasks produce more tokens than the window holds. They do not recommend waiting for a bigger window. Pollution remains. Three techniques:

**Compaction.** Summarize a near-full conversation and start a new window from the summary. In Claude Code the summary is asked to keep architectural decisions, unresolved bugs, and implementation detail, and to drop redundant tool output. The new window also keeps the five files most recently touched. The risk is dropping a detail whose importance shows up later. Tune by first capturing everything that mattered, then cutting what did not. The lightest compaction is deleting old tool calls and their results once the call is no longer needed.

**Structured notes.** The agent writes outside the window and reads the notes back later. A to-do list or a `NOTES.md` is the pattern: progress, dependencies, and facts that would not survive dozens of tool calls. Their Pokémon agent kept maps, objectives, and what it had already tried, then continued after a reset by reading those notes. A file-based memory tool on their platform is the same idea: a knowledge store the agent consults instead of keeping the store in the prompt.

**Sub-agents.** A sub-agent can spend tens of thousands of tokens searching and return about 1,000 to 2,000 tokens. The lead agent keeps the plan and the synthesis. The search transcript stays in the other window.

Which one:

| Situation | Technique |
|---|---|
| A conversation that has to continue | Compaction, tuned so decisions survive and raw tool output does not |
| Iterative work with milestones | Notes the agent writes and rereads |
| Wide search or parallel analysis | Sub-agents that return a short result |

## Do

- Curate the token set on every turn. The goal is the smallest high-signal set, not the fullest window.
- Write instructions in sections, at an altitude a new case can still follow. Start minimal. Add a line only after a real failure.
- Prefer a few canonical examples over a list of every exception.
- Give the agent paths, names, and queries. Let it open the file or the slice. Do not preload the corpus.
- Treat folder, filename, size, and time as information. They decide the next read.
- When a session must continue, keep decisions and open problems. Drop old tool dumps. Keep the few files just touched.
- Have the agent write notes for anything that must survive a reset: status, decisions, dependencies.
- Send broad exploration to a sub-agent and take back a short summary.
- Keep the tool list small enough that a person can say which tool is the right one.

## Don't

- Do not fill a large window because it exists. Recall gets worse as tokens accumulate.
- Do not hardcode a branching script into the system prompt, and do not leave the prompt so vague it assumes context you did not provide.
- Do not stuff every edge case into the prompt. Add an example when a failure shows you need one.
- Do not give the agent two tools that do the same job.
- Do not load entire data objects when a query, `head`, or `tail` answers the question.
- Do not compact by summarizing everything with equal weight. Raw tool output is the first thing to cut. A subtle decision is the last.
- Do not keep a search transcript in the lead agent's window.
- Do not skip guidance for navigation. An agent that only has "look around" will spend the window on dead ends.

## Worth carrying into the skill

This is the primary statement of the idea the later notes have been circling:

- Context is a budget. The unit of design is which tokens are present on this turn.
- Markdown structure in the always-on prompt is sectioning, not decoration. Headings mark background, instructions, tool guidance, and output shape.
- The durable store is files. The prompt holds identifiers and the few pages that must always apply. That is the same split as a map plus on-demand reads.
- Notes written by the agent (`NOTES.md`, a to-do, a decision log) are how a long task survives compaction and a new session. They are memory. The transcript is not.
- Compaction, if used, has a keep-list: decisions, open bugs, implementation facts, and the last few files. Tool results are disposable.
- A sub-agent's return size is a budget too. They name roughly 1,000 to 2,000 tokens back from a much larger search.
- Right altitude for instructions matches the "do not bury a rule in fluff" and "do not write a vague always-on file" rules already in [015](015_agentic-context-management-folders.md) and [016](016_managing-context-for-ai-agents.md).

[016](016_managing-context-for-ai-agents.md) is harsher on compaction: prefer a fresh session and a handoff file, because summaries drop details. This source treats a tuned compaction as the first tool, and notes as the better fit when the work has milestones. Both agree that an untuned summary loses the decision. For this skill, write the keep-list into a file the next session can open. Do not trust a summary that was never checked against that list.

Leave Claude Code, the Pokémon demo, and the platform memory tool as their examples. The file pattern does not depend on them.

Named here and not read: "Writing tools for AI agents," "Building effective AI agents," and "How we built our multi-agent research system."

## Token implications

- Every added token spends attention on every other token. A preloaded corpus is not a free safety net.
- A path and a name are a few tokens that prevent a wrong open. The file body is the expensive step, taken only after those signals match.
- Tool results dominate long sessions. Clearing them is the cheapest compaction. Keeping them "in case" is how the window fills with text the agent already used.
- A note file is small on the turns it is written and small again when it is reread. The alternative is replaying the trace.
- A sub-agent that returns 1,000 to 2,000 tokens caps what the lead agent pays for a search that cost far more in the other window.
- Canonical examples are expensive per example and cheap compared with a rule list that tries to name every exception. A handful of examples plus a short rule beats both a slogan and a casebook.
- `CLAUDE.md` (or `AGENTS.md`) dropped in every turn is the standing fee. This post's hybrid only works if that file stays the index and the heuristics, not the archive.

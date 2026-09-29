# A beginner's guide to managing context for AI agents

| | |
|---|---|
| Source | [A beginner's guide to managing context for AI agents](https://tabulareditor.com/blog/managing-context-for-ai-agents) |
| Authors | Eugene Meidinger and Kurt Buhler, Tabular Editor |
| Published | 2026-09-08 |
| Read | 2026-09-29 |

The model wakes up with no history. Everything it can use is text placed in front of it, and that text is billed. This article's job is to separate the pieces of that text by when they are paid for. A window that can hold a million tokens is not a reason to fill it. The authors' illustration is that recall often gets worse well before the maximum, and they would rather stay in a smaller band (they say 100 to 250 thousand as a hypothetical) than ride the limit. Irrelevant text is not neutral. The agent attends to it.

## What the source recommends

### Four kinds of text

| Kind | What it is | When it is read |
|---|---|---|
| Prompt | The instruction for this task | This turn |
| Context | The whole input: system text, prompt, tools, history, results | Whatever has been added so far |
| Skill | A reusable procedure, written as prose, stored like code. The harness can see it. It may bundle scripts and reference files. | The description is visible every session. The body is read when the skill is invoked. References are read only if the agent opens them. |
| Memory | Situational facts that outlive a session, outside the model | Mechanisms that save text and put it back later |

Instruction files such as `AGENTS.md` and `CLAUDE.md` are also appended every session. The article lists them with memory in the takeaways, then says memory is not the same thing as a skill or as `AGENTS.md`. The practical split is: always-on files are a tax, and a skill body is not one of them. Keep the always-on set tiny. Do not put a procedure there.

The authors' own stages for a skill:

- Frontmatter, about 100 tokens, in every session. It must say when the skill applies. A vague description makes the agent open the body too often, or never.
- The body, a few thousand tokens, and they draw the line under 5,000, only after invocation.
- Reference files, zero until opened.

A tool server sits between those stages. Its descriptions were often always loaded. Some harnesses now search or group tools. The advice is still to install few of them, and per project, not globally.

### Scope, then prune

Context files and skills exist at organization, user, project, and local scope. Narrower wins when they conflict. The broadest scope is the leanest. A skill for one project does not belong in the user or org set, where every other project pays for it.

Always-loaded files should be short and should point at references instead of containing them. The authors suggest deleting memory files and skills once, after a backup, to see how much stale text was in the way. Newer models often need fewer instructions than the ones the files were written for.

### A long session is a lossy file

Automatic compaction summarizes the session when the window fills. The authors compare it to summarizing a two-hour meeting in a few sentences that become next week's agenda. Details disappear, and a second compaction makes that worse. Prefer a fresh session, or an explicit clear. If work must continue, have the agent write a short `HANDOFF.md` from a template, and start the next session by reading that file. A subagent can explore or review in its own window and return a result, so the search does not stay in the main thread.

Cached input is cheaper on later turns (they cite discounts of about 50 to 90 percent). Changing model or effort mid-session drops the cache, because the new model rereads everything. A long pause (they say one to two hours) can expire it. Clear or compact before a model switch. Compact or restart when you return, instead of assuming the cache is still there.

### People write the context that matters

Models are verbose. Asked to write a skill, they include facts the agent could look up again. A first draft is fine. The text that will be loaded again should be edited by a person, because the point is to write down what was implicit. An agent summarizing documents you already have is a telephone game. Targeted edits are fine if a person reviews them. A small personal skill may be drafted with an agent if it works. Organizational context should not be.

Curation is ongoing. Put the files in source control. Give org and team context an owner. Review on a schedule. Flag files that grew, or that have not changed in weeks. Prefer deleting a line to adding one. A five-minute daily pass over `AGENTS.md`, rules, and skills is their habit for a project.

If a check must happen, do not leave it as a sentence the model might skip. Give a query the agent should run, or a hook that blocks the command. Test that the context helps: the same tasks with the file and without it, on the models people actually use. Building that evaluation is its own project. The article does not pretend it is a weekend script.

## Do

- Treat always-loaded files as a tax. Keep them short and make them pointers.
- Write skill frontmatter so it is obvious when the skill applies. Keep the body under a few thousand tokens. Put the long material in reference files.
- Install skills and tool servers per project. Keep the global set small.
- Start a new session when the thread is full. Write a handoff from a template if the next session needs the outcome.
- Use a subagent for a wide search so the main thread only receives the result.
- Write and curate loaded text by hand. Let an agent draft, then cut it.
- Review on a cadence. Remove stale and overly broad instructions, especially after a model change.
- Put the files in git. Prefer a script or a hook when the rule must actually hold.
- Clear or compact before changing model or effort, and after a long gap, so you do not pay to reread a dead cache by accident.

## Don't

- Do not fill the window because it can hold more. Extra text costs money and distracts.
- Do not put a procedure in `AGENTS.md` or `CLAUDE.md` if a skill can hold it.
- Do not write a skill description so generic that every task looks like a match.
- Do not compact the same session over and over and expect the summary to keep the decisions.
- Do not let an agent generate organizational context and commit it unreviewed.
- Do not only add. A file that never shrinks becomes the stale context the next session loads.
- Do not rely on an instruction for a check that a hook or a saved query can enforce.
- Do not keep one project's skills in the user-wide or org-wide set.

## Worth carrying into the skill

This is the clearest account so far of what a skill costs before it is used:

- The description is always present, on the order of a hundred tokens. The body is not. References are not, until opened. That is the disclosure ladder. It sharpens [013](013_skill-md-markdown-as-interface.md) and [015](015_agentic-context-management-folders.md), which said "load when needed" without saying the description is already in the window.
- Always-on files (`AGENTS.md` and its equivalents) are pointers plus the few rules that apply to every task in that scope. Procedures, examples, and references live behind them.
- Narrow scope wins, and the widest scope is the shortest.
- A handoff file is how a new session starts. Compaction is a lossy fallback, not the memory design.
- Humans own the text that will be reloaded. Agents may draft and patch. They do not replace review.
- If a rule must hold, it is a tool or a hook. A sentence is a hope.
- Curate by deletion. Retest when the model changes, because the old instructions may now be noise.

Leave the Power BI comparisons, Tabular Editor, and the product names for harness commands (`/context`, `/compact`, `/clear`) as examples of one tool's controls. The behavior they stand for is general: see what is loaded, do not summarize a session repeatedly, and start clean.

Unread follow-ups named in the article: Chroma's note on context rot, and Anthropic's "Effective context engineering for AI agents."

## Token implications

- A skill you never invoke still costs its frontmatter on every turn. Ten vague skills are a standing fee, and they also cause the agent to open bodies that did not apply.
- The body is the expensive step. A body under a few thousand tokens is their ceiling. A reference file unread is free.
- Always-on instruction files are paid even for a one-line question. Pointers keep that fee small.
- Compaction spends a turn to produce a shorter, wronger prompt, then later turns trust it. A handoff written to a template is a file you can read and correct. The summary inside the window is not.
- A subagent's search tokens stay in the subagent. The main thread pays for the result.
- Cache savings assume the prefix stays stable. Editing the always-on files, switching models, or returning after the cache expires turns the next turn into a full reread. That is a reason to keep the stable prefix short and to change it on purpose, not mid-task.
- An AI-written skill that restates the repo is tokens spent to reload what the agent could have opened. The human cut is the part that was not already on disk.

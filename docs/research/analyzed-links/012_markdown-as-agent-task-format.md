# The Case for Markdown as Your Agent's Task Format

| | |
|---|---|
| Source | [The Case for Markdown as Your Agent's Task Format](https://dev.to/battyterm/the-case-for-markdown-as-your-agents-task-format-6mp) |
| Author | Batty |
| Published | 2026-04-04 (the page prints "Apr 4"; the series is framed as 2026) |
| Read | 2026-09-29 |

JSON lasted a week as the task format. Parsing was fine. Reading, diffing, and editing were not. This post's rule is to pick the format by who reads it. Tasks are read by people and agents, so they are Markdown. A daemon's config is not. A script's log is not.

## What the source recommends

### Frontmatter for fields, prose for the work

A task file puts the queryable fields in YAML and the assignment in Markdown:

- Frontmatter: `id`, `status`, `assigned_to`, and, in the later example, `priority` and `tags`.
- One H1, the title, written as a sentence rather than repeated inside the frontmatter.
- A short description of the change.
- A context section: why this task exists, with the numbers that constrain it.
- A "done when" list: observable checks, not a restatement of the description.

The same content in JSON is legal and unpleasant. `cat` is brackets. A diff mixes quote and comma noise with the real edit. Changing a sentence means editing JSON syntax. The agent needs a parser for a document a person should be able to read.

The filename carries the id and a slug (`027-add-jwt-authentication.md`). Status stays in the frontmatter, so a status change does not rename the file.

### The board is a directory

One directory, one file per task. There is no board service. In-progress work is `grep` for `status: in-progress`. A full board is a loop that prints the status field and the H1. The author treats that as a feature: standard commands on standard files, no database and no API.

Git is the state machine because the state is the file. A commit is a transition. `git log` shows who moved a task and when. `git diff` shows the previous wording. `git checkout` of that path rolls one task back. You do not build an audit log beside the task. The history is the audit log.

The author's product (Batty) uses this as its whole task layer: the supervisor reads the files to dispatch, and the agent reads the same file to see the assignment. The product is an example. The format does not depend on it.

### Markdown is the wrong file for some readers

| Reader | Format | Why |
|---|---|---|
| A person and an agent, for a task or an instruction | Markdown with YAML frontmatter | Prose plus a few fields |
| A daemon, for "who talks to whom" | YAML or TOML | A graph, not an essay |
| A script, for an event log | JSONL | Append-only, one object per line |
| A process, for message delivery | Maildir-style files | Atomic rename, not a paragraph |

The line in the post: the format matches the reader. Do not force every record through Markdown because the tasks are Markdown.

### What the comments add

Two comments on the same page extend the pattern. They are not the author's claims.

Thomas Landgraf uses the same shape for specifications, one file per entity, in a tree: goal, feature, requirement, scenario, acceptance criterion. Frontmatter holds id, parent, and status. Status is a gate, not a label. Draft stays with the owner. Approved is what an agent may implement. An agent does not pick up a draft. He asks how dependencies are represented. The post does not answer. It does not show parent links between tasks.

Admin Chainmail keeps three files the agent reads at session start: an activity log, a metrics snapshot, and a decisions file. The useful failure is size. After many sessions the activity log no longer fits in one read. Reading only the latest session drops decisions from earlier sessions. The fix they describe is a separate decisions file so the reason for a choice is not buried in the log. When something goes wrong, the files are what the agent had in hand. A row in a database is not.

## Do

- Store a task as one Markdown file. Put id, status, owner, priority, and tags in frontmatter. Put the title, the context, and the done-when list in the body.
- Name the file with a stable id and a slug. Do not encode status in the name.
- Treat a directory of those files as the board. Select with the status field. Do not load every body to learn what is in progress.
- Make a state change a commit on that file. Use history for who changed it and for rollback.
- Give the agent the task file, not a JSON translation of it.
- Use status as a gate when work should not start yet. An agent implements an approved task and leaves a draft alone.
- Keep durable decisions in their own file. Keep the activity log append-only, and read the tail, not the whole history.
- Use YAML, TOML, or JSONL when the reader is a program and the content is a graph, a config, or a log.

## Don't

- Do not put task prose in JSON. The syntax is extra text with no information about the work, and the diff hides the edit.
- Do not put status only in a tracker outside the file. The file is what the agent will open.
- Do not rename the file when the status changes.
- Do not use Markdown for append-only event logs, routing messages, or a graph of which process talks to which.
- Do not append every session onto the file the agent reads in full. A long activity log crowds out the decision it was supposed to preserve.
- Do not let an agent start from a draft if status is the handoff.
- Do not expect this post's layout to encode task dependencies. It does not. A parent id would be an extension, not something shown here.

## Worth carrying into the skill

This is the closest source so far to how an agent should be handed work:

- One file per task or decision. Frontmatter is the index. The body is the context.
- A fixed body shape: what to do, why, and a list that defines done.
- A directory listing plus a status grep is the board. Bodies stay closed until the task is selected.
- Git history is the audit trail. Do not paste the trail back into the task.
- Format follows the reader. Markdown for mixed human and agent reading. A structured format for programs.
- Status can be a permission. Reading a file is not the same as being allowed to act on it.
- Split a growing log from the decisions that must survive. Read the log from the end.

Leave Batty, the CLI install, and tmux out. The two comments are evidence that other people landed on the same split, not a spec. Landgraf's parent-id tree and Chainmail's three filenames are their systems.

Same series, not read here: "I Let AI Agents Manage Themselves with a Markdown File" and "Why a Markdown File Beats a Message Bus."

## Token implications

- A directory listing of `id-slug.md` files is a board the agent can scan without opening a body. Grep on `status:` selects the subset. Only the chosen file enters context.
- JSON quotes, commas, and escapes are tokens that do not describe the task. The Markdown body is the task.
- "Done when" is a short list. Load it with the description. Leave the activity log out of that read.
- An activity file that is reread in full taxes every later session and then, once it is truncated to the latest entry, drops older decisions. A decisions file is the small durable read. The log is a tail.
- A status gate avoids spending a run on a draft the agent was not supposed to implement.
- Rollback lives in git. The prompt does not need the previous versions of the task unless the current file is wrong.

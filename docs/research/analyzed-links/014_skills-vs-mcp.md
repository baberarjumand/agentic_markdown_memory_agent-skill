# The case for running AI agents on Markdown files instead of MCP servers

| | |
|---|---|
| Source | [Skills vs MCP agent architecture](https://thenewstack.io/skills-vs-mcp-agent-architecture/) |
| Author | Janakiram MSV, The New Stack |
| Published | 2026-03-06 |
| Read | 2026-09-29 |

This article uses the same GitHub example as [013](013_skill-md-markdown-as-interface.md): a tool schema of roughly 23,000 to 50,000 tokens versus a skill of about 200 to 500 tokens that says to use the `gh` CLI. The headline says 100x. A section title says 50x. Treat both as the author's illustration, not as a measurement to copy.

What this page adds is a rule for which problems belong in the file.

## What the source recommends

### Know, do, or know how to do it well

An agent task is one of three things:

| Question | What it is | Where it goes |
|---|---|---|
| Does the agent need to know something? | Standards, procedures, triage, tone, policy, how this team uses an API. Stable for weeks or months. Natural language. | A skill file in git, reviewed like code. |
| Does the agent need to do something? | Call an API, query a database, read a queue, send a message. Needs auth, network, errors, and state. | A runtime (the article's choice is MCP). |
| Does the agent need to know how to do it well? | The usual production case. Sequence, edge cases, and judgment, plus a real call. | A skill that names the execution tools. |

The waste the article describes is using the execution layer to teach. A server that exposes dozens of repository, pull request, and CI tools makes the agent load that schema on every invocation, before it can choose. The team conventions (squash merges, tests before push, commit message shape) are a short file. The agent already knows how to run a CLI. It needs how this team uses it.

The hybrid is not "skill or runtime." The skill holds the workflow. The runtime performs the call. Brad Feld's support skill is the example: severity, tone by customer, when to escalate, what an internal note must contain. The help-desk server reads and posts. Disconnect the server and the skill still triages a pasted message and drafts the reply. The judgment remains. Only the send button disappears.

That is the standalone test. If the skill is useless without the server, the knowledge was never separated, or the task was only an execution and should not have been a skill.

### What a skill file contains

From the systems the article cites (CompanyOS, Supabase's agent skills, a .NET skills executor, Claude Code):

- The workflow and the order of steps.
- Guardrails and decision rules, including tone.
- Practices that stay true across versions (migration patterns, test strategy).
- A standalone mode that still produces a draft, an analysis, or a recommendation.

Live facts stay out of the file: a current schema, a ticket thread, an inbox. Those are fetched at runtime. The article's line is "timeless in the skill, live through the connection."

Feld's set is twelve skill files, about 2,000 lines, and eight servers used only to send, query, and search. The article does not say twelve is the right number. It says the files are the intelligence and the servers are plumbing.

### Change the file, not a deployment

A behavior encoded in server code is a code change and a redeploy. The same behavior in a skill is a paragraph and a commit. Blame, diff, and review work because the file is text. The article wants skills that encode business logic, compliance, or security policy reviewed with the same rigor as infrastructure config.

MCP is not rejected. The article says the protocol is for execution, that many servers exist, and that the mistake is using it as the only place knowledge lives. An enterprise picture it offers: a dozen servers can spend 200,000 to 400,000 tokens on schemas before the user request. Replacing the teaching portion with skills is how that budget returns to the task. Leave the calls.

Monday-morning steps, in the article's order:

1. For each exposed tool, ask whether it teaches or it calls. Teaching is a candidate for a skill.
2. Start with the servers whose schemas cost the most.
3. Apply the standalone test.
4. Version the skills next to the application and review them.

## Do

- Put stable team knowledge in a skill: conventions, sequence, edge cases, tone, and what "good" means.
- Keep a skill able to draft or recommend when the execution tool is absent.
- Point the skill at the few calls it needs. Do not import the whole tool surface to convey a convention.
- Fetch live data at runtime. Do not paste the current schema, inbox, or ticket list into the skill.
- Review skill changes in git. Treat policy and compliance text with the same review as the system it constrains.
- When a tool exists only to teach an API the agent can already run, replace that teaching with a file.

## Don't

- Do not load a full tool schema so the agent can learn team habits. That cost is paid on every call, including calls that never use the tool.
- Do not encode judgment, tone, or procedure only inside server code. The next edit becomes a deploy, and the rest of the team cannot read it as text.
- Do not write a skill that does nothing unless a server is connected. Either add a standalone draft path, or admit the task is execution and keep it in the runtime.
- Do not store facts that change by the hour in the skill. They will be wrong, and the agent will treat them as the procedure.
- Do not treat this as a reason to delete execution tools. Creating an issue, posting a comment, and sending mail still need a call with auth and errors.
- Do not quote 50x or 100x as a general savings rate. Those are this article's labels for one GitHub comparison.

## Worth carrying into the skill

The decision, which [013](013_skill-md-markdown-as-interface.md) left implicit:

- Knowledge that is stable and verbal goes in Markdown. Execution goes to a tool. The common case is a short skill that names a few tools and still produces a useful draft without them.
- The standalone test is the check. Disconnect the tool. If the file cannot triage, draft, or recommend, the split is wrong.
- Schemas are not textbooks. Load the call, not the catalog, and only when the step needs it.
- Skills are reviewed text. Changing behavior is a commit.

Leave the products: CompanyOS, Help Scout, Supabase's repo, the .NET executor, Claude Code's internals. The token ranges are one author's account of one ecosystem. The boundary is the practice.

## Token implications

- A tool schema loaded on every invocation is spent before the task is read. A skill of a few hundred tokens is spent when that workflow is the task.
- The hybrid still has a cost: the skill plus the few tool definitions it calls. That is the budget. The full catalog is not.
- Standalone mode avoids a second failure mode. If the tool is down or not loaded, the agent can still return a draft. It does not have to reload a large schema to discover that it cannot think without the server.
- Live data does not belong in the file, so the file does not grow every time the inbox or the schema changes. The agent fetches the slice it needs.
- A paragraph committed to git is a smaller review than a server diff, and the reviewer does not pay a deploy to learn what the agent will do next time.

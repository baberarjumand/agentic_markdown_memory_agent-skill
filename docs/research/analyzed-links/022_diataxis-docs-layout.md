# Diátaxis for a docs tree

| | |
|---|---|
| Sources | [Diátaxis folders](https://docs.docmd.io/07/guides/scaling-architecture/scalable-folder-structure/); [Adopt Diátaxis](https://github.com/nwarila-platform/rancher-terraform-framework/blob/main/docs/decision-records/org/0002-adopt-diataxis-documentation-framework.md); [Documentation layout](https://gtb.phpboyscout.uk/explanation/concepts/documentation-layout/) |
| Read | 2026-09-29 |

A docs tree that mixes a lesson, a task, a lookup, and a theory on one page forces an agent to read all four to use one. Diátaxis splits them by the reader's job. The folder is that split, so a loader can open one kind of page.

## What the sources recommend

Four kinds of page, and four directories under `docs/`:

| Kind | Question | Directory |
|---|---|---|
| Tutorial | Teach me, in order | `tutorials/` |
| How-to | How do I do this task | `how-to/` |
| Reference | What is this, exactly | `reference/` |
| Explanation | Why is it this way | `explanation/` |

A file lives in one of them and is written for that job. A command list is reference. A design narrative is explanation. A CLI walkthrough is a how-to. Mixing them in one file is the failure. Split, or mark the sections and accept that the agent may load the wrong half.

Names are exact: `tutorials`, `how-to`, `reference`, `explanation`. Not `references`, not `howto`. ADRs stay in their own tree, not inside a quadrant. A small repo can use one hub page with four sections instead of four folders. The categories still exist.

The URL follows the path. That is a reason to keep the path stable. A sidebar or `navigation.json` is a generated view of the folders, not a second map the agent must trust.

## Do

- Give each doc one job, and put it in the directory for that job.
- Keep decisions in `docs/decisions/` or `docs/decision-records/`, not inside explanation.
- Point `AGENTS.md` at the quadrant the task needs, not at all of `docs/`.
- Prefer a hub page until there are enough files to need folders.

## Don't

- Do not put a tutorial, a reference table, and an architecture essay in one file and call it the doc.
- Do not invent a fifth folder name for the same four jobs.
- Do not make the agent discover the taxonomy by opening every file. The directory name is the type.

## Worth carrying into the skill

- Page type is a loading key. Reference for a lookup. How-to for a task. Explanation when the question is why. Tutorial when the question is to learn. Loading all four is the expensive default.
- ADRs are not explanation pages. They have status. See [021](021_madr-decision-records.md).
- Stable directory names are the schema. A generated nav file is optional.

## Token implications

- Opening `reference/` for an API question avoids the narrative in `explanation/`.
- A mixed page has no cheap half. The agent reads the lesson to find the flag.
- A hub of four links is smaller than four folders of files, until the folders earn their keep.

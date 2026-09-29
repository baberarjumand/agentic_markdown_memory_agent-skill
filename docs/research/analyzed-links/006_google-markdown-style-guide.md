# Google Markdown style guide

| | |
|---|---|
| Source | [Markdown style guide](https://google.github.io/styleguide/docguide/style.html) |
| Author | Google Style Guides |
| Published | Living guide. No date on the page. |
| Read | 2026-09-29 |

The guide balances three things: source that stays readable and portable, a corpus a team can maintain, and syntax people can remember. It is a writing standard for engineering docs. The rules that matter for agents are the ones that keep a file small, scannable, and unambiguous in raw Markdown.

## What the source recommends

### Keep the set small and current

A few fresh, accurate docs beat a large pile in mixed condition. Write only what you need (release notes, API docs, testing guidelines are the examples). Delete leftover pages often, in small batches. Treat docs with the same expectation as tests: the owner updates them.

Review of a doc change is looser than review of code. The "better is better than best" rule exists so authors keep shipping improvements. A reviewer should approve a net improvement, suggest a concrete alternative instead of a vague note, and start their own follow-up rather than blocking on "you should also…". Hold the change only when it makes the docs worse. Authors should not spend the review arguing trivia. The point is more updates, so the corpus does not freeze.

### One shape for every page

```
# Document title

One to three sentences: what this is, and why a newcomer would open it.

[TOC]

## Topic

## See also
```

- One H1, ideally the same as the filename. That heading is the page title. Later headings start at H2.
- An author line is optional. Revision history is usually enough.
- The introduction is one to three sentences for someone who does not already know the topic.
- A table of contents goes after that introduction and before the first H2, and only when the page is longer than one screen. In source order this matters: a screen reader, and an agent reading the file top to bottom, hits the outline before the body. Putting the directive at the bottom hides the outline until the end.
- Miscellaneous further reading goes in a final "See also", not in the introduction.

### Headings, lists, and lines

Headings are ATX (`## Heading`), with a space after the hashes and a blank line before and after. Underlines (`===`, `---`) are rejected because the level is ambiguous and they are harder to edit.

Each heading is unique and complete, including subsections. Anchors are built from the heading text. Two sections both named "Summary" produce anchors and links that do not say which summary. "Foo summary" and "Bar summary" do.

List numbering: a long list that will be edited can use `1.` on every item, so inserts do not require renumbering. A short stable list uses real numbers, which read better in source. Nested and wrapped items indent four spaces. A short single-line list may use one space.

Prose wraps near 80 characters because the same tools and review habits as code apply. Exceptions: links, tables, headings, and code blocks. No trailing spaces. A trailing backslash forces a line break, and the guide says to need that rarely. A blank line is a paragraph.

Product, tool, and binary names keep their official capitalization. Title and heading case are deferred to the [Google developer documentation style guide](https://developers.google.com/style), which this page does not restate.

### Code, links, images, tables

Inline code is for a short quotation, a field name, or a file type named in the generic (`README.md`). Also use it to show a fake path or example URL that must not become a live link.

Multi-line code is a fenced block with a language tag. Indented code blocks are discouraged: they cannot name a language, their edges are unclear, and they are harder to search. A shell snippet meant to be pasted escapes wrapped lines with a backslash. A block inside a list is indented with the list so the list does not end.

Links:

- Prefer a short link. Use a site path (`/path/to/page.md`) for another Markdown page, not a full URL to the same site.
- A relative link is acceptable in the same directory. Avoid `../`.
- The visible text is a phrase from the sentence. Not "here", "link", or the URL repeated.
- A reference-style link is for a long URL, a URL repeated in the document, or a cell in a table. Do not use it for a short link.
- Define a reference at the end of the section where it is first used. If several sections use it, define it at the end of the file. If the editor places definitions somewhere else, follow the editor.

Images are rare. Use one when showing a UI is clearer than describing it, and always with text that states what the image shows.

Tables are for data that is uniform in two dimensions and meant to be scanned: many parallel items, distinct attributes, little prose. Do not use a table when a list would do, when columns do not vary, when cells are empty, when there are many columns and few rows, or when a cell is a paragraph. Those tables are harder to write and to read than headings plus bullets. Long URLs inside cells become reference links so the row stays short.

HTML in the file is a last resort. It makes the source harder to read, breaks plain-text tools, and some hosts (the guide names Gitiles) do not render it. If Markdown cannot express the idea, ask whether the idea is needed. The stated exception is a large table.

## Do

- Prefer a small, accurate set. Delete outdated pages in small batches instead of leaving them beside current ones.
- Accept a documentation edit that is better than what it replaces. Do not block it for not being perfect.
- Open every page with one H1 and one to three sentences that say what the thing is and why it matters.
- Put an outline after that introduction when the page is longer than a screen. Put extra links in "See also".
- Make every heading unique and specific enough to be a link target.
- Use ATX headings, fenced code blocks with a language tag, and Markdown rather than HTML.
- Use inline code for a name. Use a fence for anything longer than a line.
- Link with a path inside the corpus and with words that say what the target is.
- Use a table only for uniform, scannable data. Otherwise use a list.
- Keep official capitalization of product and tool names.
- Wrap prose so diffs stay reviewable. Leave links, tables, headings, and code on their own longer lines.

## Don't

- Do not grow a large doc set that nobody is updating. Stale pages are not neutral.
- Do not hold a useful doc change until it is also complete, polished, and covers the next topic.
- Do not put a second H1 in the body, or start the body at H1 after the title.
- Do not name two sections "Summary", "Example", or "Overview".
- Do not use setext underlines or indented code blocks.
- Do not link with "here" or by pasting the URL as the label.
- Do not point at another directory with `../` when a path from the root will survive a move.
- Do not put a long or repeated URL inline in a table. Do not put prose in a cell.
- Do not add an image that text can replace, or an image with no description.
- Do not drop HTML in to force a layout Markdown already expresses.
- Do not add an author banner when version history already records who wrote the page.

## Worth carrying into the skill

Agent-agnostic writing rules:

- Minimum viable documentation, pruned on purpose. Fresh and small beats complete and stale.
- A fixed page shape: title, one-to-three-sentence introduction, outline if the page is long, body from H2, further reading at the end.
- Unique, complete headings so a link or a search lands on one section.
- Fenced, language-tagged code. Inline code for names. No HTML.
- Links whose text is meaningful, whose target is a stable path, and whose long URLs are pulled out of the sentence.
- Tables only when both dimensions carry distinct, uniform values. Lists otherwise.
- A review habit that ships doc fixes. Perfection is how a corpus goes stale.

Leave as Google hosting details: `[TOC]` as a Gitiles directive, Code Search, changelists, and LGTM. The placement rule still applies wherever an outline is written into the file: it comes after the introduction, not at the end. The 80-column wrap is a diff and review convention, not a token limit. Title case is not defined on this page.

## Token implications

- The introduction is the cheap prefix. An agent can stop there when the page is the wrong topic. The outline, if it follows immediately, is the next cheap layer. The body of a section loads only after a heading matches.
- Unique headings make a section addressable. Duplicate names like "Summary" force a read of several sections to find the right one.
- A small corpus cuts the search. A deleted stale page cannot be cited.
- "See also" at the bottom keeps optional links out of the introduction, so they are not in the first screen of context.
- A table of prose is a wide block the agent must parse for one fact. A short list under a heading is less text and a clearer boundary.
- An image without alt text costs a fetch and returns nothing an agent can use. Alt text is the only form of that image that belongs in context.
- HTML and indented code blocks are ambiguous in source. The agent spends tokens deciding where the block ends and what language it is.
- "Here" links throw away the phrase that would have said whether the target is worth opening.
- Shipping imperfect doc updates is a token saving over time. A perfect style that delays the edit leaves the old, wrong page in the read set.

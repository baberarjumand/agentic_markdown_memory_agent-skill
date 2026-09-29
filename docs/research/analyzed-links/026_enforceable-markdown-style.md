# Style rules worth enforcing

| | |
|---|---|
| Sources | [style-guides/markdown](https://github.com/style-guides/markdown); [Gruntwork Markdown style guide](https://docs.gruntwork.io/guides/style/markdown-style-guide/); [Ocular-d headings](https://ocular-d.github.io/styleguide-markdown/headings.html); [markdownlint rules](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md) |
| Read | 2026-09-29 |

These are house styles and a linter. They overlap [006](006_google-markdown-style-guide.md) and [011](011_twmp-markdown-best-practices.md). The new point is which rules a machine can check, and one disagreement about tables of contents.

## What the sources recommend

Shared, and already in earlier notes: one H1, ATX headings, a space after `#`, blank lines around blocks, no skipped heading levels, one list marker, fenced code with a language, no trailing whitespace, markdown rather than HTML, unique heading text because anchors collide.

Additions:

- style-guides/markdown uses RFC-2119 language. Unordered lists are `-`. Ordered lists are written as `1.` on every item so a diff is one line. No blank line between single-line items. Two blank lines above a heading unless headings are adjacent. Emphasis is `*` and `**`, not `_` and `__`. Shell fences do not start with `$`, or the paste includes the prompt. Inline code for paths and for expressions like `5 * 1000` so the asterisk is not emphasis.
- Ocular-d: headings under about 80 characters, no trailing punctuation, sentence case, nothing before the `#` on the line. A long sentence belongs in the paragraph under the heading, not in the heading. Duplicate heading text is forbidden.
- markdownlint encodes the same ideas as rules: MD001 do not skip levels, MD003 one heading style, MD004 one unordered marker, MD025 a single top-level heading, MD041 the file starts with that heading or a frontmatter title, MD009 no trailing spaces, MD047 a single trailing newline. A title in frontmatter can count as the H1 so the body need not repeat it.
- Gruntwork is a Google-derived guide. It tells you to omit a hand-written table of contents when the host generates one from headings, because a hand-written TOC drifts. A short inline list that introduces the next section is allowed. Wrap near 120 characters, not 80, with the same exceptions for links and tables. One blank line between elements. Files end with a newline so diffs stay clean. Do not indent a normal paragraph.

## Do

- Lint the corpus. At least: one heading style, no skipped levels, one list marker, a single title, no trailing space.
- Keep headings short and unique. Put the sentence underneath.
- Write ordered lists as `1.` when they will be edited.
- Do not prefix a shell example with `$`.
- Prefer a generated outline from headings. Maintain a hand-written TOC only for a section you are introducing, not for the whole page.
- Let frontmatter `title` be the page title if the body would only repeat it.

## Don't

- Do not mix ATX and setext in one file. A `---` under a line of text can be read as a heading.
- Do not put punctuation at the end of a heading.
- Do not use `_italic_` in a corpus that standardized on `*`.
- Do not indent ordinary paragraphs.
- Do not keep a full-page TOC that duplicates the headings and then drifts.

## Worth carrying into the skill

- Machine-checked structure is what makes an outline trustworthy. The rules above are the minimum set.
- A generated TOC from headings beats a second outline in the file. This softens [006](006_google-markdown-style-guide.md), which places a `[TOC]` directive in the source for hosts that need it. If the reader is an agent, the headings are the TOC. Do not also paste one.
- Shell examples must be pasteable. A `$` is not part of the command.
- Frontmatter title can replace a repeated H1. The body still needs headings for sections.

## Token implications

- A duplicate heading forces the agent to read both sections to know which anchor was meant.
- A hand-maintained TOC is a second copy of the headings. It costs tokens and can disagree with them.
- A `$` in a shell block is a token that breaks a paste and teaches the wrong command.
- Lint failures are cheaper to catch in CI than to discover after an agent follows a broken outline.

# Best Practices and Tips in Markdown

| | |
|---|---|
| Source | [Best Practices and Tips in Markdown](https://technicalwritingmp.com/docs/markdown-best-practices/) |
| Author | Technical Writing Mentorship Program. Page last updated 2025-06-17 by Nickyshe. |
| Read | 2026-09-29 |

This is a course lesson. A large part repeats earlier notes: headings as an outline, descriptive link and image text, inline code versus a fenced block with a language tag, and frontmatter at the top of the file. The lesson's own previews are unreliable in places (a "backlash" typo, code samples whose fences broke). Those broken previews are not practices.

The lesson points at three style guides and does not summarize them. Google's is already [006](006_google-markdown-style-guide.md). The other two are unread: [carwin/markdown-styleguide](https://github.com/carwin/markdown-styleguide) and the [Gruntwork Markdown style guide](https://docs.gruntwork.io/guides/style/markdown-style-guide/).

## What the source recommends

### Outline, spacing, and literal characters

Headings split a page into sections a reader can jump to. The heading says what the following paragraphs are about. A subheading is one more `#` than its parent, so the level matches the nesting.

The lesson's sample outline numbers every heading (`## 1.`, `## 2.`, `### a.`, `#### i.`) and goes four levels deep, starting at H2. That is a teaching sketch of nesting. It is a poor default. Numbers in headings drift when a section is inserted, and a fourth level is deeper than the cap already taken from [007](007_ibm-markdown-documentation-best-practices.md).

Whitespace is a correctness check, not decoration. Words need single spaces. Paragraphs need a blank line between them. The failure shown is words glued together (`interpretedprogramming`) and, separately, a page that is mostly empty vertical space. After writing, reread the source for both.

A character that Markdown would treat as syntax (`*`, `#`, and the rest) is written with a backslash when it should appear as itself: `\*me and you\*`. The lesson does not mention the other escape Google already prefers for sample paths and URLs: wrap them in backticks. Both keep the character literal. Backslash is the one this page teaches.

### Lists, tables, code, links

Ordered lists use real numbers (`1.`, `2.`, `3.`) for a procedure. Unordered lists use `*` or `-`, and the document picks one marker and keeps it. The lesson does not use lazy numbering (every item written as `1.`), which [006](006_google-markdown-style-guide.md) and [007](007_ibm-markdown-documentation-best-practices.md) recommend for long lists that will be edited.

Tables render even when the columns are ragged. The lesson still wants the source padded so each column lines up, because a person editing the file can see which cell belongs to which header. Alignment does not change the rendered table.

Code is the usual split: one pair of backticks for a short span, a fence for a block, and a language tag on the fence.

Links and images need text that says what they are. "Click here" and alt text of "Image" are the bad cases. A specific alt string is the good case. An image can itself be the link, `[![alt](image)](url)`, and the alt text is still required.

Frontmatter is a `---` block at the top. The example fields are `title`, `author`, `date`, `description`, `tags`, and `category`. The lesson's reason is that a site or editor can summarize the file without reading the body. `description` is that summary.

### What this page does not decide

Consistent style is delegated to the three guides above. Editors are a catalog, not a rule: Dillinger, Typora, StackEdit, Ghostwriter, and Mou, chosen for preview or a quiet writing screen. Export targets (HTML, PDF) are outputs. They are not the file you keep.

## Do

- Keep one unordered-list marker for the whole document.
- Leave a single blank line between blocks. Put one space between words.
- Escape a literal `*`, `#`, or similar with a backslash, or put the sample in code spans, so the character is not interpreted.
- Pad table columns in the source when a person will edit the file and the rows are short enough that alignment stays readable.
- Put a short `description` in frontmatter, with `title`, `date`, and `tags` when those help selection.
- Write alt text even when the image is the link.

## Don't

- Do not number headings `1.`, `a.`, `i.` as the way to create an outline. The hashes are the outline. Inserting a section should not renumber titles.
- Do not take this lesson's four-level sample as permission to nest past the third level.
- Do not glue words together or stack blank lines.
- Do not switch between `*` and `-` in the same document.
- Do not use "click here" or alt text that only says "Image".
- Do not treat a ragged table and a padded table as different documents. They render the same. Pad only to help a human read the source.
- Do not adopt a broken preview from this lesson as syntax.

## Worth carrying into the skill

New:

- One list marker per document.
- Literal Markdown characters are escaped or wrapped in code, never left to be parsed by accident. This matters when a file quotes syntax or stores a user string that contains `*` or `#`.
- One blank line between blocks, one space between words. Extra blank lines and missing spaces are both defects.
- Frontmatter `description` is the summary line. `title`, `date`, and `tags` support selection. `author` and `category` are for a publishing site, not required on a memory file.
- Table padding is for human editing. It is optional, and it stops when the padding is longer than the content.

Conflicts to keep visible rather than silently merge:

- This lesson numbers ordered lists `1.`, `2.`, `3.` Google and the IBM post use lazy `1.` on long lists that change. Prefer lazy numbering when the list is edited often. Prefer real numbers only when the sequence is short and stable, which is Google's split. This lesson does not make that split.
- This lesson's sample headings are numbered and four levels deep. The skill already prefers unnumbered, unique headings and a depth of about three.

Already covered: descriptive links and alt text, fenced code with a language, frontmatter as a concept, generated HTML and PDF as outputs.

Leave the editor catalog out. Read Carwin and Gruntwork as their own sources before taking line-wrap, emphasis characters, or "omit the table of contents" from the search snippets above. Those rules are not in this lesson.

## Token implications

- A missing space can merge two words. The agent then reads a token that is not a word. An extra run of blank lines adds tokens and no information. One blank line is the whole rule.
- Numbered heading titles cost a renumber of every later heading when the outline changes, and they duplicate the level the hashes already encode.
- Padded tables store spaces the renderer ignores. Worth it for a small table a person edits. Not worth it when the padding dominates the row. An agent does not need the spaces to recover the cells.
- A frontmatter `description` is still the cheapest skip-or-open line.
- An unescaped `*` in stored text becomes emphasis. The agent then treats a literal string as structure. Escape or wrap it once so later reads do not have to guess.

# Markdown format explained: From basics to best practices

| | |
|---|---|
| Source | [Beginner's guide to Contentful text types: Markdown and rich text](https://www.contentful.com/blog/beginners-guide-to-contentful-text-types-markdown-richtext/) |
| Author | Brittany Walker, Contentful |
| Updated | 2026-03-24 |
| Read | 2026-09-29 |

The page is a beginner's syntax tour plus a product comparison. The syntax (emphasis, lists, links, fences, blockquotes) is already covered by [005](005_markdown-documentation-for-apps.md) through [009](009_docsie-markdown-glossary.md). This note keeps the choice the page is actually about: store the words as Markdown, or store them as rich text.

One internal contradiction: the page says to put a space after `#`, then shows `#Heading` with no space. Follow the stated rule. The examples that omit the space are not a practice.

## What the source recommends

Markdown, from John Gruber in 2004 with Aaron Swartz, is plain text that a processor turns into HTML. The document should be readable before that conversion. Symbols mark structure. They do not hide it behind a visual editor. Content stays separate from presentation, so the same file can be rendered in more than one place.

Why the page says teams still use it:

- A person can read the source.
- Processors emit semantic HTML, not the nested markup a visual editor often produces.
- The file is ordinary text. Any editor on any operating system can open it.
- If the application that created it disappears, the file is still text.
- Git can diff it line by line.

The page names CommonMark (2014) as the consistency effort, and GitHub Flavored Markdown as the common extension: tables, task lists, strikethrough. Contentful's editor is GFM. Fundamentals match across flavors. Extra features do not. The page does not say to mix them.

Markdown is the fit for technical docs, API guides, internal wikis, READMEs, and notes in tools such as Obsidian, Notion, and Bear, where links between notes are the structure. It is also the fit when one body of text must go to web, mobile, and another channel without dragging one page's HTML styling along.

It is not a replacement for every document. Marketing pages, complex layout, and embedded media are the cases the page assigns to a rich text editor.

### Markdown or rich text

| | Markdown | Rich text |
|---|---|---|
| Editing | Plain-text symbols | Visual, no syntax |
| What is stored | The source text, rendered later to semantic HTML | In Contentful, a JSON object. Elsewhere, often HTML. |
| Diffs | Line-by-line | Hard. Binary or a structure that does not read as a paragraph. |
| Portability | Any text editor | Tied to the application that understands that JSON or HTML |
| Use when | Developers, technical docs, simple posts | Marketing, complex layout, embedded media |

In Contentful the Markdown field is a string (short text for a title, long text for a body). The rich text field is JSON so an entry can embed another entry or an asset, and a client can render it without parsing an HTML string. The page's rule: pick the string when the priority is portability and a simple workflow. Pick JSON when the page must embed other content and lay it out.

### What the page says about models

Three claims, all brief:

- Models have seen a lot of Markdown from GitHub, Stack Overflow, and technical docs, so the heading hierarchy is a familiar structure.
- When a model writes docs, tutorials, or code explanations, Markdown is a format a person can read and a tool can parse.
- Headings and steps inside a prompt give the model boundaries between parts of the instruction.

The page does not measure any of this. It does not claim Markdown is the only format a model can follow.

## Do

- Store technical and knowledge-base text as Markdown so the source is the document.
- Keep content free of one channel's styling. Render later.
- Use a space after heading hashes. Declare one flavor (CommonMark, or GFM when you need tables and task lists) and stay on it.
- Use Markdown when the file must be diffed, opened without the original app, or sent to more than one channel.
- Use rich text only when the page must embed other entries or assets and a visual editor is who writes it.
- When an agent writes documentation, have it write Markdown, not a CMS-specific JSON tree.
- Use headings and lists in long instructions so each part has a boundary.

## Don't

- Do not treat a WYSIWYG document as the archive. The page's own comparison says those diffs and exports are the fragile side.
- Do not store agent memory as rich text JSON. A later agent needs the CMS, or a parser, before it can read a paragraph.
- Do not copy rendered HTML back in as the source. The point of the processor is that the Markdown stays the original.
- Do not use Markdown to fake a complex layout it does not express. Do not use rich text for a README or an API page that should live in Git.
- Do not drop the space after `#`.
- Do not assume every flavor has tables, task lists, or strikethrough.

## Worth carrying into the skill

The decision, not the syntax lesson:

- The stored form is Markdown. HTML, PDF, and a rendered site are outputs.
- Rich text JSON is a different product. It embeds and lays out. It does not diff, travel, or survive the product as text. Agent memory and project docs stay on the Markdown side of that line.
- If a fact only exists inside a CMS embed, write it into the Markdown or the agent cannot see it without that CMS.
- Ask agents to emit Markdown for anything a later session must read.
- Long instructions can use the same heading and list structure as the docs, so sections are boundaries rather than one undifferentiated prompt.

Leave as Contentful product detail: field types, the CLI import, and their rich text JSON shape. Obsidian, Notion, and Bear are examples of note tools, not requirements. The training-data claim is background. It is not a reason to add Markdown syntax to a file that does not need it.

## Token implications

- A Markdown body is the text. A rich text JSON document repeats that text inside a tree of node types. The agent pays for the tree to recover the paragraph.
- An embedded entry is a pointer. Unless the target is also in the file, the agent either calls the CMS or answers without the embed. For memory, the fact belongs in the Markdown.
- Semantic HTML from a processor is still a second copy. Read the `.md` file, not the generated page, unless the question is about the rendered site.
- Headings in a prompt are cheap structure. They let a model treat "rules" and "examples" as separate blocks instead of one string where scope is unclear.
- Flavor features that the next tool does not parse (a table in a CommonMark-only reader) become noise. The agent may flatten or skip them.

# Markdown: Definition, Examples & Best Practices

| | |
|---|---|
| Source | [Markdown](https://www.docsie.io/blog/glossary/markdown/) |
| Author | Docsie glossary |
| Published | Page title says 2026. No publication date in the article. |
| Read | 2026-09-29 |

This is a product glossary, not a specification. The definition is the usual one: plain-text syntax that converts to HTML and other formats, stored as `.md`, reviewed in Git, rendered by a processor. The Docsie product pitches and the outcome percentages (60%, 70%, 80%, 50%) are not evidence. They are not carried forward.

Most of the five "best practices" already appear in [005](005_markdown-documentation-for-apps.md) through [008](008_document-apis-with-markdown.md): one style, a linter, one flavor, docs in Git, pull-request review, relative links, link checks, H1 then H2, alt text, no "click here." The notes below keep what this page adds.

## What the source recommends

### Structure is meaning, not decoration

The page's principle is semantic markup. Writers mark what a block is (title, section, list, code). Appearance is applied later, per output (HTML, PDF, API docs). The raw file has to stay understandable with no renderer.

That rules out two shortcuts:

- Skipping a heading level, or using a heading because it looks big. The sequence is H1 for the document title, then H2 for main sections, without jumps. Heading text has to work as a navigation label.
- Writing so the page only makes sense after it is rendered. Spacing, link text, and image text have to work in the source.

### A file a person and a tool can both use

The page pairs human reading with machine use:

- Alt text on images.
- Metadata in YAML frontmatter.
- Consistent spacing.
- Link text that still means something when it is lifted out of the sentence. "Click here" fails that test.

Internal links are relative. External links are inventoried and checked on a schedule, not only internal ones. Validation runs in the build. A manual pass is not the process.

Style rules cover heading hierarchy, list formatting, link style, the language on a code fence, and table shape. One flavor for the whole set. A linter enforces the rules. Mixed flavors are called out as a migration hazard, not only a consistency problem.

### One source, several outputs

Four scenarios use the same idea. One Markdown corpus is the source. HTML and PDF are generated. Do not keep a second copy in a word processor or a proprietary knowledge base.

- API docs: templates with standard sections, files under `/docs` in the code repo, snippets that can be generated from code comments, CI that validates and publishes on a code change.
- The same guide on several platforms: frontmatter for metadata, conditional sections for platform-specific steps, a check that links still work in each output, one review when a change affects more than one platform.
- Specs: a template of required sections, branch protection, pull-request approval, an automated completeness check, and a generated HTML or PDF for people who will not read the repo.
- Leaving a proprietary knowledge base: convert to Markdown, write the style guide and the folder structure first, then index and cross-link.

Version control is not optional for a "quick" edit. The page rejects treating Markdown like a binary file and bypassing Git, because that drops the review and the history.

## Do

- Mark structure. Leave presentation to the renderer.
- Use one H1. Move through heading levels in order. Write headings that can stand as menu entries.
- Put metadata in frontmatter. Give images alt text. Write link text that makes sense alone.
- Keep one Markdown flavor and one style guide. Lint them.
- Check links in the build. Use relative links inside the corpus. Keep a list of external URLs and recheck them.
- Store the files in Git. Review changes. Do not edit around the repository.
- Keep one source and generate HTML, PDF, or a site from it.
- Use a template with required sections when many people write the same kind of page.
- If a paragraph applies to only one platform, mark it so the other platforms are not forced to carry it.

## Don't

- Do not skip heading levels or use a heading as a font size.
- Do not write source that is only coherent after rendering.
- Do not use "click here" or leave alt text and frontmatter off.
- Do not let each author pick a flavor.
- Do not treat a broken external link as someone else's problem.
- Do not ship a quick doc fix outside version control.
- Do not maintain a Word or wiki copy in parallel with the Markdown.
- Do not duplicate a whole guide per platform when a marked section would do.

## Worth carrying into the skill

New or sharper than the previous notes:

- Semantic structure. A heading, list, or code fence is a type of information. It is not decoration. An agent can trust the outline only if levels are not skipped and headings are not used for emphasis.
- Link text must survive being taken out of the paragraph. Indexes and agents often see the label without the sentence.
- External links need an inventory and a health check. Internal relative links are not the whole problem.
- One source, generated outputs. A second copy in another format will drift and become a second thing to read.
- Platform-specific steps are marked sections, not cloned documents.
- A completeness check against a template (required sections present) is a structural test, separate from "does the claim seem right?"
- No drive-by edits outside Git.

Already covered elsewhere, and only confirmed here: `/docs` beside the code, templates, CI, linters, frontmatter, alt text, pull-request review.

Leave out: Docsie, the Ollama documentation pitch, and every percentage in the use cases. Also leave the idea that a WYSIWYG editor removes the need to care about the source. The page's own rule is that the raw file has to stay readable.

Generated snippets from code comments are a producer, not a second store. If a comment and a hand-written page can disagree, say which one wins. This page does not.

## Token implications

- A real outline (no skipped levels, headings that name the section) is a table of contents an agent can use without reading the body.
- Frontmatter is the skip-or-open decision. A file with no metadata has to be opened to be classified.
- Link text that stands alone lets an agent decide whether to follow it. "Click here" forces a fetch.
- A dead external URL is a wasted fetch. Checking the inventory avoids that.
- Conditional platform sections keep one file instead of N copies, and they only save tokens if the agent can skip the sections that do not apply. Unmarked platform notes get loaded every time.
- A parallel PDF or wiki page is extra context that can contradict the Markdown. Generate it. Do not read it as a source.
- A template completeness check fails fast. The agent does not spend a turn discovering that a required section was never written.

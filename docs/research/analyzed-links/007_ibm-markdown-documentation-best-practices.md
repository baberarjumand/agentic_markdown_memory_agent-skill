# Markdown Documentation: Best Practices for Documentation

| | |
|---|---|
| Source | [Markdown Documentation: Best Practices for Documentation](https://community.ibm.com/community/user/blogs/hiren-dave/2025/05/27/markdown-documentation-best-practices-for-document) |
| Author | Hiren Dave, IBM Community (DevOps Automation) |
| Published | 2025-05-27 |
| Read | 2026-09-29 |

This post is a documentation style guide for app docs. Most of it restates [005](005_markdown-documentation-for-apps.md) (published the day before) and parts of [006](006_google-markdown-style-guide.md): one Markdown flavor, a README as the front door, shallow headings, lists versus steps, language-tagged code, alt text, a style guide, a linter, and updates shipped with the product. The note below keeps the source's claims, then separates what is new.

The page itself is uneven. A few examples are garbled (a "python" fence that is not Python, "for about articles"). Those are not practices.

## What the source recommends

Markdown is chosen because the raw text stays readable, and the files are not locked to one word processor. The post's bar for success is documentation people actually use.

### Plan the boundary and the owner

Before writing, name what is in scope (features, APIs, behavior) and what is out. Name who writes, who maintains, and who reviews. Collaborative editing is fine only after those roles exist.

Store the files in Git. Work on a branch, merge through a pull request. Issues track doc tasks. GitHub Pages is mentioned as one way to publish the rendered files. The store of record is the repository, not the published site.

Use CommonMark. The post calls this "standard Markdown" and treats extensions as something you adopt only when you know which tools support them. Complex syntax is compared to complex code: both are a liability. A linter checks the style guide. The editor or converter must support every feature the files use.

### Structure and syntax

- At most two or three heading levels.
- Lists break a dense explanation into pieces.
- `README.md` is the front door: a high-level overview of what the app does and how to use it, and the first thing a reader sees.
- Bullets use a hyphen, including for short lists.
- Steps are numbered, and every item is written as `1.` so edits do not require renumbering. The renderer supplies the sequence.
- One date and time standard. The post does not name the format.
- Internal links use ordinary Markdown links to a heading or another file.
- Inline code (backticks) for a command or a name inside a sentence.
- Fenced blocks always name a language (`python`, `javascript`, `bash`).
- A horizontal rule (`---`) is rare. Use it only for a real break.
- Bold with `**`, italics with `_`. Emphasis is scarce, because a page of emphasis has no emphasis.
- Short paragraphs and shorter sentences.
- Line length around 100 characters. The post also says about 79 for "articles." The second number is attached to a broken sentence, so treat 100 as the stated default and 79 as uncertain.
- Spell out an acronym on first use, with the short form in parentheses.
- No slang. Define a technical term when it first appears. Do not assume the reader already lives in the details.

### Clarity, access, consistency

Clarity is the requirement, not a polish pass. If the reader cannot understand the page, the page failed. Run spelling and grammar checks.

Every image has alt text that describes the content. A decorative image gets empty alt text so a screen reader skips it. Link text says what the link does, not "click here." Image filenames should also say what the file is.

Pick one style guide and follow it. The example named is Microsoft's. `markdownlint` is the named checker. User feedback is how you learn what is confusing, missing, or wrong.

### Maintenance

Update the docs with every application version. The post's line is sharper than "keep them current": old documentation is worse than no documentation. Budget the work in the same cycle as development and testing.

Check links. Broken links remove trust. Run a link validator regularly. As features change, re-check that the heading structure still matches how a reader looks for an answer.

## Do

- State in-scope and out-of-scope before drafting, and name the author, the maintainer, and the reviewer.
- Keep the files in Git. Change them on a branch and merge by review.
- Standardize on CommonMark. Add an extension only when every tool that reads the corpus supports it.
- Stop at two or three heading levels.
- Make `README.md` the overview of what the thing does and how to use it.
- Use `-` for bullets and `1.` for every step in a procedure.
- Tag every code fence. Use inline code for a single name or command.
- Cap emphasis. Expand an acronym once. Define jargon on first use.
- Give informative alt text, or empty alt text when the image is decorative.
- Adopt one style guide and enforce it with a linter such as `markdownlint`.
- Ship doc updates with the version. Run a link check on a schedule.
- Change the docs from what readers report is missing or wrong.

## Don't

- Do not leave ownership implicit. An unowned page goes stale.
- Do not publish the rendered site as the only copy.
- Do not invent a private Markdown dialect.
- Do not nest headings past the third level.
- Do not number a long procedure by hand if the list will be edited. The post wants every item written as `1.`.
- Do not emphasize so much of the page that priority disappears.
- Do not leave a first-use acronym or a specialist term undefined.
- Do not use "click here," or an image with no alt decision (describe it, or mark it decorative).
- Do not leave a broken link in place.
- Do not keep a page that describes an old version and still looks current. The post prefers no page over a wrong one.

## Worth carrying into the skill

Already in 005 or 006, and only confirmed here: one flavor, README as the entry, shallow outline, inline code versus fenced blocks, descriptive links, alt text, a style guide plus a linter, docs updated with the product, short sentences.

Sharper in this post, and worth keeping:

- Out of scope is part of the plan, not an afterthought.
- Three roles, not one: author, maintainer, reviewer.
- Heading depth caps at two or three levels. That resolves the ambiguous "three or fewer headers" line in 005 as depth, not as a count of headings.
- Bullets are hyphens. Procedures are lazy-numbered (`1.` on every item), including lists you expect to edit. Google's guide preferred real numbers for a short stable list. This post does not make that exception.
- Old documentation is worse than none. A stale page that still looks authoritative should be updated or removed, not left up.
- Decorative images get empty alt text so they are not read as content.
- A link checker is a repeating automated check, not a one-time pass.

Do not require Microsoft's style guide or GitHub Pages. They are this author's examples of "pick one guide" and "you may publish a rendering." The store of record stays the Markdown in Git.

## Token implications

The new costs and savings, beyond 005 and 006:

- A third heading level is already deep for a scan. Deeper nests hide the answer under headings the agent has to walk.
- A stale page is not cheap context. The agent can cite it. The post's rule, remove or rewrite rather than leave it, deletes that failure from the read set.
- An explicit out-of-scope list stops a search through docs that were never meant to answer the question.
- Empty alt text on a decorative image adds nothing to context. Descriptive alt text is the only image content worth loading.
- Lazy numbering does not change token count. It does keep diffs small, so a review of a doc edit does not reread an entire renumbered procedure.

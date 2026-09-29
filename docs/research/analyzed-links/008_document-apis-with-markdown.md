# Efficiently Document APIs with Markdown

| | |
|---|---|
| Source | [Efficiently Document APIs with Markdown](https://zuplo.com/learning-center/document-apis-with-markdown) |
| Author | Zuplo learning center (page author: josh) |
| Published | No date in the page frontmatter. Illustration path is dated 2025-04-14. |
| Read | 2026-09-29 |

This is a guide to API reference docs, not to general agent memory. The useful idea is a repeated page shape: one resource per file, the same sections in the same order, and examples that were run against the real API. An agent that knows the shape can open one file and stop at the section it needs.

The section titled "seven features" shows six: headings, lists, code fences, tables, emphasis, and blockquotes.

## What the source recommends

Markdown stays readable in a pull request, so a doc change can be reviewed without building a site. Files live in Git next to the code. Versions can be branches. A bad edit can be reverted. The same files convert to HTML or PDF. The author's converter is remark. The point they want kept: the Markdown is the investment, and the renderer can change.

### A hierarchy that matches the API

Headings follow the API, not a generic essay outline:

- H1 is the API
- H2 is a concern (authentication, endpoints)
- H3 is one operation (create payment, get status)

Lists carry parameters. Required ones are numbered. Optional ones are bullets. Each item is a name in inline code, then a short definition. Nested response fields are nested lists, not another table.

Tables are for rows that share the same columns: status codes, or a parameter sheet with name, type, required, description, and default. An endpoint index is a table of method, path, and one-line description.

Emphasis is reserved for a note a caller must not miss (a rate limit) and for deprecation, including what replaces the old call. A blockquote is a warning, especially a security warning. The guide does not say to bold ordinary prose.

Code examples are fenced and language-tagged. The claim is that readers skip to them, so the example has to be the real call.

### One template for every endpoint

Each operation page, in order:

1. A table of methods, paths, and one-line descriptions for that resource.
2. Authentication, before any call. The example is a bearer token in a header, not in the URL.
3. A parameter table.
4. The response shape as a nested list when the object is deep.
5. A complete request and a complete response, both copy-paste ready, including headers and body. Not a fragment.

Files mirror how a caller looks the API up:

```
docs/
  introduction.md
  authentication.md
  endpoints/
    users.md
    products.md
    orders.md
  errors.md
  changelog.md
```

One resource per file. Errors and history are their own files, so they are not copied into every endpoint. The same heading pattern, the same words ("endpoint" or "route", not both), and a template for the repeated parts.

The author's preferred renderer is Zudoku, which allows MDX (Markdown plus React components). That is a product suggestion. It cuts against the portability claim earlier in the same post: an agent or tool that only reads Markdown cannot execute a component.

### Process that keeps the pages true

A style guide is mandatory and covers heading levels, code format, file names, and terminology.

Documentation is part of the change, not a follow-up:

- The docs are in the same repository as the API.
- The same pull request updates the code and the docs.
- Review includes the docs.
- Merge waits on documentation checks.

Automation: build the docs in CI, lint the Markdown, check links, flag stale examples, and run the documented calls against the API.

Reviews still happen on a schedule (the post says quarterly). A public changelog records what changed. Doc issues are tracked separately from code issues. Each page can carry a last-updated time.

### Failures the post names

- An example that was never run, or that shows only the happy path, or that is a fragment. Callers paste examples. Update them when the API changes, and show a common error as well as success.
- Drift. A page that describes a removed API wastes the reader. Treat that as debt: review gate, a test of the example, a last-updated line.
- A different outline for each endpoint. The reader relearns the page every time.
- Navigation that is only a long scroll. Use the folder hierarchy, links between related pages, and search once the set is large. A sidebar is for the rendered site.
- No review on doc edits, and no channel for the people who got stuck.

## Do

- Put API docs in the same repo as the code, and in the same pull request.
- Give each resource its own file. Keep a shared `authentication.md`, `errors.md`, and `changelog.md`.
- Use the same section order on every endpoint: index table, auth, parameters, response shape, full request, full response.
- Put authentication before the first call. Say where the credential goes.
- Use a table when every row has the same fields (methods, parameters, status codes). Use a nested list for a deep object.
- Write examples that run. Include the whole request and the whole response, plus one common failure. Retest them when the API changes.
- Mark deprecation and rate limits so they are obvious, and name the replacement.
- Put security warnings in a blockquote, not in a paragraph that looks like the rest of the page.
- Pick one term and one heading pattern. Write them into a style guide and a template.
- Lint, check links, and block the merge when the docs or the examples are wrong.
- Stamp a page with when it was last updated.

## Don't

- Do not leave docs for a later change. They will describe the previous API.
- Do not document every endpoint in one file.
- Do not paste a partial snippet and call it an example.
- Do not show only the success response.
- Do not put secrets in a query string in an example. The post's rule is the Authorization header.
- Do not use a different outline, or a different word for the same thing, on the next endpoint.
- Do not bury a deprecation in body text.
- Do not use a table for a nested object or for prose. Do not use a list for a status-code matrix.
- Do not require MDX or a React component to read the doc. Keep the source as Markdown a plain tool can open.
- Do not treat a rendered sidebar or search index as the only map. The folders and the links have to make sense in the repo.

## Worth carrying into the skill

These apply whenever an agent writes or reads reference docs, not only HTTP APIs.

- One subject per file, plus a few shared files (entry, rules, errors, changelog) so the common parts are not repeated.
- A fixed section order. The agent jumps to "parameters" or "example" instead of reading the page.
- Tables for uniform rows. Nested lists for nested structure. That matches the Google guide's table rule and makes it concrete.
- Examples are executable and complete, and a check fails when they drift from the system they describe.
- Warnings and deprecations are marked and placed where a skim cannot miss them. Name the replacement.
- A last-updated line is a cheap freshness signal.
- Same repository, same change, review includes the doc.

Leave as this vendor's stack: Zuplo, Zudoku, remark, Shiki, and MDX. Analytics, bounce rates, and quarterly human reviews are product-management advice. The agent-facing piece is the timestamp and the tested example.

Overlap with 005–007: Git next to the code, one flavor of structure, language-tagged fences, alt text, a linter, link checks, and stale pages as harmful. This note's addition is the endpoint template and the rule that an example is a test.

## Token implications

- The method table is the cheap layer for "what can I call?" The parameter table and the example load only when the task is to make the call.
- One resource file caps the read. A single API manual forces the agent through unrelated endpoints.
- Auth, errors, and changelog live once. Repeating them on every page multiplies the same tokens.
- A full example costs more than a fragment and less than a wrong call. Load it when implementing. Skip it when the question is only whether the endpoint exists.
- A deprecation line at the top of the section saves the agent from reading the old procedure and then undoing it.
- A last-updated stamp lets the agent distrust a page without a second search to see if it is current.
- MDX components are opaque to a text agent. They add source the agent cannot use and can hide the fact that was supposed to be in the Markdown.

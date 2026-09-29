# Wikilinks are not portable Markdown

| | |
|---|---|
| Sources | [Obsidian internal links](https://obsidian.md/help/links); [Obsidian help: internal links](https://github.com/obsidianmd/obsidian-help/blob/master/en/Linking%20notes%20and%20files/Internal%20links.md); [ADR: Obsidian compatibility, later reverted](https://github.com/modeled-information-format/MIF/blob/main/adr/ADR-003-obsidian-compatibility.md) |
| Read | 2026-09-29 |

Obsidian and Roam store relationships in syntax that is not CommonMark. A vault that uses it is easy to browse in that app and easy for another agent to misread. The portable link is a normal markdown link. Wikilinks are a convenience when every reader is Obsidian.

## What the sources recommend

Obsidian accepts `[[Note]]`, `[[Note#Heading]]`, `[[Note#^block-id]]`, and `[[Note|label]]`. Aliases let many names point at one file. Block references are explicitly not standard Markdown. Obsidian's own help says to turn wikilinks off if interoperability matters. Autocomplete can still insert a markdown link.

A format that required wiki-links, block ids, and `@[[Name|Type]]` later dropped those requirements. The parts kept were YAML frontmatter, plain text, and the folder as a namespace. Generic linters flag `[[links]]` even when a person considers them valid. Roam's `((uid))` block refs do not survive a move to another tool without a conversion pass. Characters such as `:`, `/`, `\`, and `|` in filenames break link updates.

## Do

- Use `[label](path.md)` when the file must be readable by any agent, any linter, and git diffs without a plugin.
- If a vault uses wikilinks, treat them as an app feature. Do not put the only copy of a relationship where a CommonMark reader will see an unresolved token.
- Keep filenames free of `:` , `/`, `\`, and `|`.
- Put type and status in frontmatter, not in a custom link sigil.

## Don't

- Do not require block references or wiki-links in a corpus meant for more than one tool.
- Do not put a link inside a filename.
- Do not assume a backlink graph exists for an agent that only sees the file. The graph is derived. The link in the file is the edge.

## Worth carrying into the skill

- Portable structure is CommonMark plus YAML. App syntax is optional and lossy outside that app.
- Folder plus frontmatter already carry scope and type. A second link dialect does not add a relationship the markdown link cannot.
- This qualifies [004](004_markdown-knowledge-graph-humans-agents.md): a link on its own line can still be a parent edge, and it should be a real markdown link if the skill is public.

## Token implications

- An unresolved `[[Name]]` is tokens the agent may treat as a title, a path, or noise. A markdown link is a path it can open.
- Block ids are extra syntax that do not resolve in a plain read.
- One link form means the agent does not spend a turn translating.

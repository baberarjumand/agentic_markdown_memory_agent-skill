# Research index

Notes for the **agentic-markdown** skill: how agents should use markdown to keep memory, context, and documentation useful while spending fewer tokens.

Sources are added one at a time. Each source gets its own numbered note. This file is the index. The synthesis of those notes is [FINDINGS.md](FINDINGS.md).

## Sources

| # | Source | Focus | Note |
|---|--------|-------|------|
| 000 | [AI-powered markdown knowledge base](https://medium.com/cwan-engineering/building-an-ai-powered-markdown-knowledge-base-system-for-your-engineering-team-4bccea3cdbfe) | Entry file, authority tiers, and a map agents read before any other document | [000_ai-powered-markdown-knowledge-base.md](analyzed-links/000_ai-powered-markdown-knowledge-base.md) |
| 001 | [Durable AI knowledge base with markdown and Git](https://changyou.medium.com/i-built-a-durable-ai-knowledge-base-with-markdown-and-git-054191f71975) | Change contracts, provenance versus synthesis, and a repository protocol agents must follow | [001_durable-ai-knowledge-base-markdown-git.md](analyzed-links/001_durable-ai-knowledge-base-markdown-git.md) |
| 002 | [Markdown knowledge management and agent sprawl](https://builder.aws.com/content/3BV4dTySc5qHXR7FW3rj31Ew05i/how-markdown-based-knowledge-management-eliminates-ai-agent-sprawl) | One agent, four file roles, and progressive disclosure through maps of content | [002_markdown-knowledge-management-agent-sprawl.md](analyzed-links/002_markdown-knowledge-management-agent-sprawl.md) |
| 003 | [Open Knowledge Format](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing) | One concept per file, minimal frontmatter, and `index.md` for progressive disclosure | [003_open-knowledge-format.md](analyzed-links/003_open-knowledge-format.md) |
| 004 | [Markdown knowledge graph for humans and agents](https://iwe.md/blog/markdown-knowledge-graph-for-humans-and-agents/) | Shared markdown memory, inclusion links, and depth-capped retrieval | [004_markdown-knowledge-graph-humans-agents.md](analyzed-links/004_markdown-knowledge-graph-humans-agents.md) |
| 005 | [Markdown documentation for apps](https://thenewstack.io/best-practices-for-creating-markdown-documentation-for-your-apps/) | One flavor, a shallow outline, and a summary at the top of each file | [005_markdown-documentation-for-apps.md](analyzed-links/005_markdown-documentation-for-apps.md) |
| 006 | [Google Markdown style guide](https://google.github.io/styleguide/docguide/style.html) | Small accurate corpus, one title plus a short intro, unique headings and stable links | [006_google-markdown-style-guide.md](analyzed-links/006_google-markdown-style-guide.md) |
| 007 | [IBM Markdown documentation best practices](https://community.ibm.com/community/user/blogs/hiren-dave/2025/05/27/markdown-documentation-best-practices-for-document) | Heading-depth cap, lazy numbering, and stale docs treated as worse than none | [007_ibm-markdown-documentation-best-practices.md](analyzed-links/007_ibm-markdown-documentation-best-practices.md) |
| 008 | [Document APIs with Markdown](https://zuplo.com/learning-center/document-apis-with-markdown) | One file per resource, a fixed endpoint template, and examples tested against the API | [008_document-apis-with-markdown.md](analyzed-links/008_document-apis-with-markdown.md) |
| 009 | [Docsie Markdown glossary](https://www.docsie.io/blog/glossary/markdown/) | Semantic headings, frontmatter, and checks for external links | [009_docsie-markdown-glossary.md](analyzed-links/009_docsie-markdown-glossary.md) |
| 010 | [Contentful Markdown vs rich text](https://www.contentful.com/blog/beginners-guide-to-contentful-text-types-markdown-richtext/) | Store Markdown as the source; rich text JSON does not travel or diff | [010_contentful-markdown-vs-rich-text.md](analyzed-links/010_contentful-markdown-vs-rich-text.md) |
| 011 | [TWMP Markdown best practices](https://technicalwritingmp.com/docs/markdown-best-practices/) | One list marker, escaped literal characters, and spacing as a correctness check | [011_twmp-markdown-best-practices.md](analyzed-links/011_twmp-markdown-best-practices.md) |
| 012 | [Markdown as an agent task format](https://dev.to/battyterm/the-case-for-markdown-as-your-agents-task-format-6mp) | One file per task, frontmatter for status, prose for the work, Git as the audit trail | [012_markdown-as-agent-task-format.md](analyzed-links/012_markdown-as-agent-task-format.md) |
| 013 | [SKILL.md as the tool interface](https://juliofalbo.medium.com/markdown-is-the-new-api-how-skill-md-and-ai-gateways-unlock-ai-native-organizations-e929d05c0470) | A short on-demand manual per tool, not a specification left in every session | [013_skill-md-markdown-as-interface.md](analyzed-links/013_skill-md-markdown-as-interface.md) |
| 014 | [Skills vs MCP](https://thenewstack.io/skills-vs-mcp-agent-architecture/) | Stable knowledge in a skill, live calls in a tool, and a standalone test | [014_skills-vs-mcp.md](analyzed-links/014_skills-vs-mcp.md) |
| 015 | [Agentic context folders](https://www.mindstudio.ai/blog/agentic-context-management-folder-structure-markdown) | Always, this-task, and on-demand tiers, with one client per run | [015_agentic-context-management-folders.md](analyzed-links/015_agentic-context-management-folders.md) |
| 016 | [Managing context for AI agents](https://tabulareditor.com/blog/managing-context-for-ai-agents) | Skill descriptions are always loaded; bodies and references are not | [016_managing-context-for-ai-agents.md](analyzed-links/016_managing-context-for-ai-agents.md) |
| 017 | [Anthropic context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | Smallest high-signal token set, just-in-time files, and notes that survive the window | [017_anthropic-context-engineering.md](analyzed-links/017_anthropic-context-engineering.md) |
| 018 | [Karpathy LLM wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) | Immutable sources, a compiled wiki, and an index read before any page | [018_karpathy-llm-wiki.md](analyzed-links/018_karpathy-llm-wiki.md) |
| 019 | [AGENTS.md and skills](https://agentpatterns.ai/standards/agents-md/) | Short always-on orientation; procedures live in on-demand skills | [019_agents-md-and-skills.md](analyzed-links/019_agents-md-and-skills.md) |
| 020 | [Claude Code memory](https://code.claude.com/docs/en/memory) | Line caps, path-scoped rules, and a short agent-written index | [020_claude-code-memory.md](analyzed-links/020_claude-code-memory.md) |
| 021 | [MADR decision records](https://adr.github.io/madr/) | One file per decision, with status and supersession | [021_madr-decision-records.md](analyzed-links/021_madr-decision-records.md) |
| 022 | [Diátaxis docs layout](https://docs.docmd.io/07/guides/scaling-architecture/scalable-folder-structure/) | Four page types, so a task loads one kind of doc | [022_diataxis-docs-layout.md](analyzed-links/022_diataxis-docs-layout.md) |
| 023 | [Frontmatter as the load decision](https://understandingdata.com/posts/frontmatter-as-document-schema/) | A trigger in frontmatter, then the body only if it matches | [023_frontmatter-load-decision.md](analyzed-links/023_frontmatter-load-decision.md) |
| 024 | [Doc lifecycle and archive](https://github.com/ArtRichards/docs-cli/blob/main/docs/convention.md) | Status filters the read set; superseded pages point at the replacement | [024_doc-lifecycle-and-archive.md](analyzed-links/024_doc-lifecycle-and-archive.md) |
| 025 | [Wikilinks vs portable Markdown](https://obsidian.md/help/links) | Standard links travel; app-specific link syntax does not | [025_wikilinks-vs-portable-markdown.md](analyzed-links/025_wikilinks-vs-portable-markdown.md) |
| 026 | [Enforceable Markdown style](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md) | Lint the outline; do not maintain a second table of contents | [026_enforceable-markdown-style.md](analyzed-links/026_enforceable-markdown-style.md) |
| 027 | [Agent skills and Cursor rules](https://agentskills.io/specification) | `SKILL.md` format, slash-command invocation, and short scoped rules | [027_agent-skills-and-cursor-rules.md](analyzed-links/027_agent-skills-and-cursor-rules.md) |

Links logged for that note: [Agent Skills home](https://agentskills.io/home), [specification](https://agentskills.io/specification), [skill best practices](https://agentskills.io/skill-creation/best-practices), [docs index](https://agentskills.io/llms.txt), [Customize Cursor](https://cursor.com/docs/customize-cursor), [Cursor skills](https://cursor.com/docs/skills), [Cursor rules](https://cursor.com/docs/rules), [skills.sh](https://www.skills.sh/docs), [skills.sh CLI](https://www.skills.sh/docs/cli), [Managed Agents skills](https://platform.claude.com/docs/en/managed-agents/skills), [Managed Agents overview](https://platform.claude.com/docs/en/managed-agents/overview), [Claude use-case guides](https://platform.claude.com/docs/en/about-claude/use-case-guides/overview).

## Search sweep

The phrase searches are logged in [searches/README.md](searches/README.md). Each hit is either one of the notes above, an earlier note, or a one-line finding in that log. The search tool returned about five to ten highlighted results per query, not a full page of twenty. Wider follow-up queries were used where the first set was thin.

## Note format

Notes live in [`analyzed-links/`](analyzed-links/) and are named `NNN_short-name.md`, starting at `000`.

Each note records only what is useful for the skill:

- Source title, URL, and date read
- What the source recommends for memory, context, and documentation in markdown
- **Do** — practices that keep the right context available and cheap to read
- **Don't** — practices that waste tokens, bury decisions, or rot context
- Practices worth carrying into the public skill, separate from anything that only applies to one agent or product

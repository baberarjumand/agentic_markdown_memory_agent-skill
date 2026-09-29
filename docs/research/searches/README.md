# Search sweep

Targeted searches run on 2026-09-29. The search tool returns a handful of highlighted results per query, not a full page of twenty. Each phrase was searched, and several were searched again with a wider wording. Every URL below was looked at. A full note exists when the page added a practice. "Already" means the URL is an earlier numbered note. "Logged" means the useful idea is in this file and did not earn its own note.

## Core standards

### markdown best practices documentation standards

| Result | Disposition |
|---|---|
| [CommonMark spec](https://spec.commonmark.org/) | Logged. The spec is the syntax contract. Pick it, or GFM when you need tables and task lists. Do not invent a private dialect. Already the flavor rule in 005 and 010. |
| [Markdown Toolbox](https://www.markdowntoolbox.com/blog/markdown-best-practices-for-documentation/) | Logged. At most three heading levels, one flavor, `markdownlint`, docs beside code. Same as 005 and 007. |
| [style-guides/markdown](https://github.com/style-guides/markdown) | [026](../analyzed-links/026_enforceable-markdown-style.md) |
| [Google Markdown style guide](https://google.github.io/styleguide/docguide/style.html) | Already [006](../analyzed-links/006_google-markdown-style-guide.md) |
| [SUSE AsciiDoc structure](https://documentation.suse.com/style/current/html/style-guide-adoc/sec-structure.html) | Logged. Not Markdown. Admonitions (warning states the harm, then how to avoid it) are a useful callout shape if you stay in Markdown blockquotes. Do not adopt AsciiDoc. |
| [MD Viewer best practices](https://mdview.co/guides/markdown-best-practices/) | Logged. One H1, no skipped levels, 1–3 sentence intro, lazy `1.` numbering, one blank line, no trailing space. Restates 006, 009, and 011. |
| [ToMarkdown best practices](https://www.tomarkdown.org/guides/markdown-best-practice) | Logged. One H1, important sections first, hyphens for lists, lint in CI. No new rule. |
| [Docsio cheat sheet](https://docsio.co/blog/markdown-cheat-sheet) | Logged. Syntax reference. GFM is the de facto extension set. Not a practice note. |
| [Ocular-d headings](https://ocular-d.github.io/styleguide-markdown/headings.html) | [026](../analyzed-links/026_enforceable-markdown-style.md) |
| [Markdown lists guide](https://macmdviewer.com/blog/markdown-lists-guide) | Logged. Four-space indent is the portable nest. Two spaces break on some renderers. One marker per file. |

### semantic markdown conventions

| Result | Disposition |
|---|---|
| [semantic-md](https://semanticmd.org/) | Logged. A schema that maps headings and tables onto JSON. Useful for extraction pipelines. Too much machinery for a file an agent reads as prose. Prefer YAML fields. |
| [semantic-markdown (annotations)](https://github.com/luismichio/semantic-markdown) | Logged. Reference-style links as a footer database, with prefixes `ref-`, `cite-`, `ai-`. Clever and invisible to a normal reader. Do not depend on it. Provenance belongs in frontmatter or a source record. |
| [Linked Markdown](https://github.com/wazootech/linked-markdown) | Logged. JSON-LD in frontmatter. The body stays prose. Same idea as OKF plus a shared vocabulary. Not required. |
| [Sparna draft](https://hackmd.io/@sparna/semantic-markdown-draft) | Logged. Curly-brace RDF hints. Agents and linters will not share this. Skip. |
| [Sparna blog](https://blog.sparna.fr/2020/02/20/semantic-markdown/) | Logged. Same annotation idea, 2020. Skip for the skill. |
| [vault-ld](https://github.com/The-Knowledge-Graph-Guys/vault-ld) | Logged. Frontmatter can be linked data if one context file defines the names. The body stays human. A shared key list is the part worth keeping. See 023. |
| [Yurtle](https://github.com/hankh95/yurtle) | Logged. Frontmatter for metadata, `[[links]]` in prose, fenced blocks for structured rows. The fence idea duplicates tables. Wikilink portability is 025. |
| [markdown-ld-kb](https://github.com/managedcode/markdown-ld-kb/tree/v0.1.7) | Logged. Maps `title`, `description`, `tags`, dates onto schema.org. Confirms a small shared field set. See 023. |

### markdown style guide

| Result | Disposition |
|---|---|
| [MD Viewer](https://mdview.co/guides/markdown-best-practices/) | Logged above. |
| [guidest.com documentation guide](https://guidest.com/markdown/documentation/) | Logged. Frontmatter for title, order, tags. Do not go past H4. Do not mix ATX and setext. Lint in CI. Bold is for a term being introduced, not a paragraph. |
| [GitLab Handbook Markdown](https://handbook.gitlab.com/docs/markdown-guide/) | Logged. The page title is the H1, so the body starts at H2 and does not skip. Headings stay short. One house style. |
| [Gruntwork](https://docs.gruntwork.io/guides/style/markdown-style-guide/) | [026](../analyzed-links/026_enforceable-markdown-style.md). Adapted from Google. Omits a hand-written TOC when the host generates one. |
| [mdkit technical writing](https://mdkit.io/blog/markdown-for-technical-writing) | Logged. Page job first (tutorial, how-to, reference, explanation), then a skeleton. Second person, present tense, active voice. Prerequisites and troubleshooting are the sections people skip and the ones that save a wrong attempt. Runnable examples. Feeds 022. |
| [markdownlint rules](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md) | [026](../analyzed-links/026_enforceable-markdown-style.md) |
| [PyMarkdown user guide](https://pymarkdown.readthedocs.io/en/stable/user-guide/) | Logged. Same rule IDs. A `---` under a sentence can become a setext heading. |

## Knowledge systems

### markdown knowledge management system

| Result | Disposition |
|---|---|
| [OpenKnowledge on the LLM wiki](https://openknowledge.ai/docs/workflows/karpathy-llm-wiki) | Logged. Product wrapper. Useful delta: split provisional notes from canonical articles, and promote on purpose. A static index can be skipped only if every listing already returns folder rules and one-line metadata. Otherwise keep the index. Primary pattern is 018. |
| [ar9av/obsidian-wiki](https://github.com/ar9av/obsidian-wiki) | Logged. Skills are markdown any agent can read. Ingest merges into an existing page, flags contradictions, does not duplicate. Query returns citations. |
| [Medenor/obsidian-wiki](https://github.com/Medenor/obsidian-wiki) | Logged. Same pattern. A project sync should distill decisions, not copy the tree. The next run processes the git delta, not the whole repo. |
| [KnoArbor](https://github.com/pxcg/knoarbor/blob/main/README.md) | Logged. Raw evidence stays immutable. Wiki pages are projections. Answers cite the raw unit. Indexes are rebuildable. |
| [OpenKB](https://github.com/VectifyAI/OpenKB) | Logged. Compile long docs into concept and entity pages. OKF-shaped. Vectorless tree for long files, full text for short ones. |
| [Karpathy gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) | [018](../analyzed-links/018_karpathy-llm-wiki.md) |

### markdown personal knowledge management PKM

The first query failed. The Obsidian, Zettel, and wiki results below cover the same ground. No separate hit list.

### markdown wiki standards obsidian roam

| Result | Disposition |
|---|---|
| [Obsidian internal links](https://obsidian.md/help/links) | [025](../analyzed-links/025_wikilinks-vs-portable-markdown.md) |
| [Obsidian help source](https://github.com/obsidianmd/obsidian-help/blob/master/en/Linking%20notes%20and%20files/Internal%20links.md) | [025](../analyzed-links/025_wikilinks-vs-portable-markdown.md) |
| [MIF ADR-003](https://github.com/modeled-information-format/MIF/blob/main/adr/ADR-003-obsidian-compatibility.md) | [025](../analyzed-links/025_wikilinks-vs-portable-markdown.md). Wiki-links were specified, then reverted. Frontmatter and folders stayed. |
| [Roam2Obsidian](https://github.com/felipeportella/Roam2Obsidian) | Logged. Block refs and filename characters do not survive the move. Another reason not to standardize on them. |
| [Roam importer notes](https://deepwiki.com/obsidianmd/obsidian-importer/3.8-roam-research) | Logged. Conversion table only. Not a practice. |

### structured markdown for context retrieval

| Result | Disposition |
|---|---|
| [Reddit: structure the knowledge base](https://www.reddit.com/r/AI_Agents/comments/1t2j7bx/my_agent_struggles_answering_structured_questions/) | Logged. Frontmatter makes a file a row. Project the fields you need. Do not dump the body for a status question. Same tool family as 004. |
| [Frontmatter as document schema](https://understandingdata.com/posts/frontmatter-as-document-schema/) | [023](../analyzed-links/023_frontmatter-load-decision.md) |
| [geronimo-iia/llm-wiki overview](https://github.com/geronimo-iia/llm-wiki/blob/main/docs/overview.md) | Logged. `read_when` is a retrieval condition. `summary` and `description` can alias. Search hits the index. Only the read tool opens the file. |
| [code-docs frontmatter schema](https://github.com/armstrongl/code-docs/blob/main/docs/frontmatter-schema.md) | [023](../analyzed-links/023_frontmatter-load-decision.md). `description` is a trigger. `paths` plus git marks staleness. |
| [Frontmatter-first for local models](https://medium.com/@michael.hannecke/frontmatter-first-is-not-optional-context-window-survival-for-local-llms-in-opencode-15809b207977) | Logged. Read lines 1–10 or a manifest. Keep frontmatter under about ten lines. Do not open every file. |

## Agents

### markdown for AI agents context management

| Result | Disposition |
|---|---|
| [Red Hat: AGENTS.md and skills](https://developers.redhat.com/articles/2026/07/27/standardize-project-context-agentsmd-and-agent-skills) | [019](../analyzed-links/019_agents-md-and-skills.md) |
| [AGENTS.md patterns](https://blakecrosley.com/blog/agents-md-patterns) | [019](../analyzed-links/019_agents-md-and-skills.md) |
| [AGENTS.md standard](https://agentpatterns.ai/standards/agents-md/) | [019](../analyzed-links/019_agents-md-and-skills.md) |
| [SKILL.md vs CLAUDE.md vs AGENTS.md](https://www.termdock.com/blog/skill-md-vs-claude-md-vs-agents-md) | [019](../analyzed-links/019_agents-md-and-skills.md) |
| [Microsoft agent skills](https://github.com/MicrosoftDocs/semantic-kernel-docs/blob/main/agent-framework/agents/skills.md) | [019](../analyzed-links/019_agents-md-and-skills.md) |

### agentic markdown workflow

| Result | Disposition |
|---|---|
| [progressive-disclosure plugin](https://github.com/pwarnock/progressive-disclosure) | Logged. When `AGENTS.md` passes about 200 lines (100 for a user file), split into always, conditional, and on demand. New learnings go to the right tier instead of the top file. |
| [Skills as progressive disclosure](https://www.newsletter.swirlai.com/p/agent-skills-progressive-disclosure) | Logged. Same ladder as 016 and 019. Unload or cache a skill after use. Do not leave it in the window by accident. |
| [Designing workflow skills](https://github.com/AntifragileTech/antifragile-claude-code/blob/master/assets/skills/thinking/designing-workflow-skills/SKILL.md) | Logged. `SKILL.md` under 500 lines. References one level deep, no chains. Safety gates for destructive steps. |
| [Microsoft Learn: Agent Skills](https://learn.microsoft.com/en-us/agent-framework/agents/skills) | Same ladder as 019. Advertise, load, read, run. |
| [MCP progressive disclosure sample](https://github.com/microsoft/agent-framework/blob/b3f2e539/python/samples/02-agents/mcp/mcp_progressive_disclosure.py) | Logged. Tool schemas can load and unload too. Keep one cheap tool visible. Do not invent a tool that was not listed. |

### how to structure markdown for LLM context

| Result | Disposition |
|---|---|
| [XML, Markdown, delimiters](https://ai-tldr.dev/learn/prompt-engineering/prompting-basics/structure-prompts-xml-markdown/) | Logged. Markdown headings for the stable sections. Fences or tags around untrusted or variable text, which has a start and an end. Put instructions before and after a long paste. |
| [Markdown vs JSON vs text](https://bulkmd.app/blog/markdown-vs-json-vs-text-llm-context) | Logged. Markdown for prose, JSON for fields and tool I/O, plain text only when there is no structure. Do not paste HTML. |
| [Formatting strategies](https://www.searchcans.com/blog/markdown-formatting-strategies-llm-understanding/) | Logged. Do not skip heading levels. Blank line around headings and before lists. The claimed error-rate numbers are not used. |
| [Token optimization guide](https://github.com/verivus-oss/llm-cli-gateway/blob/6db23152b11893f28330966c9ee3623329997837/TOKEN_OPTIMIZATION_GUIDE.md) | Logged. One-sentence overview, then terse sections. Chunk on headers, not mid-paragraph. A section should make sense alone. |
| [Structured context formats](https://agenticskillset.org/en/topics/structured-context-formats/) | Logged. Markdown earns its tokens when there is hierarchy or code. Bold on every rule does not. Flat facts can be plainer. |

### markdown memory systems for AI

| Result | Disposition |
|---|---|
| [Arantic memory notes](https://docs.arantic.com/claude-code/memory) | Same system as 020. Under 200 lines. HTML comments stripped. |
| [Five memory layers](https://pub.towardsai.net/claude-code-memory-why-you-keep-explaining-the-same-thing-to-claude-and-the-five-layers-that-fix-2bffcf182186) | Logged. `paths` frontmatter. Promote stable personal facts to `CLAUDE.local.md`, team facts to the project file. |
| [Claude Code memory](https://code.claude.com/docs/en/memory) | [020](../analyzed-links/020_claude-code-memory.md) |
| [How Claude remembers your project](https://code.claude.com/docs/en/claude-md) | [020](../analyzed-links/020_claude-code-memory.md) |
| [Memory system overview](https://developertoolkit.ai/en/claude-code/advanced-techniques/memory-system/) | Logged. Six locations, nearer wins. Restates 020. |

## Project docs

### markdown project documentation best practices

Covered by the first standards search and by 005, 006, 008, and 022. No additional URLs beyond those.

### markdown for team context management

Covered by 015, 016, 019, and 020. The scope rule is the same: the widest file is the shortest, and the nearer file wins.

### markdown architecture decision records ADR

| Result | Disposition |
|---|---|
| [MADR](https://adr.github.io/madr/) | [021](../analyzed-links/021_madr-decision-records.md) |
| [MADR 3 index](https://github.com/adr/madr/blob/release/v3/docs/index.md) | [021](../analyzed-links/021_madr-decision-records.md). `docs/decisions/NNNN-title.md`. |
| [MADR mirror](https://ruzickap.github.io/myteam-adr/madr/) | Same template. |
| [Issue choosing MADR](https://github.com/tkoyama010/pyvista-js/issues/546) | Logged. One team's choice of MADR over formless notes. Not a new template. |
| [ADR template](https://github.com/adr/madr/blob/97fb8edec60b8dc70b8166ef62de34c4e26b46c0/template/adr-template.md) | [021](../analyzed-links/021_madr-decision-records.md) |

### markdown documentation organization patterns

| Result | Disposition |
|---|---|
| [docmd folder structure](https://docs.docmd.io/07/guides/scaling-architecture/scalable-folder-structure/) | [022](../analyzed-links/022_diataxis-docs-layout.md) |
| [Adopt Diátaxis ADR](https://github.com/nwarila-platform/rancher-terraform-framework/blob/main/docs/decision-records/org/0002-adopt-diataxis-documentation-framework.md) | [022](../analyzed-links/022_diataxis-docs-layout.md) |
| [Diátaxis workflow](https://github.com/joaquimscosta/arkhe-claude-plugins/blob/main/plugins/doc/skills/diataxis/WORKFLOW.md) | Logged. Folders once there are many docs. A hub page before that. Split a file that mixes quadrants. |
| [GTB documentation layout](https://gtb.phpboyscout.uk/explanation/concepts/documentation-layout/) | [022](../analyzed-links/022_diataxis-docs-layout.md) |
| [create-context-graph roadmap](https://github.com/neo4j-labs/create-context-graph/blob/main/ROADMAP.md) | Logged. An example of a Diátaxis sidebar, not a new rule. |

## Technical depth

### markdown frontmatter YAML metadata standards

| Result | Disposition |
|---|---|
| [MDA frontmatter spec](https://github.com/sno-ai/mda/blob/main/spec/v1.0/02-frontmatter.md) | [023](../analyzed-links/023_frontmatter-load-decision.md). Description says what and when. |
| [Pandoc metadata blocks](https://pandoc.org/demo/example33/8.10-metadata-blocks.html) | Logged. No blank line after the opening `---`. Quote values that contain `:`. |
| [mdvs](https://lib.rs/crates/mdvs) | Logged. Infer a schema from the corpus and fail on drift. Useful once many files exist. Not day one. |
| [frontmatter-to-schema](https://github.com/tettuan/frontmatter-to-schema) | Logged. JSON Schema as the check. Same idea. |
| [RAC spec](https://asdecided.com/docs/vendor/spec/SPEC/) | Logged. One H1. Closed field set. Tags are the escape hatch. Extra keys are invalid until specified. |

### markdown semantic tagging conventions

Covered by the semantic-markdown search. The skill takeaway is a short controlled tag list used as a filter, not a pile of labels. See 001 and 023.

### markdown linking strategies wiki backlinks

Covered by the Obsidian search and by 004 and 025. Backlinks are derived. The edge that must survive is a markdown link in the file. Lint for orphans and broken targets, which is Karpathy's lint in 018.

### markdown versioning and archiving strategies

| Result | Disposition |
|---|---|
| [docs-cli convention](https://github.com/ArtRichards/docs-cli/blob/main/docs/convention.md) | [024](../analyzed-links/024_doc-lifecycle-and-archive.md) |
| [docs-cli on PyPI](https://pypi.org/project/docs-cli/) | Logged. Move updates links. Status and folder must match. |
| [ZettelFlow lifecycle](https://rafaelgb.github.io/Obsidian-ZettelFlow/architecture/knowledge-lifecycle/) | Logged. State in frontmatter, ASCII tokens, promote on purpose, archive is a state. Emoji is display only. |
| [project-docs skill](https://claudeskills.info/skills/asyrafhussin/agent-skills/project-docs/) | [024](../analyzed-links/024_doc-lifecycle-and-archive.md). Keep, update, archive, delete, or move. |
| [librarian](https://github.com/ghengis5-git/librarian) | Logged. A registry for large trees: naming, review dates, hashes. More process than a small repo needs. The idea is a review date on pages that go stale. |

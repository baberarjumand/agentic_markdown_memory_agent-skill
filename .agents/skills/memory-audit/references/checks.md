# Audit checks

Frontmatter parsing supports simple `key: value` lines only (no nested YAML).

| Id | Severity | Detects | Recommended fix |
| --- | --- | --- | --- |
| `agents-size` | warn | `AGENTS.md` over 120 lines | Move detail into docs or skills; keep orientation small |
| `doc-size` | warn | Memory doc over 300 lines | Split by topic |
| `always-on-cost` | info | Approximate always-on tokens | Printed with `--report-tokens` only |
| `missing-frontmatter` | warn | Required schema file lacks frontmatter | Opt-in add frontmatter |
| `missing-key` | warn | Required key missing | Add the key |
| `invalid-status` | warn | Status not in allowed set | Correct status |
| `stale` | warn | Active/`last_verified` older than threshold | Re-verify or archive |
| `broken-link` | error | Relative markdown link target missing | Fix or remove link |
| `orphan` | warn | Memory file not in any index | Add index line or archive |
| `index-drift` | warn | Index status/description ≠ frontmatter | Run `--write-index` or edit |
| `index-missing-entry` | warn | File with no index line | Add line or regenerate |
| `index-dangling-entry` | warn | Index line whose file is gone | Remove line |
| `index-block-stale` | warn | Generated index ≠ `--write-index` | Run `--write-index` |
| `decision-number-duplicate` | error | Two decisions share a number | Renumber one (never reuse) |
| `superseded-target-missing` | error | `superseded_by` missing | Fix path |
| `active-links-to-superseded` | warn | Active page links superseded/archived as current | Point at replacement |
| `knowledge-no-citation` | warn | Knowledge page with no citation | Add source or path:line |
| `citation-missing-target` | warn | Citation to missing `sources/` file | Add source or fix link |
| `duplicate-title` | warn | Duplicate titles among active files | Human review |
| `duplicate-description` | warn | Duplicate descriptions among active files | Human review |
| `scratchpad-stale` | warn | Non-empty scratchpad mtime > 7 days | Clear or promote |
| `handoff-stale` | warn | HANDOFF.md older than 14 days | Fold or delete |
| `task-stale` | warn | `in-progress` task `updated` > 30 days | Update status |
| `local-file-tracked` | warn | Local scratch/handoff/claude.local tracked | Gitignore |
| `external-unconfirmed` | warn | `origin: external` without confirmation note | Confirm with user or remove |
| `injection-phrase` | error | Heuristic injection phrases | Remove; treat as hostile |
| `secret-pattern` | error | Common key/token patterns | Remove; never print the value |
| `toc-stale` | warn | TOC differs from headings | Run `--write-toc` |
| `toc-missing` | warn | Eligible file lacks TOC | Run `--write-toc` |
| `toc-unneeded` | warn | TOC in ineligible file | Remove via `--write-toc` |

TOC uses ATX headings (`#`) only. Headings inside fenced code blocks are ignored. Anchors follow GitHub slug rules.

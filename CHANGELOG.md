# Changelog

## 1.1.0 Improvements Spec v2

Implemented from `docs/IMPROVEMENTS_v2.md` (one commit per task).

### Added

- `package.json` with version `1.1.0` and scripts for validators (`npm test`)
- `metadata.version: "1.1.0"` on each skill `SKILL.md`
- MIT `LICENSE` and `SECURITY.md`
- `references/practices.md` with canonical blocks (`reflection`, `plan-pointer`, `load-rule`, `write-rules`) and trust rules
- Frontmatter schema and generated index line format in `layout.md`
- Companion skill `memory-audit` with `scripts/audit.mjs` and check library
- Companion skill `memory-reflect`
- `scripts/sync-references.mjs` and `scripts/preflight.mjs`
- `references/migration-safety.md`, `references/tool-notes.md`
- Scoped generated TOC via `--write-toc`
- `tests/` fixtures, expected audit JSON, validators, eval checklist
- `.github/workflows/validate.yml`

### Changed

- Init flow: three questions → two gates (scan/plan, apply) plus dry-run
- `cursor-rule.md` fenced template; plan-gate strictly opt-in
- README: features, usage, how-it-works, security, FAQ; hand-written TOC replaced by generated block (owner choice)

### Deviations from the spec

- Audit scopes memory under Diátaxis `docs/` paths only (skips `docs/research/` and top-level docs like `IMPROVEMENTS_v2.md`) so research notes are not treated as project memory
- `always-on-cost` is emitted as an `info` finding whenever `AGENTS.md` exists (in addition to `--report-tokens` table)
- TOC lib landed with Task 4 and was completed/documented in Task 6 as planned

### Owner decisions applied

- README hand-written TOC replaced with generated TOC (option 1)
- Defaults from IMPROVEMENTS §0 kept (`memory/` committed by default; knowledge labels `[verified]` / `[inferred]` / `[unverified]`)

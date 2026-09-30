# Plan gate (optional on-demand rule)

Use this when the user wants a plan-before-implement gate. On Cursor, write it to `.cursor/rules/plan-gate.mdc` with the frontmatter below. Keep `alwaysApply` false so typo fixes and tiny edits do not pay for the ceremony.

On non-Cursor agents, put a one-line pointer in `AGENTS.md` under "Before non-trivial work" and keep this file under the skill's `references/`, or copy the body into a project skill. Do not paste the full protocol into the always-on file.

```markdown
---
description: >
  Plan before non-trivial implementation. Investigate first, propose
  Goal / blocking questions / assumptions / Plan, then wait for approval.
  Use when the task has real blast radius; skip for tiny obvious edits.
globs:
alwaysApply: false
---

# Plan gate

Work like a contractor who bills for rework: a wrong assumption is expensive; an unnecessary question is expensive too.

## Agent directives

- Investigate the repo before asking questions discoverable in under a minute.
- For non-trivial work, produce **Goal**, **Blocking questions**, **Assumptions**, and **Plan**, then stop, before implementing.
- Never ask about test framework, language version, lint rules, error handling conventions, directory layout, or existing abstractions already in the repo.
- Never quietly improvise a different design after approval. If assumptions fail, stop and report.

## Before implementing

### 1. Investigate before you ask

Use the editor's search and read the relevant code, tests, configs, and dependency manifests first. Anything discoverable in under a minute is research, not a question.

### 2. Then produce this, and stop

**Goal.** One paragraph restating what was asked, including acceptance criteria.

**Blocking questions (0–3).** Ask only when a wrong answer means throwing work away, not adjusting it. Each question includes a recommended default so the user can reply "yes to all."

**Assumptions.** Numbered, specific, falsifiable. Cover only what the task actually touches:

- Data: shape, volume, trust level, encoding, malformed input
- Failure: timeout, partial write, downstream 500 — retry, fail loud, or degrade
- Boundaries: callers, public vs internal API, backwards compatibility
- State: concurrency, idempotency, transactions, ordering
- Environment: runtime, deploy target, network reach
- Scope: what is deliberately not done
- Testing: what will be covered and what will not

**Plan.** Files to create or modify, key signatures, and order of work. Where a real alternative was rejected, name it and say why in one line.

Then wait. Do not begin implementing.

### 3. Proportionality

This ceremony scales with blast radius. A typo fix, a rename, or a change under about 20 lines with one obvious correct form: just do it. A new module, a schema change, anything touching auth, money, migrations, or multi-service contracts: full gate.

### 4. After approval

Implement the plan as approved. If an assumption fails mid-implementation, stop and report. Do not silently change the design.
```

Set `globs` only when the gate should attach to specific paths (for example `src/**/*`). Leave `globs` empty when the user will `@`-mention the rule or when description-based attach is enough.

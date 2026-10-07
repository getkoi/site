# koi site

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Individual developers and engineering teams are equally important audiences. They use coding agents for long, multi-session engineering projects and need to evaluate, adopt, and learn koi.

## Product Purpose

Help visitors understand koi, adopt its workflow, and complete a first useful project phase. The site combines product explanations, installation guidance, documentation, a blog, and reusable recipes.

Success means moving from understanding the approach to preparing a real repository and implementing, verifying, and committing a phase—not merely installing a tool.

## Positioning

koi keeps plans, phase order, progress, and verification in the repository so coding-agent sessions can resume without reconstructing the project from chat. The filesystem is durable memory; a context window is a disposable cache.

koi is the product umbrella and documented `.koi/` convention, not an executable or shared bootstrap layer. Junji is the free planning and execution method. Yokai optionally drives Junji-prepared work and verifies it on disk.

## Operating Context

Visitors bring an existing repository, coding agent, and project build/test tools. The workflow also supports greenfield projects. Adoption should fit the harness and project they already use.

Start with Junji: install the skill, prepare and refine an effort, then repeat `next` to implement, verify, and commit phases. Add Yokai when automated execution of prepared work is useful; it does not accept raw goals or replace planning.

Effort-specific work lives in `.koi/run/`. Consolidation removes that folder only after completion and human authorization; durable project settings and reusable verification assets remain outside it.

## Capabilities and Constraints

- Preserve the current koi, junji, yokai, and dotto names and their documented roles.
- Maintain landing pages, documentation, blog content, and sensor/sandbox recipes as complementary adoption resources.
- Junji can be used without Yokai, mandatory sensor scripts, or model-tier tags.
- Preserve verification requirements, dependency order, standing directives, and explicit human gates. Planning, configuration, and gate review do not authorize gated actions.
- Do not weaken failing checks to claim success.
- Keep public instructions consistent with the current factual documentation, particularly installation paths and the absence of a koi binary.

## Brand Commitments

English is the current site language. Preserve existing names, factual product language, and the repo-first, harness-independent adoption position. No replacement visual direction is established by this record.

## Evidence on Hand

- `src/content/docs/koi/`: shared convention, quickstart, project home, and workflow guidance.
- `src/content/docs/junji/` and `src/content/docs/yokai/`: method and driver documentation.
- `src/content/blog/harvest-engineering.mdx`: explanation of the engineering approach.
- `src/data/sensor-recipes/` and `src/data/sandbox-recipes/`: concrete reusable recipe assets.
- `src/data/koi-landing.ts`: illustrative migration walkthrough; example commits and outcomes are not customer proof.
- `src/assets/marks/` and `public/`: existing identity and static assets.

Do not invent testimonials, customers, benchmarks, deployment claims, or additional pricing/licensing claims.

## Product Principles

1. Make adoption lead to a first verified outcome.
2. Serve individuals and teams without assuming either audience is secondary.
3. Put durable project truth in the repository, not the conversation.
4. Keep the method useful on its own; automation is optional.
5. Treat verification and human authorization as boundaries, not marketing shortcuts.

## Open Decisions

No product-specific accessibility standard or additional audience needs have been confirmed. Future work must not present unconfirmed requirements or new product claims as established facts.

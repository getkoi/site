# 0002: Use native disclosures for optional documentation

Status: accepted

Keep the steps needed to complete a task visible. Put substantial workflows on their own pages. Use native `details` and `summary` for optional implementation detail and uncommon cases.

Disclosures use dotto surface, border, text and focus tokens. They work with a keyboard and without JavaScript. Their content remains in the document, search index and LLM feeds. When a link targets content inside a disclosure, the docs lifecycle opens its ancestors before scrolling.

Do not hide prerequisites, costs, destructive effects or limitations needed to choose a workflow. Do not replace the documentation with nested accordions. Native disclosures avoid an extra React island and retain browser semantics.

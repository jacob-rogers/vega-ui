---
to: src/components/<%= name %>/<%= h.changeCase.pascal(name) %>.css
---
.Vega<%= h.changeCase.pascal(name) %> {
  padding: var(--space-xs);

  color: var(--color-typo-primary);
  background-color: var(--color-bg-secondary);
}

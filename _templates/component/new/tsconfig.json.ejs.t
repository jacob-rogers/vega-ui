---
inject: true
to: tsconfig.json
before: "\"@gpn-prototypes\/vega-ui\"" 
---
      "@gpn-prototypes/vega-<%= name %>": ["packages/components/<%= name %>/src/index.ts"],
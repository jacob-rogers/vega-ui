---
to: packages/components/<%= name %>/README.md
sh: mkdir "packages/components/<%= name %>/docs/" && cp "_templates/component/new/packages/components/component/docs/pic-1.png" "packages/components/<%= name %>/docs/"
---
# @gpn-prototypes/vega-<%= name %>

Название компонента

<img src="docs/pic-1.png" height="50">

### Установка

```
yarn add @gpn-prototypes/vega-<%= name %>
```

### Примеры использования

```jsx
import { <%= h.changeCase.pascal(name) %> } from '@gpn-prototypes/vega-<%= name %>';

export const MyComponent = () => {
  const title = 'Title';

  return <<%= h.changeCase.pascal(name) %> title={title} />;
};
```

### API

```ts
type <%= h.changeCase.pascal(name) %>Props = {
  title?: string;
  className?: string;
};
```
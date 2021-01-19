---
to: src/components/<%= name %>/README.md
sh: mkdir "src/components/<%= name %>/docs/" && cp "_templates/component/new/src/components/component/docs/pic-1.png" "src/components/<%= name %>/docs/"
---
# <%= name %>

Название компонента

<img src="docs/pic-1.png" height="50">

### Примеры использования

```jsx
import { <%= h.changeCase.pascal(name) %> } from '@gpn-prototypes/vega-ui';

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

# @gpn-prototypes/vega-tree

Название компонента

<img src="docs/pic-1.png" height="50">

### Установка

```
yarn add @gpn-prototypes/vega-tree
```

### Примеры использования

```jsx
import { Tree } from '@gpn-prototypes/vega-tree';

export const MyComponent = () => {
  const title = 'Title';

  return <Tree title={title} />;
};
```

### API

```ts
type TreeProps = {
  title?: string;
  className?: string;
};
```
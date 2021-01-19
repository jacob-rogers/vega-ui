# @gpn-prototypes/vega-canvas

Название компонента

<img src="docs/pic-1.png" height="50">

### Примеры использования

```jsx
import { Canvas } from '@gpn-prototypes/vega-ui';

export const MyComponent = () => {
  const title = 'Title';

  return <Canvas title={title} />;
};
```

### API

```ts
type CanvasProps = {
  title?: string;
  className?: string;
};
```

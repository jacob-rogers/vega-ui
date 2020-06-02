# @gpn-prototypes/vega-scale-panel

Название компонента

<img src="docs/pic-1.png" height="50">

### Установка

```
yarn add @gpn-prototypes/vega-scale-panel
```

### Примеры использования

```jsx
import { ScalePanel } from '@gpn-prototypes/vega-scale-panel';

export const MyComponent = () => {
  const title = 'Title';

  return <ScalePanel title={title} />;
};
```

### API

```ts
type ScalePanelProps = {
  title?: string;
  className?: string;
};
```
# @gpn-prototypes/vega-drag-and-drop

Название компонента

<img src="docs/pic-1.png" height="50">

### Установка

```
yarn add @gpn-prototypes/vega-drag-and-drop
```

### Примеры использования

```jsx
import { DragAndDrop } from '@gpn-prototypes/vega-drag-and-drop';

export const MyComponent = () => {
  const title = 'Title';

  return <DragAndDrop title={title} />;
};
```

### API

```ts
type DragAndDropProps = {
  title?: string;
  className?: string;
};
```

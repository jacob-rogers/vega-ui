# @gpn-prototypes/vega-dropzone

Название компонента

<img src="docs/pic-1.png" height="50">

### Установка

```
yarn add @gpn-prototypes/vega-dropzone
```

### Примеры использования

```jsx
import { Dropzone } from '@gpn-prototypes/vega-dropzone';

export const MyComponent = () => {
  const title = 'Title';

  return <Dropzone title={title} />;
};
```

### API

```ts
type DropzoneProps = {
  title?: string;
  className?: string;
};
```

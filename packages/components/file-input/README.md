# @gpn-prototypes/vega-file-input

Название компонента

<img src="docs/pic-1.png" height="50">

### Установка

```
yarn add @gpn-prototypes/vega-file-input
```

### Примеры использования

```jsx
import { FileInput } from '@gpn-prototypes/vega-file-input';

export const MyComponent = () => {
  const title = 'Title';

  return <FileInput title={title} />;
};
```

### API

```ts
type FileInputProps = {
  title?: string;
  className?: string;
};
```

# @gpn-prototypes/vega-file-input

Компонент является оберткой над input типа file

<img src="docs/pic-1.png" height="50">

### Установка

```
yarn add @gpn-prototypes/vega-file-input
```

### Примеры использования

```jsx
import { FileInput } from '@gpn-prototypes/vega-file-input';

export const MyComponent = (props) => {
  <FileInput label="Инпут для загрузки" iconLeft={IconAttach} onChange={props.onChange} />;
};
```

### API

```ts
type FileInputProps = {
  id: string;
  className?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
```

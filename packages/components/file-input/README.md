# @gpn-prototypes/vega-file-input

Компонент является полем для ввода/загрузки файлов

<img src="docs/pic-1.png" height="50">

### Установка

```
yarn add @gpn-prototypes/vega-file-input
```

### Примеры использования

```jsx
import { FileInput } from '@gpn-prototypes/vega-file-input';
import { Button } from '@gpn-prototypes/vega-button';

export const MyComponent = props => {
  const buttonProps = {
    iconLeft: IconAttach,
    label: text('title', 'Title'),
  };
  return (
    <FileInput {...defaultKnobs()} accept="image/png" onChange={action('Файлы выбраны')}>
      {(props): React.ReactNode => <Button {...props} {...buttonProps} />}
    </FileInput>
  );
};
```

### API

Принимает на вход пропсы инпута и метод `children`, который должен возвращать компонент `Button`, либо обычный `children`.

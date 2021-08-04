# @gpn-prototypes/vega-file-input

Обёртка для компонента [BasicSelect](https://consta-uikit.vercel.app/?path=/story/components-filefield--playground) из Consta.

<img src="docs/pic-1.png" height="50">

### Примеры использования

```jsx
import { Button, FileInput } from '@gpn-prototypes/vega-ui;

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

### [API](https://consta-uikit.vercel.app/?path=/docs/components-filefield--playground)

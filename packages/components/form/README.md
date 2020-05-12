# @vega-ui/form

Компонент для построения форм

### Установка

```
yarn add @vega-ui/form
```

### Пример использования

```jsx
import { Form } from '@vega-ui/form';

export const MyComponent = () => {
  const handleSubmit = (e) => console.log(e);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row col="2">
        <Form.Field>
          <Form.Label htmlFor="example-1">First input</Form.Label>
          <input id="example-1" placeholder="First input" />
        </Form.Field>
        <Form.Field>
          <Form.Label htmlFor="example-2">Second input</Form.Label>
          <input id="example-2" placeholder="Second input" />
        </Form.Field>
      </Form.Row>
      <Form.Row space="none">
        <Form.Fieldset>
          <legend>Checkboxes</legend>
          <Form.Label>
            <input type="checkbox" />
            checkbox
          </Form.Label>
          <Form.Label>
            <input type="checkbox" />
            checkbox
          </Form.Label>
          <Form.Label>
            <input type="checkbox" />
            checkbox
          </Form.Label>
        </Form.Fieldset>
      </Form.Row>
      <button type="submit">Send</button>
    </Form>
  );
};
```

### API компонента

```ts
type FormProps = {
  className?: string;
  children?: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
};

type FormRowProps = {
  className?: string;
  col?: '1' | '2' | '3' | '4'; // количество колонок в строке
  as?: keyof JSX.IntrinsicElements;
  space?: 'm' | 'l' | 'xl' | 'none'; // отступ строки
  gap?: 'm' | 'l' | 'xl' | 'none'; // отступ между строками и колонками
  children?: React.ReactNode;
};

type FormLabelProps = {
  className?: string;
  space?: '2xs' | 'xs' | 's' | 'none'; // отступ лейбла
  size?: 's' | 'l'; // размер шрифта
  htmlFor?: string;
  children?: React.ReactNode;
};

type FormFieldsetProps = {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
};

type FormFieldProps = JSX.IntrinsicElements['div'];
```

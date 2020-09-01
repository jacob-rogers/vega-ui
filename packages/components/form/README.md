# @gpn-prototypes/vega-form

Компонент для построения форм

![Компонент формы](docs/form-example.jpg)

### Установка

    yarn add @gpn-prototypes/vega-form

### Пример использования

```jsx
import { Form } from '@gpn-prototypes/vega-form';

export const MyComponent = () => {
  const handleSubmit = e => console.log(e);

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
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
};

type FormRowProps = {
  col?: '1' | '2' | '3' | '4'; // количество колонок в строке, по умолчанию '1'
  space?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'none'; // отступ сверху, по умолчанию 'l'
  gap?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'none'; // отступ между строками и колонками, по умолчанию 'l'
  className?: string;
};

type FormLabelProps = {
  space?: '2xs' | 'xs' | 's' | 'none'; // отступ снизу, по умолчанию 's'
  size?: 's' | 'l'; // размер шрифта и высота строки, по умолчанию 's'
  htmlFor?: string;
  className?: string;
};

type FormFieldProps = {
  className?: string;
};

type FormFieldsetProps = {
  disabled?: boolean;
  className?: string;
};

type FormLegendProps = {
  space?: '2xs' | 'xs' | 's' | 'none'; // отступ снизу, по умолчанию 's'
  size?: 's' | 'l'; // размер шрифта и высота строки, по умолчанию 's'
  className?: string;
};
```

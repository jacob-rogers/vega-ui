# @gpn-prototypes/vega-page-footer

Компонент "Футер страницы"

<img src="docs/pic-1.png" height="80">

### Примеры использования

#### Футер с одной кнопкой

<img src="docs/pic-1.png" height="80">

```jsx
import { Button, PageFooter } from '@gpn-prototypes/vega-ui;

export const MyComponent = () => {
  return (
    <PageFooter className="footer">
      <Button size="m" view="primary" label="Кнопка" />
    </PageFooter>
  );
};
```

```css
.footer {
  display: flex;
  justify-content: flex-end;
}
```

#### Футер с двумя кнопками

<img src="docs/pic-2.png" height="80">

```jsx
import { Button, PageFooter } from '@gpn-prototypes/vega-ui';

export const MyComponent = () => {
  return (
    <PageFooter className="footer">
      <Button size="m" view="primary" label="Кнопка" />
      <Button size="m" view="primary" label="Кнопка" />
    </PageFooter>
  );
};
```

```css
.footer {
  display: flex;
  justify-content: space-between;
}
```

### API

```ts
type PageFooterProps = {
  className?: string;
};
```

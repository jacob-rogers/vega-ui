# @gpn-prototypes/vega-page-footer

Компонент "Футер страницы"

<img src="docs/pic-1.png" height="80">

### Установка

    yarn add @gpn-prototypes/vega-page-footer

### Примеры использования

#### Футер с одной кнопкой

<img src="docs/pic-1.png" height="80">

```jsx
import { PageFooter } from '@gpn-prototypes/vega-page-footer';
import { Button } from '@gpn-prototypes/vega-button';

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
import { PageFooter } from '@gpn-prototypes/vega-page-footer';
import { Button } from '@gpn-prototypes/vega-button';

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

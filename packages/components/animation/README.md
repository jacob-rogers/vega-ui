# @gpn-prototypes/vega-animation

Компонент-обертка вокруг `CSSTransition` с набором предустановленных анимаций

### Установка

    yarn add @gpn-prototypes/vega-animation

## Набор анимаций

Appearance — анимация появления элемента с одной из четырех сторон

### Пример использования

```jsx
import { Animation } from '@gpn-prototypes/vega-animation';

export const MyComponent = () => {
  const isShown = true;

  return (
    <Animation.Appearance in={isShown} side="bottom">
      <div>{/* ... */}</div>
    </Animation.Appearance>
  );
};
```

### API

```ts
type AppearanceProps = {
  side: 'left' | 'right' | 'top' | 'bottom';
} & Partial<React.ComponentProps<typeof CSSTransition>>;
```

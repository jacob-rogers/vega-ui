# @gpn-prototypes/vega-tooltip

Компонент-обертка для [компонента Tooltip из дизайн-системы ГПН](https://ui-kit.gpn.vercel.app/?path=/story/components-tooltip--tooltip-positioned-by-coords-story)

<img src="docs/pic-1.png" height="50">

### Установка

    yarn add @gpn-prototypes/vega-tooltip

### Примеры использования

#### Позиционирование по якорю

```jsx
import { Tooltip } from '@gpn-prototypes/vega-tooltip';

export const MyComponent = () => {
  const buttonRef = useRef();
  return (
    <Button label="Открыть тултип" type="button" ref={buttonRef} />
    <Tooltip size="s" anchorRef={buttonRef}>
      Контент тултипа
    </Popover>
  )
};
```

#### Позиционирование по координате

```jsx
import { Tooltip } from '@gpn-prototypes/vega-tooltip';

export const MyComponent = () => (
  <Tooltip size="s" position={{ x: 100, y: 200 }}>
    Контент тултипа
  </Popover>
);
```

### [API](https://ui-kit.gpn.vercel.app/?path=/docs/components-tooltip--tooltip-positioned-by-anchor-story)

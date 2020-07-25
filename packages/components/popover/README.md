# @gpn-prototypes/vega-popover

Компонент-обертка для [компонента Popover из дизайн-системы ГПН](https://ui-kit.gpn.vercel.app/?path=/story/ui-kit-popover--popover-positioned-by-anchor-story)

### Установка
```
    yarn add @gpn-prototypes/vega-popover
```

### Примеры использования

```jsx
import { Popover } from '@gpn-prototypes/vega-popover';

export const MyComponent = () => {

  return (
    <>
      <Button label="Открыть" type="button" ref={buttonRef} />
      <Popover anchorRef={buttonRef}>
        Контент
      </Popover>
    </>
  );
};
```

### [API](https://ui-kit.gpn.vercel.app/?path=/docs/ui-kit-popover--popover-positioned-by-anchor-story#%D1%81%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D1%81%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2)


# @gpn-prototypes/vega-basic-select

# BasicSelect

Обёртка для компонента [BasicSelect](https://consta-uikit.vercel.app/?path=/docs/components-basicselect--default-story) из Consta.

<img src="docs/pic-1.png" height="50">

### Установка

    yarn add @gpn-prototypes/vega-basic-select

### Примеры использования

```jsx
import { BasicSelect } from '@gpn-prototypes/vega-basic-select';

export const MyComponent = () => {
  type Option = {
    label: string;
    value: string;
  };

  const items = [
    { label: 'Москва', value: 'moscow' },
    { label: 'Санкт-Петербург', value: 'spb' },
    { label: 'Томск', value: 'tomsk' },
  ];

  const getItemLabel = (option: Option): string => option.label;

  return (
    <div>
      <BasicSelect
        id="city"
        placeholder="Выберите город"
        options={items}
        getOptionLabel={getItemLabel}
      />
    </div>
  );
};
```

### [API](https://consta-uikit.vercel.app/?path=/docs/components-basicselect--default-story#c%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0)

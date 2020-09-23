# @gpn-prototypes/vega-theme

Компонент-обертка для [компонента Theme из дизайн-системы ГПН](https://consta-uikit.vercel.app/?path=/docsx/ui-kit-theme--documentation)

### Установка

    yarn add @gpn-prototypes/vega-theme

### Примеры использования

```jsx
import { Theme, presetGpnDark } from '@gpn-prototypes/vega-theme';

export const MyComponent = () => {
  return <Theme preset={presetGpnDark} />;
};
```

### API

```ts
type ThemeProps = {
  preset: presetGpnDark | presetGpnDefault | presetGpnDisplay;
  className?: string;
};
```

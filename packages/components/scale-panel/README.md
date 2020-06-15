# @gpn-prototypes/vega-scale-panel

Компонент позволяет управлять масштабированием содержимого рабочего пространства

![Панель управления масштабом](docs/scale-panel.png)

### Установка

    yarn add @gpn-prototypes/vega-scale-panel

### Примеры использования

```jsx
import { ScalePanel } from '@gpn-prototypes/vega-scale-panel';

export const MyComponent = () => {
  const [currentScale, setCurrentScale] = React.useState(100);

  return <ScalePanel currentScale={currentScale} onChange={setCurrentScale} columnPanel />;
};
```

### API компонента

```ts
type ScalePanelProps = {
  currentScale: number; // текущее значение масштаба
  columnPanel: boolean; // переключение режима типа панели(вертикальный/горизонтальный)
  onChange(scale: number): void; // обработчик изменения масштаба
};
```

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
  const [stepScale, setStepScale] = React.useState(10);

  return (
    <ScalePanel
      currentScale={currentScale}
      stepScale={stepScale}
      onChange={setCurrentScale}
      onChangeStep={setStepScale}
      orientation="horizontal"
    />
  );
};
```

### API компонента

```ts
type ScalePanelProps = {
  currentScale: number; // текущее значение масштаба
  stepScale: number; // текущее значение шага масштабирования
  orientation: 'vertical' | 'horizontal'; // переключение режима типа панели(вертикальный/горизонтальный)
  onChange(scale: number): void; // обработчик изменения масштаба
  onChangeStep(step: number): void; // обработчик изменения шага масштабирования
};
```

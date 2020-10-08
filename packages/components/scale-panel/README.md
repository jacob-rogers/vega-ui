# @gpn-prototypes/vega-scale-panel

Панель управления масштабом

<img src="docs/pic-1.png" width="200">

### Установка

    yarn add @gpn-prototypes/vega-scale-panel

### Пример использования

```jsx
import { ScalePanel } from '@gpn-prototypes/vega-scale-panel';

export const MyComponent = () => {
  const [scale, setScale] = useState(100);

  const handleChange = (newScale) => {
    setScale(newScale);
  };

  const handleAlign = () => {
    //
  };

  return (
    <ScalePanel
      step={10}
      scale={scale}
      minScale={20}
      maxScale={150}
      onChange={handleChange}
      onAlign={handleAlign}
    />
  );
};
```

### API компонента

```ts
type ScalePanelProps = {
  step: number; // размер шага масштабирования, используется при нажатии на кнопки "-" и "+"
  scale: number; // текущее значение масштаба
  minScale: number; // минимальное значение масштаба
  maxScale: number; // максимальное значение масштаба
  onChange(scale: number): void; // обработчик изменения значения масштаба
  onAlign(): void; // обработчик нажатия на кнопку "выровнить содержимое"
};
```

# @gpn-prototypes/vega-split-panes

SplitPanes

Компонент позволяет создавать лэйаут с возможностью ручного изменения размера каждой секции.

### Примеры использования

```jsx
import { SplitPanes } from '@gpn-prototypes/vega-ui';

export const MyComponent = () => {
  return (
    <SplitPanes>
      <SplitPanes.Pane>1</SplitPanes.Pane>
      <SplitPanes.Pane>2</SplitPanes.Pane>
    </SplitPanes>
  );
};
```

### API

#### SplitPanes

Компонент контейнера для окон. Может быть вложенным в окно.

```ts
interface SplitPanesProps extends React.HTMLAttributes<HTMLDivElement> {
  split?: 'horizontal' | 'vertical'; // default: vertical
  resizerSize?: number; // default: 2
  onResize?: VoidFunction; // default: undefined
  onResizeStart?: VoidFunction; // default: undefined
  onResizeEnd?: VoidFunction; // default: undefined
  allowResize?: boolean; // default: true
};
```

#### SplitPanes.Pane

Компонент окна лэйаута. Параметры `initialSize`, `min` и `max` принимают значения в пикселях, процентах или пропорциях.

```ts
/* 
  Units:
  - px (10px)
  - % (50%)
  - ratio (0.5) как flex-grow
*/
interface Props extends React.HTMLAttributes<HTMLDivElement> = {
  initialSize?: string;
  min?: string;
  max?: string;
};
```

`initialSize` - размер окна при первой отрисовке. **По умолчанию: `"1"`**.

`min` - минимальный размер окна. _Ограничение может быть не соблюдено в случае превышения минимального свободного места в контейнере._ **По умолчанию: `"0"`.**

`max` - максимальный размер окна. **По умолчанию: `"100%"`.**

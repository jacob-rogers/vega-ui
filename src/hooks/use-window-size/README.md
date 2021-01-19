# useWindowSize

Хук позволяет отслеживать изменение высоты и ширины окна.

### API

    Отдает объект с размерами элемента: { height, width }

### Пример использования

```tsx
import React, { useLayoutEffect } from 'react';
import { useWindowSize } from '@gpn-prototypes/vega-ui';

export const ResizableComponent: React.FC = () => {

  const { height, width } = useWindowSize();

  return (
    <div 
      style={{
          width,
          height
      }}>
          Resizable component
    </div>
  );
};
```

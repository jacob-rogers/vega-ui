# useResizeObserver

Хук позволяет отслеживать высоту и ширину компонента. Необходим, когда может происходить Resize элемента.

### API

    На вход принимает targetRef - ссылка на компонент, высоту и ширину которого нужно отслеживать
    Отдает объект с размерами элемента: { height, width } 

### Пример использования

```tsx
import React, { useLayoutEffect } from 'react';
import { useResizeObserver } from '@gpn-prototypes/vega-hooks';

export const ResizableComponent: React.FC = () => {
  const ref = useRef(null);

  const { height, width } = useResizeObserver(ref);

  return (
    <>
      <div 
        ref={ref} 
        style={{
            width,
            height
        }}>
            Resizable component
      </div>
    </>
  );
};
```

# useDraggableContainer

Хук поволяет создать адаптивный прокручивающийся блок.

### API

Хук возвращает объект с параметрами:

```ts
type TabsProps = {
  getRootProps: () => RootProps; // набор пропсов для статичного контейнера
  getWrapperProps: () => WrapperProps; // набор пропсов для прокручиваемого контейнера
  isLeftLimit: boolean; // флаг предела прокрутки влево
  isRightLimit: boolean; // флаг предела прокрутки вправо
  scroll(dir?: 'left' | 'right'): void; // метод для прокрутки на видимую область
};
```

### Пример использования

```tsx
import React from 'react';
import { useDraggableContainer } from '@gpn-prototypes/vega-hooks';

export const HookedComponent: React.FC<Props> = () => {
  const draggableTab = useDraggableContainer({
    // функция для поиска/получения активного элемента.
    findActiveElement(wrapper: HTMLElement) {
      return wrapper.querySelector('.active');
    },
  });

  return (
    <>
      {!draggableTab.isLeftLimit && (
        <button
          type="button"
          onClick={() => {
            draggableTab.scroll('left');
          }}
        >
          ←
        </button>
      )}
      <div className="wrap" {...draggableTab.getRootProps()}>
        <div className="inner" {...draggableTab.getWrapperProps()}>
          <div style="width: 1800">один</div>
          <div class="active">два</div>
        </div>
      </div>
      {!draggableTab.isRightLimit && (
        <button
          type="button"
          onClick={() => {
            draggableTab.scroll('right');
          }}
        >
          →
        </button>
      )}
    </>
  );
};
```

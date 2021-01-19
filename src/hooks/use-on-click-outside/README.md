# useOnClickOutside

Данный хук необходим для кейсов, где нужно считывать клик вне компонента и производить по нему какое-то действие.

### API

    handler - функция, которая будет вызвана по клику вне компонента
    ref - ссылка на компонент, вне которого нужно считывать клик

### Пример использования

```tsx
import React from 'react';
import { useOnClickOutside } from '@gpn-prototypes/vega-ui';

type Props = {
  onClickOutside: (e: MouseEvent | TouchEvent) => void;
};

export const HookedComponent: React.FC<Props> = ({ onClickOutside }) => {
  const ref = useRef(null);

  useOnClickOutside({ ref, handler: onClickOutside });

  return (
    <>
      <div ref={ref} data-testid="div-test-id">
        test-div
      </div>
      <button type="button" data-testid="button-test-id">
        test-button
      </button>
    </>
  );
};
```

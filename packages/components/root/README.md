# @gpn-prototypes/vega-root

Компонент является корневом селектором для вашего приложения и предоставляет средства для управления:

- Темизацией
- Порталами

### Установка

```
yarn add @gpn-prototypes/vega-root
```

### Пример использования

```jsx
import { Root as VegaRoot } from '@gpn-prototypes/vega-root';

export const App = () => {
  return (
    <VegaRoot initialPortals={[{ id: 'modalRoot' }]} defaultTheme="default">
      {/* код приложения */}
    </VegaRoot>
  );
};
```

### API компонента

```ts
type PortalParams = {
  className?: string;
  id: string;
} & DivProps;

type RootProps = {
  initialPortals?: PortalParams[]; // начальные порталы для рендера
  defaultTheme?: 'default' | 'dark' | 'display'; // начальная тема
  rootId: string; // id для корневого элемента
  children: React.ReactNode;
};
```

### API useRoot

Возвращает `ts { rootId: string }`.

### API usePortal

Возвращает корневой портал

Пример использования:

```tsx
import { usePortal } from '@gpn-prototypes/vega-root';
import { Modal } from './Modal';

const MyComponent = () => {
  const portal = usePortal();

  return <Modal portalID={portal.current.id}>{/* some code */}</Modal>;
};
```

### API useTheme

Хук возвращает текущую тему и метод для установки новой.

Пример использования:

```tsx
import { useTheme } from '@gpn-prototypes/vega-root';

const MyComponent = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button type="button" onClick={() => setTheme('dark')}>
      Установить новую тему
    </button>
  );
};
```

```ts
type ThemeAPI = {
  theme: 'dark' | 'default' | 'display'; // текущая тема приложения
  setTheme: (theme) => void; // метод для установки темы
};
```

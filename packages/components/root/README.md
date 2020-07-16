# @gpn-prototypes/vega-root

Компонент является корневым для вашего приложения и предоставляет средства для управления:

-   Темизацией
-   Порталами

### Установка

    yarn add @gpn-prototypes/vega-root

### Пример использования

```jsx
import { Root as VegaRoot } from '@gpn-prototypes/vega-root';

export const App = () => {
  return (
    <VegaRoot initialPortals={[{ name: 'modalRoot' }]} defaultTheme="default">
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
  defaultTheme?: 'default' | 'dark' | 'display'; // начальная тема
  children: React.ReactNode;
  initialPortals: { name: string; className?: string; parentSelector?: string } // порталы, которые будут зарендерены при монтировании компонента
};
```

### API usePortal

Возвращает портал-контейнер для рендера в нем компонентов.

На вход принимает `ts { name: string; className?: string; parentSelector?: string } `. Параметры `parentSelector` и `className` необходимы на случай, если портал не найден, тогда он будет создан.

Пример использования:

```tsx
import { usePortal } from '@gpn-prototypes/vega-root';
import { Modal } from './Modal';

const MyComponent = () => {
  const { portal } = usePortal({ name: 'default' });

  return <Modal portalID={portal.id}>{/* some code */}</Modal>;
};
```

### API usePortalRender

Предоставляет методы для рендера порталов.

```ts
type PortalRenderAPI = {
  renderPortalWithTheme: (children: React.ReactNode, container: Element) => ReactPortal // метод для рендера портала в контейнере с темой. Является заменой createPortal.
}
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

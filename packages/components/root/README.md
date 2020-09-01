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
type RootProps = {
  // Тема по умолчанию - default. В дальнейшем тему можно изменить с помощью хука useTheme
  defaultTheme?: 'default' | 'dark' | 'display';
  // Массив порталов, которые будут зарендерены при монтировании компонента
  initialPortals?: PortalParams[];
  // className будет установлен корневому div элементу
  className?: string;
  children: React.ReactNode;
};
type PortalParams = {
  name: string;
  className?: string;
  parentSelector?: string;
};

```

### API usePortal

Возвращает портал для рендера в нем компонентов.

Принимает объект типа `PortalParams` (описание cм. выше). Параметры `parentSelector` и `className` необходимы на случай, если портал не найден, тогда он будет создан.

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

Предоставляет метод `renderPortalWithTheme` для рендера порталов с поддержкой темы. Является заменой createPortal.

```ts
type PortalRenderAPI = {
  renderPortalWithTheme: (children: React.ReactNode, container: Element, className?: string) => ReactPortal 
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

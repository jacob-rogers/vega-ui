# @gpn-prototypes/vega-sidebar

Компонент "Сайдбар"

<img src="docs/pic-1.png" width="400">

### Установка

```
yarn add @gpn-prototypes/vega-sidebar
```

### Примеры использования

#### Полное окно

```jsx
import { Sidebar } from '@gpn-prototypes/vega-sidebar';
import { Button } from '@gpn-prototypes/vega-button';

export const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleOpen = (): void => setIsOpen(true);
  const handleClose = (): void => setIsOpen(false);

  const handlenMinimize = (): void => {
    /* ... */
  };

  return (
    <>
      <Button view="primary" size="m" label="Открыть Сайдбар" onClick={handleOpen} />
      <Sidebar isOpen={isOpen} onOverlayClick={handleClose}>
        <Sidebar.Header onMinimize={handlenMinimize} onClose={handleClose}>
          Загрузка файлов
        </Sidebar.Header>
        <Sidebar.Body>// ...</Sidebar.Body>
        <Sidebar.Footer>// ...</Sidebar.Footer>
      </Sidebar>
    </>
  );
};
```

#### Свернутое окно

<img src="docs/pic-2.png" width="300">

```jsx
import { Sidebar } from '@gpn-prototypes/vega-sidebar';
import { Button } from '@gpn-prototypes/vega-button';

export const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleOpen = (): void => setIsOpen(true);
  const handleClose = (): void => setIsOpen(false);

  const handlenMinimize = (): void => {
    /* ... */
  };

  return (
    <>
      <Button view="primary" size="m" label="Открыть Сайдбар" onClick={handleOpen} />
      <Sidebar isOpen={isOpen} isMinimized>
        <Sidebar.Header hasMinimizeButton={false} onClose={handleClose}>
          Загрузка файлов
        </Sidebar.Header>
        <Sidebar.Body>// ...</Sidebar.Body>
      </Sidebar>
    </>
  );
};
```

### API

```ts
type SidebarProps = {
  isOpen?: boolean;
  align?: 'left' | 'right';
  hasOverlay?: boolean;
  onOverlayClick?: (event: React.SyntheticEvent) => void;
  portalContainerSelector?: string;
  isMinimized?: boolean;
  className?: string;
};
```

```ts
type SidebarHeaderProps = {
  hasMinimizeButton?: boolean;
  onMinimize?: (event: React.SyntheticEvent) => void;
  onClose?: (event: React.SyntheticEvent) => void;
  className?: string;
};
```

```ts
type SidebarBodyProps = {
  className?: string;
};
```

```ts
type SidebarFooterProps = {
  className?: string;
};
```

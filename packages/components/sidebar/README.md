# @gpn-prototypes/vega-sidebar

Компонент "Сайдбар"

#### Сайдбар на всю высоту страницы

<img src="docs/pic-1.png" width="400">

#### Свернутый садйбар

<img src="docs/pic-2.png" width="400">

### Установка

```
yarn add @gpn-prototypes/vega-sidebar
```

### Примеры использования

```jsx
import { Sidebar, useSidebar } from '@gpn-prototypes/vega-sidebar';

export const MyComponent = () => {
  const {
    state: { isOpen, isMinimized },
    close: handleClose,
    open: handleOpen,
    maximize: handleMaximize,
    minimize: handleMinimize,
  } = useSidebar({
    isOpen: true,
    isMinimized: false,
  });

  return (
    <>
      <Sidebar isOpen={isOpen} isMinimized={isMinimized}>
        {isMinimized ? (
          <>
            <Sidebar.Header hasMinimizeButton={false} onClose={handleClose}>
              // ...
            </Sidebar.Header>
            <Sidebar.Body>// ...</Sidebar.Body>
          </>
        ) : (
          <>
            <Sidebar.Header onMinimize={handleMinimize} onClose={handleClose}>
              // ...
            </Sidebar.Header>
            <Sidebar.Body>// ...</Sidebar.Body>
            <Sidebar.Footer>// ...</Sidebar.Footer>
          </>
        )}
      </Sidebar>
    </>
  );
};
```

### API

```ts
type SidebarProps = {
  isOpen?: boolean;
  isMinimized?: boolean;
  align?: 'left' | 'right';
  hasOverlay?: boolean;
  onOverlayClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent> | KeyboardEvent) => void;
  portalContainerSelector?: string;
  className?: string;
};
```

```ts
type SidebarHeaderProps = {
  hasMinimizeButton?: boolean;
  onMinimize?: (event: React.MouseEvent) => void;
  onClose?: (event: React.MouseEvent) => void;
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

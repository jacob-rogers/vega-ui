# @gpn-prototypes/vega-portals-root

Компонент является элементом, который рендерит корневой селектор для порталов и прокидывает его с помощью контекста в дочерние элементы.

Компонент при монтировании создает ноду для порталов. При размонтировании удаляет ее.

### Установка

```
yarn add @gpn-prototypes/vega-portals-root
```

### Пример использования

Для начала работы вам необходимо создать экземпляр класса [PortalsRootManager](PortalsRootManager.md).

```jsx
import { PortalsRoot } from '@gpn-prototypes/vega-portals-root';

export const MyComponent = () => {
  return (
    <PortalsRoot containerId="id" className="className">
      <App />
    </PortalsRoot>
  );
};
```

### API компонента

```ts
type PortalsRootProps = {
  className?: string;
  containerId?: string;
};
```

### API usePortalsRoot

Возвращает экземпляр PortalsRootAPI.

```ts
type PortalsRootAPI = {
  containerId: string;
  setClassName: (className: string) => void;
  getContainer: () => HTMLElement | null;
};
```

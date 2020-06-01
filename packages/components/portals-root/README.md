# @gpn-prototypes/vega-portals-root

Компонент является корневым элементом, который рендерит корневые селекторы (селектор для всего приложения и его порталов) и прокидывает их с помощью контекста в дочерние элементы.

Компонент при монтировании создает ноду для порталов. При размонтировании удаляет ее.

### Установка

```
yarn add @gpn-prototypes/vega-portals-root
```

### Пример использования

Для начала работы вам необходимо создать экземпляр класса [PortalsRootManager](PortalsRootManager.md).

```jsx
import { PortalsRoot, PortalsRootManager } from '@gpn-prototypes/vega-portals-root';

export const MyComponent = () => {
  const PortalsRootManager = new PortalsRootManager('containerId', 'portalcontainerId'); // прокидываем id для корневого элемента и для корневого портала

  return (
    <PortalsRoot PortalsRootManager={PortalsRootManager}>
      <App />
    </PortalsRoot>
  );
};
```

### API компонента

```ts
type PortalsRootProps = {
  PortalsRootManager: PortalsRootManager;
  className?: string;
  portalRootClassName?: string;
} & JSX.IntrinsicElements['div'];
```

### API usePortalsRootManager

Возвращает экземпляр PortalsRootManager для вашего приложения.

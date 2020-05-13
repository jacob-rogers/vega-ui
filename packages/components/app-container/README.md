# @gpn-prototypes/vega-app-container

Компонент является корневым элементом, который рендерит корневые селекторы (селектор для всего приложения и его порталов) и прокидывает их с помощью контекста в дочерние элементы.

Компонент при монтировани создает ноду для порталов. При размонтировании удаляет ее.

### Установка

```
yarn add @gpn-prototypes/vega-app-container
```

### Пример использования

Для начала работы вам необходимо создать экземпляр класса [AppContainerManager](AppContainerManager.md).

```jsx
import { AppContainer, AppContainerManager } from '@gpn-prototypes/vega-app-container';

export const MyComponent = () => {
  const appContainerManager = new AppContainerManager('rootId', 'portalRootId'); // прокидываем id для корневого элемента и для корневого портала

  return (
    <AppContainer appContainerManager={appContainerManager}>
      <App />
    </AppContainer>
  );
};
```

### API компонента

```ts
type AppContainerProps = {
  appContainerManager: AppContainerManager;
  className?: string;
  portalClassName?: string;
} & JSX.IntrinsicElements['div'];
```

### API useAppContainerManager

Возвращает экземпляр AppContainerManager для вашего приложения.

# @gpn-prototypes/vega-navigation-list

Компонент "Навигация"

<img src="docs/pic-1.png" width="300">

### Примеры использования

#### Без иконки и разделителя

<img src="docs/pic-1.png" width="300">

```jsx
import { NavigationList } from '@gpn-prototypes/vega-ui';

export const MyComponent = () => {
  const active = true;

  return (
    <NavigationList>
      <NavigationList.Item active={active}>
        {(props) => (
          <button type="button" {...props}>
            Описание проекта
          </button>
        )}
      </NavigationList.Item>
      <NavigationList.Item>
        {(props) => (
          <button type="button" {...props}>
            Участники
          </button>
        )}
      </NavigationList.Item>
      <NavigationList.Item>
        {(props) => (
          <button type="button" {...props}>
            Связанные документы и файлы
          </button>
        )}
      </NavigationList.Item>
    </NavigationList>
  );
};
```

#### С иконкой

<img src="docs/pic-2.png" width="300">

Обратите внимание, что не стоит использовать свойство `justify-content: space-between` для разделения текста и элемента иконки. При включенной нумерации (`ordered`) числа для нумерации добавляются с помощью псевдоэлемента `::before` и, как следствие, будут считаться третьим `flex` элементом.

```jsx
import { NavigationList, IconCheck } from '@gpn-prototypes/vega-ui;

export const MyComponent = () => {
  const active = true;

  return (
    <NavigationList>
      <NavigationList.Item active={active}>
        {(props) => (
          <button type="button" css="withIcon" {...props}>
            Описание проекта
            <IconCheck size="s" view="success" css="icon" />
          </button>
        )}
      </NavigationList.Item>
      <NavigationList.Item active={active}>
        {(props) => (
          <button type="button" {...props}>
            Участники
          </button>
        )}
      </NavigationList.Item>
      <NavigationList.Item>
        {(props) => (
          <button type="button" {...props}>
            Связанные документы и файлы
          </button>
        )}
      </NavigationList.Item>
    </NavigationList>
  );
};
```

```css
.withIcon {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.icon {
  margin-left: auto;
}
```

#### С разделителем

<img src="docs/pic-3.png" width="300">

```jsx
import { NavigationList } from '@gpn-prototypes/vega-ui';

export const MyComponent = () => {
  const active = true;

  return (
    <NavigationList>
      <NavigationList.Item active={active}>
        {(props) => (
          <button type="button" {...props}>
            Описание проекта
          </button>
        )}
      </NavigationList.Item>
      <NavigationList.Item>
        {(props) => (
          <button type="button" {...props}>
            Участники
          </button>
        )}
      </NavigationList.Item>
      <NavigationList.Item>
        {(props) => (
          <button type="button" {...props}>
            Связанные документы и файлы
          </button>
        )}
      </NavigationList.Item>
      <NavigationList.Item>Связанные документы и файлы</NavigationList.Item>
      <NavigationList.Delimiter />
      <NavigationList.Item>
        {(props) => (
          <button type="button" {...props}>
            Похожие проекты
          </button>
        )}
      </NavigationList.Item>
      <NavigationList.Item>
        {(props) => (
          <button type="button" {...props}>
            Описание
          </button>
        )}
      </NavigationList.Item>
    </NavigationList>
  );
};
```

### API

```ts
type NavigationListProps = {
  ordered?: boolean; // Добавляет нумерацию элементов
  className?: string;
};

type NavigationListItemChildrenProps = {
  className: string;
};

type NavigationListItemProps = {
  active?: boolean; // Индикатор активного элемента
  className?: string;
  children(childrenProps: NavigationListItemChildrenProps): React.ReactNode;
};

type NavigationListDelimiterProps = {
  className?: string;
};
```

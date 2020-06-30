# @gpn-prototypes/vega-header

Компонент Header.

![Шапка](docs/header.jpg)

### Установка

```
yarn add @gpn-prototypes/vega-header

```

### Пример использования

```tsx
import React from 'react';
import { Header, NavItem } from '@gpn-prototypes/vega-header';

export const MyComponent = () => {
  const navItems = [
    {
      name: 'Пайплайн',
      isActive: true,
    },
    {
      name: 'Ресурсная база',
    },
    {
      name: 'Геологические риски',
    },
  ];
  const menuItems = [
    {
      name: 'Проекты',
      url: '/projects',
      onClick: () => {
        console.log('Проекты');
      },
    },
    { name: 'Обучение', url: '/lessons' },
    { name: 'Помощь', url: '/help' },
  ];

  const [activeItem, setActiveItem] = React.useState(navItems.filter(ni => ni.isActive));

  const handleChangeActive = (item: NavItem[]): void => {
    setActiveItem(item);
  };

  return (
    <Header>
      <Header.Menu title="Очень-очень длинное название прое...">
        {menuItems.map(menuItem => (
          <Header.Menu.Item key={menuItem.name}>
            {(menuItemProps): React.ReactNode => (
              <a {...menuItemProps} href={menuItem.url}>
                {menuItem.name}
              </a>
            )}
          </Header.Menu.Item>
        ))}
        <Header.Menu.Delimiter />
      </Header.Menu>
      <Header.Nav navItems={navItems} activeItem={activeItem} onChangeItem={handleChangeActive}>
        <Header.Nav.Tabs />
      </Header.Nav>
    </Header>
  );
};
```

### API компонента

```ts
type HeaderMenuProps = {
  title: string; // отображаемая в меню надпись
  children: React.ReactNode;
};

type ItemRenderProps = {
  onClick?: (e: MouseEvent | TouchEvent | React.SyntheticEvent) => void;
  className: string;
};

type HeaderMenuItemProps = {
  children: (props: ItemRenderProps) => React.ReactNode | React.ReactNode; // метод для рендера Item
  className?: string;
};

type HeaderNavProps = {
  children: React.ReactNode;
  onChangeItem: (item: NavItem[]) => void;
  navItems: NavItem[];
  activeItem?: NavItem[];
};

type NavItem = {
  name: string;
  isActive?: boolean;
};
```

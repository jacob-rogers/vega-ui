import React from 'react';
import { Text } from '@gpn-prototypes/vega-text';
import { storiesOf } from '@storybook/react';

import { Header } from './Header';
import { NavItem } from './types';

storiesOf('ui/Header', module)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('по умолчанию', () => {
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
      {
        name: 'Профиль добычи',
      },
      {
        name: 'Оценка обустройства',
      },
      {
        name: 'Экономика проекта',
      },
      {
        name: 'Логика проекта',
      },
      {
        name: 'Моделирование',
      },
    ];
    const menuItems = [
      { name: 'Проекты', url: '' },
      { name: 'Обучение', url: '' },
      { name: 'Помощь', url: '' },
    ];

    const [activeItem, setActiveItem] = React.useState(navItems.filter((ni) => ni.isActive));

    const handleChangeActive = (item: NavItem[]): void => {
      setActiveItem(item);
    };

    return (
      <Header>
        <Header.Menu title="Очень-очень длинное длинное название проекта">
          {menuItems.map((menuItem) => (
            <Header.Menu.Item key={menuItem.name}>
              {(menuItemProps): React.ReactNode => (
                <a
                  onClick={menuItemProps.closeMenu}
                  className={menuItemProps.className}
                  href={menuItem.url}
                >
                  <Text>{menuItem.name}</Text>
                </a>
              )}
            </Header.Menu.Item>
          ))}
          <Header.Menu.Delimiter />
          <Header.Menu.Item>
            {(menuItemProps): React.ReactNode => (
              <a onClick={menuItemProps.closeMenu} className={menuItemProps.className} href="/">
                <Text>Выйти</Text>
              </a>
            )}
          </Header.Menu.Item>
        </Header.Menu>
        <Header.Nav navItems={navItems} activeItem={activeItem} onChangeItem={handleChangeActive} />
      </Header>
    );
  });

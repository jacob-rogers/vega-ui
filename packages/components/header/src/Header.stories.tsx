import React from 'react';
import { storiesOf } from '@storybook/react';

import { Header } from './Header';

storiesOf('ui/Header', module)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('Header', () => {
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

    return (
      <Header
        navItems={navItems}
        menuItems={menuItems}
        title="Очень длинное название проекта длинное"
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onLogout={(): void => {}}
      />
    );
  });

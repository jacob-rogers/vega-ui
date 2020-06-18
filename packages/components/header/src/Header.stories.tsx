import React from 'react';
import { storiesOf } from '@storybook/react';

import { Header } from './Header';

storiesOf('ui/Header', module).add('Header', () => {
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
  return <Header navItems={navItems} title="Очень длинное название проекта длинное" />;
});

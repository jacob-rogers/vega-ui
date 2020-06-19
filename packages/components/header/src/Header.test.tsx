import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Header } from './Header';

type HeaderTestProps = React.ComponentProps<typeof Header>;

const navItems = [
  {
    name: 'О проекте',
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
  { name: 'Проекты', url: '' },
  { name: 'Обучение', url: '' },
  { name: 'Помощь', url: '' },
];

const renderComponent = (
  props: HeaderTestProps = { navItems, menuItems, title: 'Шапка' },
): RenderResult => render(<Header {...props} />);

describe('Header', () => {
  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  test('рендерится навигация', async () => {
    const header = renderComponent();

    expect(header.container.querySelector('.VegaHeader__Delimiter')).toBeInTheDocument();
    expect(header.getByText('О проекте')).toBeInTheDocument();
  });
});

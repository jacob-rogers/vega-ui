import React from 'react';
import { act, fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { Header } from './Header';

type HeaderTestProps = React.ComponentProps<typeof Header>;

const renderComponent = (props: HeaderTestProps): RenderResult => render(<Header {...props} />);

describe('Header', () => {
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

  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  test('рендерится навигация', async () => {
    const header = renderComponent({ navItems, title: 'Шапка' });

    expect(header.container.querySelector('.VegaHeader__Delimiter')).toBeInTheDocument();
    expect(header.getByText('Пайплайн')).toBeInTheDocument();
  });
});

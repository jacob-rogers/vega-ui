import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';

import { HeaderNav } from './HeaderNav';

type HeaderNavTestProps = React.ComponentProps<typeof HeaderNav>;

const renderComponent = (props: HeaderNavTestProps): RenderResult =>
  render(<HeaderNav {...props} />);

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

  test('рендерится без ошибок', async () => {
    const nav = await renderComponent({ navItems });
    expect((await nav.findAllByRole('tab')).length).toBe(3);
  });

  test('переключается навигация', async () => {
    const nav = renderComponent({ navItems });

    fireEvent.click(nav.getByText('Геологические риски'));

    expect(nav.getByText('Геологические риски')).toHaveClass('Tabs-Tab_active');
  });
});

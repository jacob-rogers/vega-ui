import React from 'react';
import { fireEvent, render, RenderResult, screen, waitFor } from '@testing-library/react';

import { HeaderMenu } from './HeaderMenu';

type HeaderNavTestProps = React.ComponentProps<typeof HeaderMenu>;

const defaultProps = {
  title: 'Проект',
  menuItems: [
    { name: 'Пункт 1', url: 'url1' },
    { name: 'Пункт 2', url: 'url2', onClick: jest.fn() },
  ],
};

const renderComponent = (props: HeaderNavTestProps = defaultProps): RenderResult =>
  render(<HeaderMenu {...props} />);

const getMenuList = (): HTMLElement => screen.getByRole('menu');

describe('Header', () => {
  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  test('открывается меню', async () => {
    const menu = await renderComponent();
    const menuTrigger = await menu.getByTestId('Header:Menu:Trigger');

    expect(menu.container.querySelector('.VegaMenu')).not.toBeTruthy();

    fireEvent.click(menuTrigger);

    await waitFor(() => {
      expect(getMenuList()).toBeInTheDocument();
    });
  });

  test('вызывается callback функция', async () => {
    const menu = await renderComponent();
    const menuTrigger = await menu.getByTestId('Header:Menu:Trigger');

    expect(menu.container.querySelector('.VegaMenu')).not.toBeTruthy();

    fireEvent.click(menuTrigger);

    await waitFor(() => {
      expect(getMenuList()).toBeInTheDocument();
    });

    const menuItem = await screen.getByText('Пункт 2');

    fireEvent.click(menuItem);

    await waitFor(() => {
      expect(menu.container.querySelector('[role="menu"]')).toBe(null);
    });
  });

  test('вызывается logout функция', async () => {
    const handleLogout = jest.fn();
    const menu = await renderComponent({ ...defaultProps, onLogout: handleLogout });
    const menuTrigger = await menu.getByTestId('Header:Menu:Trigger');

    expect(menu.container.querySelector('.VegaMenu')).not.toBeTruthy();

    fireEvent.click(menuTrigger);

    await waitFor(() => {
      expect(getMenuList()).toBeInTheDocument();
    });

    const menuItem = await screen.getByText('Выйти');

    fireEvent.click(menuItem);

    await waitFor(() => {
      expect(handleLogout).toBeCalledTimes(1);
    });
  });
});

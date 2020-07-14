import React from 'react';
import { act, fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { Dropdown, DropdownProps } from './Dropdown';

type DropdownTestProps = Partial<Omit<DropdownProps, 'children'>>;

const Component = (props: DropdownTestProps = {}): React.ReactElement => (
  <div data-testid="root">
    <Dropdown {...props}>
      <Dropdown.Trigger>
        {({ toggle, props: triggerProps }): React.ReactNode => (
          <button type="button" data-testid="trigger" onClick={toggle} {...triggerProps}>
            Это тригер
          </button>
        )}
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {({ props: menuProps }): React.ReactNode => (
          <div data-testid="menu" {...menuProps}>
            Выпадающее меню
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  </div>
);

const renderComponent = (props: DropdownTestProps = {}): RenderResult =>
  render(<Component {...props} />);

const findMenu = (): HTMLElement => screen.getByTestId('menu');
const findTrigger = (): HTMLElement => screen.getByTestId('trigger');
const findRoot = (): HTMLElement => screen.getByTestId('root');

describe('Dropdown', () => {
  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  test('открытие/закрытие меню', async () => {
    const { rerender } = render(<Component />);
    expect(findMenu).toThrow();
    await act(async () => {
      await rerender(<Component isOpen />);
    });
    expect(findMenu).not.toThrow();
  });

  test('меню рендерится всегда, если onlyOpen=false', async () => {
    await act(async () => {
      await renderComponent({ onlyOpen: false, isOpen: false });
    });

    expect(findMenu).not.toThrow();
  });

  test('вызывается onToggle при клика на тригер', () => {
    const handleToggle = jest.fn();
    renderComponent({ onToggle: handleToggle });

    const trigger = findTrigger();

    fireEvent.click(trigger);
    expect(handleToggle).toBeCalledTimes(1);
  });

  test('вызывается onClickOutside при клика вне дропдауна', () => {
    const handleClickOutside = jest.fn();
    renderComponent({ onClickOutside: handleClickOutside });

    const root = findRoot();

    fireEvent.click(root);
    expect(handleClickOutside).toBeCalledTimes(1);
  });

  test('onToggle возвращает новое состояние дропдауна', () => {
    const handleToggle = jest.fn();

    renderComponent({ onToggle: handleToggle, isOpen: false });

    const trigger = findTrigger();

    fireEvent.click(trigger);

    expect(handleToggle).toBeCalledWith(true, expect.any(Object));
  });

  it('рендерится в портале', async () => {
    await act(async () => {
      await renderComponent({ isOpen: true });
    });

    const menu = findMenu();

    expect(document.body).toContainElement(menu);
  });
});

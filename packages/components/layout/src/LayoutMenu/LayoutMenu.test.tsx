import React from 'react';
import { act, fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { LayoutMenu, LayoutMenuProps } from './LayoutMenu';

const items = [
  { label: 'test', value: 'test' },
  { label: 'test2', value: 'test2' },
  { label: 'test3', value: 'test3' },
];

function renderComponent(
  props: Omit<LayoutMenuProps, 'items'> = { activeValue: '', onChange: jest.fn() },
): RenderResult {
  return render(<LayoutMenu {...props} items={items} />);
}

function findTrigger(): Promise<HTMLElement> {
  return screen.findByLabelText('Триггер для меню layout');
}

async function clickByTrigger(): Promise<void> {
  const trigger = await findTrigger();

  act(() => {
    fireEvent.click(trigger);
  });
}

describe('LayoutMenu', () => {
  it('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  it('рендерится триггер', async () => {
    renderComponent();

    const trigger = await findTrigger();

    expect(trigger).toBeInTheDocument();
  });

  it('рендерится элементы меню', async () => {
    renderComponent();

    await clickByTrigger();

    const menuItem = await screen.getByLabelText('test');

    expect(menuItem).toBeInTheDocument();
  });

  it('вызывается onChange по клику на элемент', async () => {
    const onChange = jest.fn();

    renderComponent({ onChange });

    await clickByTrigger();

    const menuItem = await screen.getByLabelText('test');

    fireEvent.click(menuItem);

    expect(onChange).toBeCalled();
  });

  it('выставляется активный элемент', async () => {
    renderComponent({ activeValue: 'test', onChange: jest.fn() });

    await clickByTrigger();

    const menuItem = await screen.getByLabelText('test');

    expect(menuItem.classList.contains('VegaNavigationList__Item_active')).toBe(true);
  });
});

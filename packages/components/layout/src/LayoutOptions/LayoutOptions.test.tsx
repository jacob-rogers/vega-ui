import React from 'react';
import { Root } from '@gpn-prototypes/vega-root';
import { act, fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { LayoutOptions, LayoutOptionsProps } from './LayoutOptions';

function renderComponent(props: LayoutOptionsProps = { onLayoutChange: jest.fn() }): RenderResult {
  return render(
    <Root>
      <LayoutOptions {...props} />
    </Root>,
  );
}

const labels = [
  ['Добавить панель справа', 'right'],
  ['Добавить панель слева', 'left'],
  ['Добавить панель сверху', 'top'],
  ['Добавить панель снизу', 'bottom'],
  ['Закрыть панель', 'close'],
];

function findTrigger(): Promise<HTMLElement> {
  return screen.findByLabelText('Открыть dropdown');
}

describe('LayoutOptions', () => {
  test.each(labels)('рендерит опцию "%s"', async (label) => {
    renderComponent();

    const trigger = await findTrigger();

    act(() => {
      fireEvent.click(trigger);
    });

    const option = await screen.findByLabelText(label);

    expect(option).toBeInTheDocument();
  });

  test.each(labels)('onLayoutChange вызывается корректно для "%s"', async (label, action) => {
    const onLayoutChange = jest.fn();

    renderComponent({ onLayoutChange });

    const trigger = await findTrigger();

    act(() => {
      fireEvent.click(trigger);
    });

    const option = await screen.findByLabelText(label);

    act(() => {
      fireEvent.click(option);
    });

    expect(onLayoutChange).toBeCalledWith(action);
  });
});

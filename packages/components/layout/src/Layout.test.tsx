import React from 'react';
import { Root } from '@gpn-prototypes/vega-root';
import { act, fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { Layout, LayoutProps } from './Layout';

function renderComponent(props: LayoutProps = { onChange: jest.fn() }): RenderResult {
  return render(
    <Root>
      <Layout {...props} />
    </Root>,
  );
}

const labels = [
  'Добавить панель справа',
  'Добавить панель слева',
  'Добавить панель сверху',
  'Добавить панель снизу',
];

function findOptionsTrigger(): Promise<HTMLElement> {
  return screen.findByLabelText('Открыть опции панели');
}

async function clickByTrigger(): Promise<void> {
  const trigger = await findOptionsTrigger();

  act(() => {
    fireEvent.click(trigger);
  });
}

async function clickByOption(label: string): Promise<void> {
  await clickByTrigger();

  const option = await screen.getByLabelText(label);

  act(() => {
    fireEvent.click(option);
  });
}

describe('Layout', () => {
  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('Splitting', () => {
    test.each(labels)('рендерит опцию "%s"', async (label) => {
      renderComponent();

      await clickByTrigger();

      const option = await screen.findByLabelText(label);

      expect(option).toBeInTheDocument();
    });

    test('вызывается onChange', async () => {
      const onChange = jest.fn();

      renderComponent({ onChange });

      await clickByOption(labels[0]);

      expect(onChange).toBeCalledWith({ idx: 0, type: 'split' });
    });

    test('опции закрываются после клика на элемент', async () => {
      const { container } = renderComponent();

      await clickByOption(labels[0]);

      expect(container.querySelector('.VegaLayout__MenuTrigger')).toBeInTheDocument();

      expect(container.querySelector('.VegaLayout__List')).not.toBeInTheDocument();
    });

    test('создается новое окно в панели', async () => {
      const { container } = renderComponent();

      expect(container.querySelectorAll('.VegaLayout__Window').length).toBe(1);

      await clickByOption(labels[0]);

      expect(container.querySelectorAll('.VegaLayout__Window').length).toBe(2);
    });

    test('панель закрывается', async () => {
      const { container } = renderComponent();

      await clickByOption(labels[0]);

      expect(container.querySelectorAll('.VegaLayout__Window').length).toBe(2);

      const triggers = await screen.findAllByLabelText('Открыть опции панели');

      act(() => {
        fireEvent.click(triggers[0]);
      });

      const closeOption = await screen.findByLabelText('Закрыть панель');

      act(() => {
        fireEvent.click(closeOption);
      });

      expect(container.querySelectorAll('.VegaLayout__Window').length).toBe(1);
    });
  });
});

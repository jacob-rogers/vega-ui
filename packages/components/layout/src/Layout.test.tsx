import React from 'react';
import { Root } from '@gpn-prototypes/vega-root';
import { act, fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { Grid } from './grid';
import { Layout, LayoutProps } from './Layout';

const defaultWidgets: LayoutProps['widgets'] = [
  { label: 'Div', name: 'div', component: 'div' },
  { label: 'React component', name: 'rc-div', component: () => <div /> },
];

function renderComponent(props: Partial<LayoutProps> = {}): RenderResult {
  return render(
    <Root>
      <Layout widgets={defaultWidgets} {...props} />
    </Root>,
  );
}

const splitLabels = [
  'Добавить панель справа',
  'Добавить панель слева',
  'Добавить панель сверху',
  'Добавить панель снизу',
];

function findSplitViews(): HTMLElement[] {
  return screen.queryAllByRole('group');
}

function findDataViews(): HTMLElement[] {
  return screen.queryAllByRole('treeitem');
}

const OPTIONS_TRIGGER_LABEL = 'Открыть опции панели';

function findOptionsTrigger(): Promise<HTMLElement> {
  return screen.findByLabelText(OPTIONS_TRIGGER_LABEL);
}

function findAllOptionsTriggers(): Promise<HTMLElement[]> {
  return screen.findAllByLabelText(OPTIONS_TRIGGER_LABEL);
}

function findCloseOption(): Promise<HTMLElement> {
  return screen.findByLabelText('Закрыть панель');
}

async function clickByTrigger(): Promise<void> {
  await act(async () => {
    const trigger = await findOptionsTrigger();
    fireEvent.click(trigger);
  });
}

async function clickByOption(label: string): Promise<void> {
  await clickByTrigger();

  const option = screen.getByLabelText(label);

  act(() => {
    fireEvent.click(option);
  });
}

describe('Layout', () => {
  test('рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  test('лэйаут восстанавливается из переданного состояния', () => {
    const grid = Grid.create();
    const view = grid.get(0);
    const label = 'widget-test-label';

    if (Grid.isDataView(view)) {
      view.split('down');
      view.setWidgetName('div');
      view.setContext({ 'aria-label': label });
    }

    renderComponent({ state: grid.extract() });

    expect(findSplitViews().length).toBe(1);
    expect(findDataViews().length).toBe(2);

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  describe('Splitting', () => {
    test.each(splitLabels)('рендерит опцию "%s"', async (label) => {
      renderComponent();

      await clickByTrigger();

      const option = await screen.findByLabelText(label);

      expect(option).toBeInTheDocument();
    });

    test('вызывается onChange', async () => {
      const onChange = jest.fn();

      renderComponent({ onChange });

      await clickByOption(splitLabels[0]);

      expect(onChange).toBeCalledTimes(1);
    });

    test('опции закрываются после клика на элемент', async () => {
      const { container } = renderComponent();

      await clickByOption(splitLabels[0]);

      expect(container.querySelector('.VegaLayout__MenuTrigger')).toBeInTheDocument();

      expect(container.querySelector('.VegaLayout__List')).not.toBeInTheDocument();
    });

    test('создается новое окно в панели', async () => {
      renderComponent();

      expect(findDataViews().length).toBe(1);

      await clickByOption(splitLabels[0]);

      expect(findDataViews().length).toBe(2);
    });

    test('панель закрывается', async () => {
      renderComponent();

      await clickByOption(splitLabels[0]);

      expect(findDataViews().length).toBe(2);

      const [trigger] = await findAllOptionsTriggers();

      act(() => {
        fireEvent.click(trigger);
      });

      const closeOption = await findCloseOption();

      act(() => {
        fireEvent.click(closeOption);
      });

      expect(findDataViews().length).toBe(1);
    });
  });
});

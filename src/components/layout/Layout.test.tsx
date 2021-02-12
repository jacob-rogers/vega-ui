import React from 'react';
import { act, fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { Root } from '../root';

import { Grid } from './grid';
import { Layout, LayoutProps } from './Layout';
import { LayoutWidgetsOverrides } from './LayoutDataView';

const defaultWidgets: LayoutProps['widgets'] = [];

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
const TITLE_LIST_TRIGGER_LABEL = 'Открыть список виджетов';

function findOptionsTrigger(): Promise<HTMLElement> {
  return screen.findByLabelText(OPTIONS_TRIGGER_LABEL);
}

function findAllOptionsTriggers(): Promise<HTMLElement[]> {
  return screen.findAllByLabelText(OPTIONS_TRIGGER_LABEL);
}

function findAllTitleListTriggers(): Promise<HTMLElement[]> {
  return screen.findAllByLabelText(TITLE_LIST_TRIGGER_LABEL);
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
      view.setWidget('div');
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

  describe('Widgets', () => {
    const widgets = [
      { name: 'Widget 1', component: 'vega-widget-one' },
      { name: 'Widget 2', component: 'vega-widget-two' },
    ];

    const widgetsOverrides: LayoutWidgetsOverrides = {
      'vega-widget-two': (props) => <div {...props}>Widget 2</div>,
    };

    test('рендерит custom element', async () => {
      const grid = Grid.create();
      const view = grid.get(0);
      const label = 'vega-custom-element-widget';

      if (Grid.isDataView(view)) {
        view.setWidget('vega-widget-one');
        view.setContext({ 'aria-label': label });
      }

      renderComponent({ state: grid.extract(), widgets });
      expect(await screen.findByLabelText(label)).toBeInTheDocument();
    });

    test('рендерит react компонент', async () => {
      const grid = Grid.create();
      const view = grid.get(0);
      const label = 'vega-react-widget';

      if (Grid.isDataView(view)) {
        view.setWidget('vega-widget-two');
        view.setContext({ 'aria-label': label });
      }

      renderComponent({ state: grid.extract(), widgets, widgetsOverrides });

      expect(await screen.findByLabelText(label)).toBeInTheDocument();
    });

    test('виджет меняется', async () => {
      const grid = Grid.create();
      const view = grid.get(0);
      const label = 'vega-react-widget';

      if (Grid.isDataView(view)) {
        view.setWidget('vega-widget-two');
        view.setContext({ 'aria-label': label });
      }

      renderComponent({ state: grid.extract(), widgets, widgetsOverrides });

      expect(screen.getByLabelText('Открыть список виджетов')).toHaveTextContent('Widget 2');

      const [trigger] = await findAllTitleListTriggers();

      fireEvent.click(trigger);

      fireEvent.click(screen.getByText('Widget 1'));
      expect(screen.getByLabelText('Открыть список виджетов')).toHaveTextContent('Widget 1');
    });

    test('происходит resize панелей', async () => {
      const grid = Grid.create();
      const view = grid.get(0);
      const label = 'vega-react-widget';

      Object.defineProperties(window.HTMLElement.prototype, {
        offsetWidth: {
          // eslint-disable-next-line consistent-return
          get() {
            return 100;
          },
        },
      });

      if (Grid.isDataView(view)) {
        view.setWidget('vega-widget-two');
        view.setContext({ 'aria-label': label });
      }

      renderComponent({ state: grid.extract(), widgets, widgetsOverrides });

      expect(findDataViews().length).toBe(1);

      await clickByOption(splitLabels[0]);

      expect(findDataViews().length).toBe(2);

      const resizer = screen.getByTitle('Потянуть');

      expect(resizer).toBeVisible();

      fireEvent.mouseDown(resizer, {
        clientX: 50,
      });
      fireEvent.mouseMove(resizer, {
        clientX: 75,
      });
      fireEvent.mouseUp(resizer, {
        clientX: 75,
      });

      expect(screen.getByRole('group')).toHaveAttribute(
        'style',
        '--first-view-size: 75fr; --second-view-size: 25fr;',
      );
    });
  });
});

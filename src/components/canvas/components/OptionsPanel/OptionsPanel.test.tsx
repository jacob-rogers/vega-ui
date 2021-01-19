import React from 'react';
import { fireEvent, render, RenderResult, screen, waitFor } from '@testing-library/react';

import { items as createStepOptions } from './components/CreateOption';
import { options, OptionsPanel, OptionsPanelProps } from './OptionsPanel';
import { ActiveOption, Option } from './types';

const items = options.map((option) => [option.label, option.type]);

const createStepItems = createStepOptions.map((option) => [option.label, option.type]);

function renderComponent(props: Partial<OptionsPanelProps> = {}): RenderResult {
  return render(<OptionsPanel onChange={jest.fn()} {...props} />);
}

function openDropdown(): void {
  const option = screen.getByLabelText('Создание элементов');
  fireEvent.click(option);
}

describe('OptionsPanel', () => {
  test('корректно рендерится', () => {
    expect(renderComponent).not.toThrow();
  });

  test('прокидывается className', () => {
    const result = renderComponent({ className: 'test' });

    const optionsPanel = result.getByLabelText('Опции полотна');

    expect(optionsPanel).toHaveClass('test');
  });

  test.each(items)('опция "%s" рендерится', (label = '') => {
    const result = renderComponent();

    const option = result.getByLabelText(label);

    expect(option).toBeInTheDocument();
  });

  test.each(items.filter(([, type]) => type !== 'create'))(
    'по клику на "%s" onChange вызывается с type "%s"',
    (label = '', type) => {
      const onChange = jest.fn();
      const result = renderComponent({ onChange });

      const option = result.getByLabelText(label);

      fireEvent.click(option);

      expect(onChange).toBeCalledWith({ type });
    },
  );

  describe('CreateOption', () => {
    test('По клику на элемент меню "Создание элементов" открывается дропдаун', async () => {
      renderComponent();

      openDropdown();

      await waitFor(() => {
        expect(screen.getByLabelText('Меню для создания элементов')).toBeInTheDocument();
      });
    });

    test.each(createStepItems)('рендерится опция "%s"', async (label = '') => {
      renderComponent();

      openDropdown();

      await waitFor(() => {
        expect(screen.getByLabelText(label)).toBeInTheDocument();
      });
    });

    test.each(createStepItems)(
      'по клику на "%s" onChange вызывается с type "create" и itemType "%s"',
      async (label = '', type) => {
        const onChange = jest.fn();
        renderComponent({ onChange });

        openDropdown();

        const option = screen.getByLabelText(label);

        fireEvent.click(option);

        expect(onChange).toBeCalledWith({ type: 'create', itemType: type });
      },
    );
  });

  describe('disabledOption', () => {
    test.each(items)(
      'опция "%s" дизейблится при передаче пропса disabledOptions, содержащего тип "%s"',
      (label = '', type) => {
        const result = renderComponent({ disabledOptions: [type as Option] });
        const option = result.getByLabelText(label);

        expect(option).toHaveAttribute('disabled');
      },
    );

    test('элементы дизейблятся, если передать их тип в пропсе disabledOptions', () => {
      const result = renderComponent({ disabledOptions: options.map((option) => option.type) });

      const labels = options.map((option) => option.label ?? '');

      labels.forEach((label) => {
        const option = result.getByLabelText(label);
        expect(option).toHaveAttribute('disabled');
      });
    });
  });

  describe('activeValue', () => {
    test.each(items.filter(([, type]) => type === 'dragging' || type === 'selection'))(
      'элемент "%s" может становиться активным, если передать activeValue "%s"',
      (label = '', type) => {
        const result = renderComponent({ activeValue: type as ActiveOption });

        const option = result.getByLabelText(label);

        expect(option).toHaveClass('VegaCanvas__Option_active');
      },
    );
  });
});

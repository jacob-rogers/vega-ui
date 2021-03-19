import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ScalePanel } from './ScalePanel';

describe('ScalePanel', () => {
  type Props = Partial<React.ComponentProps<typeof ScalePanel>>;

  const onChange = jest.fn();
  const onAlign = jest.fn();

  function renderComponent(props: Props = {}): RenderResult {
    const { step = 10, scale = 100, minScale = 20, maxScale = 150 } = props;

    return render(
      <ScalePanel
        step={step}
        scale={scale}
        minScale={minScale}
        maxScale={maxScale}
        onChange={props.onChange || onChange}
        onAlign={onAlign}
      />,
    );
  }

  function findAlign(): HTMLElement {
    return screen.getByTitle('Выровнить содержимое');
  }

  function findZoomOut(): HTMLElement {
    return screen.getByTitle('Уменьшить масштаб');
  }

  function findZoomIn(): HTMLElement {
    return screen.getByTitle('Увеличить масштаб');
  }

  function findInput(): HTMLElement {
    return screen.getByRole('textbox');
  }

  function enterInputValue(value: string | number | null): void {
    const input = findInput();

    fireEvent.change(input, {
      target: { value },
    });

    fireEvent.keyUp(input, { key: 'Enter' });
  }

  test('рендерится без ошибок', () => {
    expect(render).not.toThrow();
  });

  describe('кнопка "Выровнить содержимое"', () => {
    test('срабатывает onChange по клику', () => {
      renderComponent();

      userEvent.click(findAlign());
      expect(onAlign).toBeCalled();
    });
  });

  describe('кнопка "Уменьшить масштаб"', () => {
    test('срабатывает onChange по клику', () => {
      renderComponent({ step: 10, scale: 100 });

      userEvent.click(findZoomOut());
      expect(onChange).toBeCalledWith(90);
    });

    test('срабатывает условие minScale', () => {
      renderComponent({ step: 75, scale: 100, minScale: 50 });

      userEvent.click(findZoomOut());
      expect(onChange).toBeCalledWith(50);
    });
  });

  describe('кнопка "Увеличить масштаб"', () => {
    test('срабатывает onChange по клику', () => {
      renderComponent({ step: 10, scale: 100 });

      userEvent.click(findZoomIn());
      expect(onChange).toBeCalledWith(110);
    });

    test('срабатывает условие maxScale', () => {
      renderComponent({ step: 75, scale: 100, maxScale: 150 });

      userEvent.click(findZoomIn());
      expect(onChange).toBeCalledWith(50);
    });
  });

  describe('ввод значения через input', () => {
    test('срабатывает onChange по Enter', () => {
      const value = 50;

      renderComponent({ scale: 100 });

      enterInputValue(value);
      expect(onChange).toBeCalledWith(value);
    });

    test('срабатывает onChange при потере фокуса', () => {
      const value = 50;

      renderComponent({ scale: 100 });

      const input = findInput();

      userEvent.type(input, value.toString());

      userEvent.click(findAlign());

      expect(onChange).toBeCalledWith(value);
    });

    test('срабатывает условие minScale', () => {
      renderComponent({ scale: 100, minScale: 50 });

      enterInputValue(40);
      expect(onChange).toBeCalledWith(50);
    });

    test('срабатывает условие maxScale', () => {
      renderComponent({ scale: 100, maxScale: 150 });

      enterInputValue(160);
      expect(onChange).toBeCalledWith(150);
    });

    test('при повторном вводе значения перерисовки нет', () => {
      const change = jest.fn();
      renderComponent({ scale: 100, onChange: change });

      enterInputValue('100');
      expect(change).toBeCalledTimes(0);
    });

    test('игнорируется текст в ведённом значении', () => {
      renderComponent({ scale: 100 });

      enterInputValue('50 some text');
      expect(onChange).toBeCalledWith(50);
    });

    test('игнорируется введённое значении', () => {
      const change = jest.fn();
      renderComponent({ scale: 100, maxScale: 150, onChange: change });

      enterInputValue('some text');
      expect(change).not.toBeCalled();
    });

    test('игнорируется текст в ведённом значении превышающим верхний предел', () => {
      renderComponent({ scale: 100, maxScale: 150 });

      enterInputValue('200 some text');
      expect(onChange).toBeCalledWith(150);
    });

    test('значения за пределами допустимых заменяются на максимально и минимально допустимые', () => {
      renderComponent({ scale: 100, maxScale: 150 });

      enterInputValue('200');
      expect(findInput()).toHaveValue('150');

      enterInputValue('170');
      expect(findInput()).toHaveValue('150');

      enterInputValue('10');
      expect(findInput()).toHaveValue('20');
    });
  });
});

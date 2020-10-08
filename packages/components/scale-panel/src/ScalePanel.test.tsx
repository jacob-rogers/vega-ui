import React from 'react';
import * as tl from '@testing-library/react';

import { ScalePanel } from './ScalePanel';

describe('ScalePanel', () => {
  type Props = Partial<React.ComponentProps<typeof ScalePanel>>;

  const onChange = jest.fn();
  const onAlign = jest.fn();

  function render(props: Props = {}): tl.RenderResult {
    const { step = 10, scale = 100, minScale = 20, maxScale = 150 } = props;

    return tl.render(
      <ScalePanel
        step={step}
        scale={scale}
        minScale={minScale}
        maxScale={maxScale}
        onChange={onChange}
        onAlign={onAlign}
      />,
    );
  }

  function findAlign(): HTMLElement {
    return tl.screen.getByTitle('Выровнить содержимое');
  }

  function findZoomOut(): HTMLElement {
    return tl.screen.getByTitle('Уменьшить масштаб');
  }

  function findZoomIn(): HTMLElement {
    return tl.screen.getByTitle('Увеличить масштаб');
  }

  function findInput(): HTMLElement {
    return tl.screen.getByRole('textbox');
  }

  function enterInputValue(value: string | number): void {
    const input = findInput();

    tl.fireEvent.change(input, {
      target: { value },
    });

    tl.fireEvent.keyUp(input, { key: 'Enter' });
  }

  test('рендерится без ошибок', () => {
    expect(render).not.toThrow();
  });

  describe('кнопка "Выровнить содержимое"', () => {
    test('срабатывает onChange по клику', () => {
      render({});

      tl.fireEvent.click(findAlign());
      expect(onAlign).toBeCalled();
    });
  });

  describe('кнопка "Уменьшить масштаб"', () => {
    test('срабатывает onChange по клику', () => {
      render({ step: 10, scale: 100 });

      tl.fireEvent.click(findZoomOut());
      expect(onChange).toBeCalledWith(90);
    });

    test('срабатывает условие minScale', () => {
      render({ step: 75, scale: 100, minScale: 50 });

      tl.fireEvent.click(findZoomOut());
      expect(onChange).toBeCalledWith(50);
    });
  });

  describe('кнопка "Увеличить масштаб"', () => {
    test('срабатывает onChange по клику', () => {
      render({ step: 10, scale: 100 });

      tl.fireEvent.click(findZoomIn());
      expect(onChange).toBeCalledWith(110);
    });

    test('срабатывает условие maxScale', () => {
      render({ step: 75, scale: 100, maxScale: 150 });

      tl.fireEvent.click(findZoomIn());
      expect(onChange).toBeCalledWith(50);
    });
  });

  describe('ввод значения через input', () => {
    test('срабатывает onChange по Enter', () => {
      const value = 50;

      render({ scale: 100 });

      enterInputValue(value);
      expect(onChange).toBeCalledWith(value);
    });

    test('срабатывает onChange при потере фокуса', () => {
      const value = 50;

      render({ scale: 100 });

      const input = findInput();

      tl.fireEvent.change(input, {
        target: { value },
      });

      tl.fireEvent.click(findAlign());

      expect(onChange).toBeCalledWith(value);
    });

    test('срабатывает условие minScale', () => {
      render({ scale: 100, minScale: 50 });

      enterInputValue(40);
      expect(onChange).toBeCalledWith(50);
    });

    test('срабатывает условие maxScale', () => {
      render({ scale: 100, maxScale: 150 });

      enterInputValue(160);
      expect(onChange).toBeCalledWith(150);
    });

    test('обработка некорректного значения #1', () => {
      render({ scale: 100 });

      enterInputValue('50 some text');
      expect(onChange).toBeCalledWith(50);
    });

    test('обработка некорректного значения #2', () => {
      render({ scale: 100, maxScale: 150 });

      enterInputValue('200 some text');
      expect(onChange).toBeCalledWith(150);
    });
  });
});

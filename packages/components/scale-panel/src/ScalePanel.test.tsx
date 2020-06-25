import React from 'react';
import * as tl from '@testing-library/react';

import { ScalePanel } from './ScalePanel';

describe('ScalePanel', () => {
  type Props = Partial<React.ComponentProps<typeof ScalePanel>>;

  let onChange = jest.fn();

  beforeEach(() => {
    onChange = jest.fn();
  });

  function render(props: Props = {}): tl.RenderResult {
    const { orientation = 'horizontal', stepScale = 10, currentScale = 100, ...rest } = props;

    return tl.render(
      <ScalePanel
        orientation={orientation}
        stepScale={stepScale}
        currentScale={currentScale}
        onChange={onChange}
        data-testid="scalePanelTestId"
        {...rest}
      />,
    );
  }

  function findZoomOut(): HTMLElement {
    return tl.screen.getByTitle('Уменьшить');
  }

  function findZoomIn(): HTMLElement {
    return tl.screen.getByTitle('Увеличить');
  }

  function findInput(): HTMLElement | null {
    return tl.screen.getByTitle('Текущий масштаб').querySelector('input');
  }

  test('рендерится без ошибок', () => {
    expect(render).not.toThrow();
  });

  test('вызывается onChange с шагом stepScale по клику кнопку "Увеличить"', () => {
    const currentScale = 50;
    const stepScale = 15;
    render({ onChange, currentScale, stepScale });

    tl.fireEvent.click(findZoomIn());
    expect(onChange).toBeCalledWith(65);
  });

  test('С шагом stepScale большим чем текущее значение масштаба по клику на кнопку "Увеличить" значение устанавливается 100', () => {
    const currentScale = 95;
    const stepScale = 15;
    render({ onChange, currentScale, stepScale });

    tl.fireEvent.click(findZoomIn());
    expect(onChange).toBeCalledWith(100);
  });

  test('вызывается onChange с шагом stepScale по клику на кнопку "Уменьшить"', () => {
    const currentScale = 50;
    const stepScale = 15;
    render({ onChange, currentScale, stepScale });

    tl.fireEvent.click(findZoomOut());
    expect(onChange).toBeCalledWith(35);
  });

  test('С шагом stepScale большим чем текущее значение масштаба по клику на кнопку "Уменьшить" значение устанавливается 0', () => {
    const currentScale = 10;
    const stepScale = 15;
    render({ onChange, currentScale, stepScale });

    tl.fireEvent.click(findZoomOut());
    expect(onChange).toBeCalledWith(0);
  });

  test('вызывается onChange с новым значением при вводе значения масштаба в текстовое поле', () => {
    const currentScale = 50;

    render({ onChange, currentScale });

    tl.fireEvent.change(findInput()!, {
      target: { value: '20' },
    });
    expect(onChange).toBeCalledWith(20);
  });
});

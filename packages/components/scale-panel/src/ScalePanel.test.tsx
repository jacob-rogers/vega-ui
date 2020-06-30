import React from 'react';
import * as tl from '@testing-library/react';

import { cnScalePanel } from './cn-scale-panel';
import { ScalePanel } from './ScalePanel';

describe('ScalePanel', () => {
  type Props = Partial<React.ComponentProps<typeof ScalePanel>>;

  let onChange = jest.fn();

  beforeEach(() => {
    onChange = jest.fn();
  });

  function render(props: Props = {}): tl.RenderResult {
    const { orientation = 'horizontal', step = 10, scale = 100, ...rest } = props;

    return tl.render(
      <ScalePanel
        orientation={orientation}
        step={step}
        scale={scale}
        onChange={onChange}
        data-testid="scalePanelTestId"
        {...rest}
      />,
    );
  }

  function findScalePanel(): HTMLElement {
    return tl.screen.getByTestId('scalePanelTestId');
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

  test('при передаче параметра horizontal строится горизонтальная панель', () => {
    const orientation = 'horizontal';
    render({ orientation });
    expect(findScalePanel()).toHaveClass(cnScalePanel({ orientation }).toString());
  });

  test('при передаче параметра vertical строится вертикальная панель', () => {
    const orientation = 'vertical';
    render({ orientation });
    expect(findScalePanel()).toHaveClass(cnScalePanel({ orientation }).toString());
  });

  test('вызывается onChange с заданным шагом по клику кнопку "Увеличить"', () => {
    const scale = 50;
    const step = 15;
    render({ onChange, scale, step });

    tl.fireEvent.click(findZoomIn());
    expect(onChange).toBeCalledWith(65);
  });

  test('вызывается onChange с заданным шагом по клику на кнопку "Уменьшить"', () => {
    const scale = 50;
    const step = 15;
    render({ onChange, scale, step });

    tl.fireEvent.click(findZoomOut());
    expect(onChange).toBeCalledWith(35);
  });

  test('вызывает inputChange при вводе значения', () => {
    render({ onChange });

    const input = findInput();

    if (input) {
      tl.fireEvent.change(input, {
        target: { value: '50' },
      });
    }

    expect(onChange).toBeCalledWith(50);
  });
});

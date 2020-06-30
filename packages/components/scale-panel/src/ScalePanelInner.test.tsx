import React from 'react';
import * as tl from '@testing-library/react';

import { cnScalePanel } from './cn-scale-panel';
import { ScalePanelInner } from './ScalePanelInner';

describe('ScalePanelInner', () => {
  type Props = Partial<React.ComponentProps<typeof ScalePanelInner>>;

  function render(props: Props = {}): tl.RenderResult {
    const {
      onZoomIn = jest.fn(),
      onZoomOut = jest.fn(),
      onInputValueChange = jest.fn(),
      onExpand = jest.fn(),
      onWidthMove = jest.fn(),
      scale = 100,
      step = 10,
      orientation = 'horizontal',
      ...rest
    } = props;
    return tl.render(
      <ScalePanelInner
        data-testid="scalePanelInnerTestId"
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onExpand={onExpand}
        onWidthMove={onWidthMove}
        onInputValueChange={onInputValueChange}
        step={step}
        scale={scale}
        orientation={orientation}
        {...rest}
      />,
    );
  }

  function findScalePanel(): HTMLElement {
    return tl.screen.getByTestId('scalePanelInnerTestId');
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

  test('вызывает onZoomIn по клику', () => {
    const onZoomIn = jest.fn();
    render({ onZoomIn });
    tl.fireEvent.click(findZoomIn());
    expect(onZoomIn).toBeCalledTimes(1);
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

  test('вызывает onZoomOut по клику', () => {
    const onZoomOut = jest.fn();
    render({ onZoomOut });
    tl.fireEvent.click(findZoomOut());
    expect(onZoomOut).toBeCalledTimes(1);
  });

  test('вызывает inputChange при вводе значения', () => {
    const onInputValueChange = jest.fn();

    render({ onInputValueChange });

    const input = findInput();

    if (input) {
      tl.fireEvent.change(input, {
        target: { value: '50' },
      });
    }

    expect(onInputValueChange).toBeCalledWith(50);
  });
});

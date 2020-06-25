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
      inputChange = jest.fn(),
      onExpand = jest.fn(),
      onWidthMove = jest.fn(),
      currentScale = 100,
      stepScale = 10,
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
        inputChange={inputChange}
        currentScale={currentScale}
        stepScale={stepScale}
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
    const inputChange = jest.fn();

    render({ inputChange });

    tl.fireEvent.change(findInput()!, {
      target: { value: '50' },
    });
    expect(inputChange).toBeCalledWith(50);
  });
});

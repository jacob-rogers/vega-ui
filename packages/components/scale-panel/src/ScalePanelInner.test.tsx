import React from 'react';
import * as tl from '@testing-library/react';

import { ScalePanelView as ScalePanelInner } from './ScalePanelInner';

describe('ScalePanelInner', () => {
  type Props = Partial<React.ComponentProps<typeof ScalePanelInner>>;

  function render(props: Props = {}): tl.RenderResult {
    const {
      onZoomIn = jest.fn(),
      onZoomOut = jest.fn(),
      inputChange = jest.fn(),
      currentScale = 100,
      orientation = 'horizontal',
      ...rest
    } = props;
    return tl.render(
      <ScalePanelInner
        data-testid="scalePanelInnerTestId"
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        inputChange={inputChange}
        currentScale={currentScale}
        orientation={orientation}
        {...rest}
      />,
    );
  }

  function findScalePanelInner(): Element | null {
    return document.querySelector('.VegaScalePanel');
  }

  function findZoomOut(): HTMLElement {
    return tl.screen.getByTitle('Уменьшить');
  }

  function findZoomIn(): HTMLElement {
    return tl.screen.getByTitle('Увеличить');
  }

  function findInputChange(): HTMLElement | null {
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
    expect(findScalePanelInner()!).toHaveStyle('flex-direction: row;');
  });

  test('при передаче параметра vertical строится вертикальная панель', () => {
    const orientation = 'vertical';
    render({ orientation });
    expect(findScalePanelInner()!).toHaveStyle('flex-direction: column;');
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

    tl.fireEvent.change(findInputChange()!, {
      target: { value: '50' },
    });
    expect(inputChange).toBeCalledWith(50);
  });
});

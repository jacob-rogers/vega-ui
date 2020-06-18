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
    const { orientation = 'horizontal', currentScale = 100, ...rest } = props;

    return tl.render(
      <ScalePanel
        orientation={orientation}
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

  function findInputChange(): HTMLElement | null {
    return tl.screen.getByTitle('Текущий масштаб').querySelector('input');
  }

  test('рендерится без ошибок', () => {
    expect(render).not.toThrow();
  });

  test('вызывается onChange с шагом по клику кнопку "Увеличить"', () => {
    const currentScale = 50;
    render({ onChange, currentScale });

    tl.fireEvent.click(findZoomIn());
    expect(onChange).toBeCalledWith(60);
  });

  test('вызывается onChange с шагом по клику на кнопку "Уменьшить"', () => {
    const currentScale = 50;
    render({ onChange, currentScale });

    tl.fireEvent.click(findZoomOut());
    expect(onChange).toBeCalledWith(40);
  });

  test('вызывается onChange с новым значением при вводе значения масштаба в текстовое поле', () => {
    const currentScale = 50;

    render({ onChange, currentScale });

    tl.fireEvent.change(findInputChange()!, {
      target: { value: '20' },
    });
    expect(onChange).toBeCalledWith(20);
  });
});

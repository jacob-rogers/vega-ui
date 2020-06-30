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

  function findZoomOut(): HTMLElement {
    return tl.screen.getByTitle('Уменьшить');
  }

  function findZoomIn(): HTMLElement {
    return tl.screen.getByTitle('Увеличить');
  }

  test('рендерится без ошибок', () => {
    expect(render).not.toThrow();
  });

  test('вызывается onChange с шагом stepScale по клику кнопку "Увеличить"', () => {
    const scale = 50;
    const step = 15;
    render({ onChange, scale, step });

    tl.fireEvent.click(findZoomIn());
    expect(onChange).toBeCalledWith(65);
  });

  test('вызывается onChange с шагом stepScale по клику на кнопку "Уменьшить"', () => {
    const scale = 50;
    const step = 15;
    render({ onChange, scale, step });

    tl.fireEvent.click(findZoomOut());
    expect(onChange).toBeCalledWith(35);
  });
});

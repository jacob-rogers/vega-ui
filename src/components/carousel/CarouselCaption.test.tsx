import React from 'react';
import * as tl from '@testing-library/react';

import { CarouselCaptionView as CarouselCaption } from './CarouselCaption';
import { CarouselContext, defaultContext } from './context';

describe('CarouselCaption', () => {
  type Props = Partial<React.ComponentProps<typeof CarouselCaption>>;

  const caption = 'test caption';

  function render(props: Props = {}): tl.RenderResult {
    return tl.render(
      <CarouselContext.Provider value={{ ...defaultContext, testId: 'Carousel' }}>
        <CarouselCaption caption={caption} {...props} />
      </CarouselContext.Provider>,
    );
  }

  function findCaption(value = caption): HTMLElement {
    return tl.screen.getByText(value);
  }

  test('рендерится без ошибок', () => {
    expect(render).not.toThrow();
  });

  test('ничего не рендерится, если не передан caption', () => {
    const { container } = render({ caption: undefined });
    expect(container).toBeEmptyDOMElement();
  });

  test('выводится caption', () => {
    render();
    expect(findCaption()).toBeInTheDocument();
  });

  test('передается className', () => {
    const className = 'test';
    render({ className });
    expect(findCaption()).toHaveClass(className);
  });
});

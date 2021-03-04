import React from 'react';
import * as tl from '@testing-library/react';

import { CarouselSlideView as CarouselSlide } from './CarouselSlide';
import { CarouselContext, defaultContext } from './context';

describe('CarouselSlide', () => {
  type Props = Partial<React.ComponentProps<typeof CarouselSlide>>;

  const onPointerEnter = jest.fn();
  const onPointerLeave = jest.fn();

  beforeEach(() => {
    onPointerEnter.mockClear();
    onPointerLeave.mockClear();
  });

  function render(props: Props = {}): tl.RenderResult {
    return tl.render(
      <CarouselContext.Provider value={{ ...defaultContext, testId: 'Carousel' }}>
        <CarouselSlide {...props} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
          content
        </CarouselSlide>
      </CarouselContext.Provider>,
    );
  }

  function findSlide(): HTMLElement {
    return tl.screen.getByRole('figure');
  }

  test('рендерится без ошибок', () => {
    expect(render).not.toThrow();
  });

  test('вызывается onPointerEnter', () => {
    render();
    const slide = findSlide();
    tl.fireEvent.mouseEnter(slide);
    expect(onPointerEnter).toBeCalledTimes(1);
    onPointerEnter.mockClear();
    tl.fireEvent.touchStart(slide);
    expect(onPointerEnter).toBeCalledTimes(1);
  });

  test('вызывается onPointerLeave', () => {
    render();
    const slide = findSlide();
    tl.fireEvent.mouseLeave(slide);
    expect(onPointerLeave).toBeCalledTimes(1);
    onPointerLeave.mockClear();
    tl.fireEvent.touchEnd(slide);
    expect(onPointerLeave).toBeCalledTimes(1);
  });

  test('передаётся класс', () => {
    const className = 'slide';

    render({ className });

    expect(findSlide().classList.contains(className)).toBe(true);
  });
});

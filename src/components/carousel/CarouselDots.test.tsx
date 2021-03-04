import React from 'react';
import * as tl from '@testing-library/react';

import { CarouselDotsView as CarouselDots } from './CarouselDots';
import { CarouselContext, defaultContext, Slide } from './context';

describe('CarouselDots', () => {
  type Props = Partial<React.ComponentProps<typeof CarouselDots>>;

  const slide1: Slide = { idx: 0, caption: 'caption 1' };
  const slide2: Slide = { idx: 1, caption: 'caption 2' };
  const slides: Slide[] = [slide1, slide2];

  function render(props: Props = {}): tl.RenderResult {
    return tl.render(
      <CarouselContext.Provider value={{ ...defaultContext, testId: 'Carousel' }}>
        <CarouselDots activeIdx={0} slides={slides} onChange={jest.fn()} {...props} />
      </CarouselContext.Provider>,
    );
  }

  function findDotForSlide(slide: Slide): HTMLElement {
    return tl.screen.getAllByRole('tab')[slide.idx];
  }

  test('рендерится без ошибок', () => {
    expect(render).not.toThrow();
  });

  test('ничего не рендерится, если слайдов меньше двух', () => {
    let wrapper = render({ slides: [slide1] });
    expect(wrapper.container.firstChild).toBe(null);
    wrapper = render({ slides: [slide1] });
    expect(wrapper.container.firstChild).toBe(null);
    wrapper = render({ slides: [slide1, slide2] });
    expect(wrapper.container.firstChild).not.toBe(null);
  });

  test('добавляется className для контейнера', () => {
    const className = 'test';
    const { container } = render({ className });
    expect(container.firstElementChild?.classList.contains(className)).toBe(true);
  });

  test('добавляется dotClassName для всех кнопок', () => {
    render({ dotClassName: 'test' });
    expect(slides.length > 1).toBe(true);
    slides.forEach((slide) => {
      expect(findDotForSlide(slide).classList.contains('test')).toBe(true);
    });
  });

  test('добавляется is-active для активной точки', () => {
    const [, slide] = slides;
    render({ activeIdx: 1, slides });
    expect(findDotForSlide(slide).classList.contains('is-active'));
  });

  test('onChange вызывается с индексом элемента', () => {
    const index = 0;
    const slide = slides[index];
    const onChange = jest.fn();

    render({ slides, onChange });

    tl.fireEvent.click(findDotForSlide(slide));

    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith(index);
  });
});

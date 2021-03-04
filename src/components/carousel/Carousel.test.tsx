import React from 'react';
import * as tl from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import { Carousel } from './Carousel';
import { useAutoplay } from './CarouselManager';
import { CarouselContext, defaultContext, useSlide } from './context';

describe('Carousel', () => {
  type CarouselProps = React.ComponentProps<typeof Carousel>;
  type CarouselTestProps = Partial<Omit<CarouselProps, 'children'>>;
  interface Props extends CarouselTestProps {
    slides?: { caption?: string; content: string }[];
  }

  let onChange = jest.fn();

  beforeEach(() => {
    onChange = jest.fn();
  });

  const defaultSlides = [
    { caption: 'caption 1', content: 'slide 1' },
    { caption: 'caption 2', content: 'slide 2' },
    { content: 'slide 3' },
  ];

  function render(props: Props = {}): tl.RenderResult {
    const {
      slides = defaultSlides,
      arrowPrevLabel = 'prev',
      arrowNextLabel = 'next',
      ...rest
    } = props;

    return tl.render(
      <Carousel
        currentIdx={0}
        onChange={onChange}
        arrowNextLabel={arrowNextLabel}
        arrowPrevLabel={arrowPrevLabel}
        {...rest}
      >
        {slides.map((slide) => (
          <Carousel.Slide caption={slide.caption} key={slide.content}>
            {slide.content}
          </Carousel.Slide>
        ))}
      </Carousel>,
    );
  }

  const findDots = (): HTMLElement => tl.screen.getByRole('tablist');
  const findDot = (idx: number): HTMLElement => tl.screen.getAllByRole('tab')[idx];
  const findPrevArrow = (): HTMLElement => tl.screen.getByLabelText('prev');
  const findNextArrow = (): HTMLElement => tl.screen.getByLabelText('next');
  const findSlide = (): HTMLElement => tl.screen.getByRole('figure');

  test('рендерится без ошибок', () => {
    expect(render).not.toThrow();
  });

  test('ничего не рендерится, если нет слайдов', () => {
    const { container } = render({ slides: [] });
    expect(container.childElementCount).toBe(0);
  });

  test('при некорректном currentIdx ничего не рендерится', () => {
    const { container } = render({ currentIdx: 5 });

    expect(container.childElementCount).toBe(0);
  });

  test('рендерит стрелки только если передан arrows=true', () => {
    render({ arrows: false });
    expect(findNextArrow).toThrow();
    expect(findPrevArrow).toThrow();
    render({ arrows: true });
    expect(findPrevArrow).not.toThrow();
    expect(findNextArrow).not.toThrow();
  });

  test('рендерит точки только если передан dots=true', () => {
    render({ dots: false });
    expect(findDots).toThrow();

    render({ dots: true });
    expect(findDots).not.toThrow();
  });

  test('вызывается onChange по клику на точку', () => {
    render({ dots: true, onChange });

    const dot = findDot(1);
    tl.fireEvent.click(dot);
    expect(onChange).toBeCalledWith(1);

    tl.fireEvent.click(findDot(0));

    expect(onChange).toBeCalledWith(0);
  });

  test('вызывается onChange по клику на стрелку', () => {
    const current = 0;
    const nextIdx = 1;
    const prevIdx = 2;
    render({ currentIdx: current, arrows: true });

    const prev = findPrevArrow();
    const next = findNextArrow();

    tl.fireEvent.click(prev);
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith(prevIdx);

    tl.fireEvent.click(next);
    expect(onChange).toBeCalledTimes(2);
    expect(onChange).toBeCalledWith(nextIdx);
  });

  describe('autoPlay', () => {
    jest.useFakeTimers();
    const autoPlay = 1000;

    test('изменяет слайд автоматически', () => {
      render({ autoPlay });
      jest.advanceTimersByTime(autoPlay);
      expect(onChange).toBeCalledTimes(1);
    });

    test.each([0, Infinity, -Infinity])('игнорирует значение %d', (timeout) => {
      render({ autoPlay: timeout });
      jest.runOnlyPendingTimers();
      expect(onChange).toBeCalledTimes(0);
    });

    test('при наведении на слайд автовоспроизведение останавливается', () => {
      render({ autoPlay });

      const slide = findSlide();

      tl.act(() => {
        tl.fireEvent.mouseEnter(slide);
        jest.advanceTimersByTime(autoPlay);
      });

      expect(onChange).not.toBeCalled();

      tl.act(() => {
        tl.fireEvent.mouseLeave(slide);
        jest.advanceTimersByTime(autoPlay);
      });

      expect(onChange).toBeCalledTimes(1);
    });
  });
});

describe('use-slide', () => {
  test('корректно возвращает слайд', () => {
    const slide = { idx: 0 };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CarouselContext.Provider value={{ ...defaultContext, currentIdx: 0, slides: [slide] }}>
        {children}
      </CarouselContext.Provider>
    );

    const { result } = renderHook(() => useSlide(0), { wrapper });

    expect(result.current).toEqual({
      active: true,
      idx: 0,
      caption: '',
    });
  });
});

describe('use-autoplay', () => {
  const interval = 1000;

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  test('вызывает callback', () => {
    const handleNext = jest.fn();
    renderHook(() => useAutoplay({ idx: 0, onNext: handleNext, interval }));

    jest.advanceTimersByTime(interval);

    expect(handleNext).toBeCalled();
  });

  test('выставляет паузу', () => {
    const handleNext = jest.fn();
    const { result } = renderHook(() => useAutoplay({ idx: 0, onNext: handleNext, interval }));

    act(() => {
      result.current.pause();
    });

    expect(result.current.isPaused()).toBeTruthy();

    jest.advanceTimersByTime(interval);

    expect(handleNext).not.toBeCalled();
  });

  test('возобновляет воспроизведение', () => {
    const handleNext = jest.fn();
    const { result } = renderHook(() => useAutoplay({ idx: 0, onNext: handleNext, interval }));

    act(() => {
      result.current.pause();
    });

    act(() => {
      result.current.resume();
    });

    expect(result.current.isPaused()).not.toBeTruthy();

    jest.advanceTimersByTime(interval);

    expect(handleNext).toBeCalled();
  });
});

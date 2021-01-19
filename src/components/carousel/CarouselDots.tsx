import React from 'react';

import { b, Slide, useCarousel } from './context';

interface CarouselDotsProps {
  className?: string;
  dotClassName?: string;
  dotsLabel?: string;
}
interface CarouselDotsViewProps extends CarouselDotsProps {
  activeIdx: number;
  slides: Slide[];
  onChange(idx: number): void;
}

export const CarouselDotsView: React.FC<CarouselDotsViewProps> = (props) => {
  const { slides, activeIdx, className, dotClassName, dotsLabel, onChange } = props;
  const { testId } = useCarousel();

  if (slides.length < 2) {
    return null;
  }

  return (
    <div
      role="tablist"
      aria-label={dotsLabel ?? 'Навигация по слайдам'}
      className={b('Dots').mix(className).toString()}
    >
      {slides.map((slide) => (
        <button
          key={slide.idx}
          role="tab"
          type="button"
          className={b('Dot', { active: slide.idx === activeIdx })
            .mix(dotClassName)
            .toString()}
          aria-label={`Показать слайд ${slide.idx + 1}`}
          aria-selected={slide.idx === activeIdx}
          aria-controls="slide"
          onClick={(): void => onChange(slide.idx)}
          data-testid={testId && `${testId}:dot:${slide.idx}`}
        />
      ))}
    </div>
  );
};

export const CarouselDots: React.FC<CarouselDotsProps> = (props) => {
  const carousel = useCarousel();
  return (
    <CarouselDotsView
      {...props}
      slides={carousel.slides}
      activeIdx={carousel.currentIdx}
      onChange={carousel.to}
    />
  );
};

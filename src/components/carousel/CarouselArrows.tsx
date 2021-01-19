import React from 'react';

import { Button } from '../button';
import { IconArrowLeft, IconArrowRight } from '../icons';

import { b, useCarousel } from './context';

interface CarouselArrowsProps {
  nextLabel?: string;
  prevLabel?: string;
  nextClassName?: string;
  prevClassName?: string;
}

interface CarouselArrowsViewProps extends CarouselArrowsProps {
  onNext(): void;
  onPrev(): void;
}

export const CarouselArrowsView: React.FC<CarouselArrowsViewProps> = (props) => {
  const { nextLabel, prevLabel, nextClassName, prevClassName, onPrev, onNext } = props;
  const { testId } = useCarousel();
  return (
    <>
      <Button
        title={prevLabel}
        aria-label={prevLabel ?? 'Предыдущий слайд'}
        onlyIcon
        iconLeft={IconArrowLeft}
        className={b('Arrow', { position: 'left' }).mix(prevClassName).toString()}
        size="l"
        view="clear"
        onClick={onPrev}
        data-testid={testId && `${testId}:button:prevSlide`}
      />
      <Button
        title={nextLabel}
        aria-label={nextLabel ?? 'Следующий слайд'}
        iconLeft={IconArrowRight}
        className={b('Arrow', { position: 'right' }).mix(nextClassName).toString()}
        size="l"
        view="clear"
        onClick={onNext}
        data-testid={testId && `${testId}:button:nextSlide`}
      />
    </>
  );
};

export const CarouselArrows: React.FC<CarouselArrowsProps> = (props) => {
  const { prev, next } = useCarousel();
  return <CarouselArrowsView {...props} onPrev={prev} onNext={next} />;
};

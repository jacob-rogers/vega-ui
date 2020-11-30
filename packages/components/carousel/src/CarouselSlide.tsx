import React from 'react';

import { b, useCarousel } from './context';

export interface CarouselSlideProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

interface CarouselSlideViewProps extends CarouselSlideProps {
  onPointerEnter(): void;
  onPointerLeave(): void;
}

export const CarouselSlideView: React.FC<CarouselSlideViewProps> = (props) => {
  const { className, children, onPointerEnter, onPointerLeave, ...rest } = props;
  const { testId, currentIdx } = useCarousel();

  return (
    <div
      {...rest}
      role="figure"
      className={b('Slide').mix(className).toString()}
      onMouseEnter={onPointerEnter}
      onMouseLeave={onPointerLeave}
      onTouchStart={onPointerEnter}
      onTouchEnd={onPointerLeave}
      data-testId={testId && `${testId}:slide:${currentIdx}`}
    >
      {children}
    </div>
  );
};

export const CarouselSlide: React.FC<CarouselSlideProps> = (props) => {
  const { autoPlay } = useCarousel();

  return (
    <CarouselSlideView
      {...props}
      onPointerEnter={autoPlay.pause}
      onPointerLeave={autoPlay.resume}
    />
  );
};

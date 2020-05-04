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

  return (
    <div
      {...rest}
      role="figure"
      className={b('Slide').mix(className).toString()}
      onMouseEnter={onPointerEnter}
      onMouseLeave={onPointerLeave}
      onTouchStart={onPointerEnter}
      onTouchEnd={onPointerLeave}
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

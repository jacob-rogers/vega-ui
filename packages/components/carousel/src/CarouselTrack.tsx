import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { CarouselSlide } from './CarouselSlide';
import { b, useCarousel } from './context';

interface CarouselTrackProps {
  className?: string;
  children: React.ReactElement<typeof CarouselSlide>;
}

export const CarouselTrack: React.FC<CarouselTrackProps> = (props) => {
  const { className, children } = props;
  const { currentIdx, direction } = useCarousel();

  return (
    <TransitionGroup className={b('Track', { direction }).mix(className).toString()}>
      <CSSTransition key={currentIdx} classNames="is" timeout={{ enter: 300, exit: 300 }}>
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

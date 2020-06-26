import React, { useContext } from 'react';
import { block } from 'bem-cn';

export const b = block('VegaCarousel');

export interface Slide {
  idx: number;
  caption: string;
}

export interface AutoPlayAPI {
  pause(): void;
  resume(): void;
  isPaused(): boolean;
}

export interface CarouselAPI {
  currentIdx: number;
  direction: 'prev' | 'next';
  slides: Slide[];
  autoPlay: AutoPlayAPI;
  to: (idx: number) => void;
  next: () => void;
  prev: () => void;
}

const noop = (): void => {};

export const CarouselContext = React.createContext<CarouselAPI>({
  currentIdx: 0,
  direction: 'next',
  slides: [],
  to: noop,
  next: noop,
  prev: noop,
  autoPlay: {
    pause: noop,
    resume: noop,
    isPaused: (): boolean => true,
  },
});

export function useCarousel(): CarouselAPI {
  return useContext(CarouselContext);
}

interface SlideAPI {
  idx: number;
  active: boolean;
  caption: string;
}

export function useSlide(idx?: number): SlideAPI {
  const carousel = useCarousel();
  const slideIdx = idx !== undefined ? idx : carousel.currentIdx;
  const slide = carousel.slides[slideIdx];

  return {
    idx: slideIdx,
    active: carousel.currentIdx === slideIdx,
    caption: slide?.caption ?? '',
  };
}

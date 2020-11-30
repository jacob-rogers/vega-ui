import React, { useEffect, useRef, useState } from 'react';

import { AutoPlayAPI, CarouselAPI, CarouselContext, Slide as ContextSlide } from './context';

export type Slide = ContextSlide;

interface CarouselManagerProps {
  currentIdx: number;
  slides: Slide[];
  autoPlay?: number;
  onChange: (idx: number) => void;
  testId?: string;
}

function useCallbackRef<T>(value: T): React.MutableRefObject<T> {
  const ref = useRef<T>(value);
  ref.current = value;

  return ref;
}

interface AutoPlayOptions {
  idx: number;
  interval: number;
  onNext(): void;
}

function useAutoplay({ interval, idx, onNext }: AutoPlayOptions): AutoPlayAPI {
  const callbackRef = useCallbackRef(onNext);
  const interavalIDRef = useRef<null | ReturnType<typeof setInterval>>(null);
  const [isPaused, setPause] = useState<boolean>(false);

  useEffect(() => {
    if (interval === 0 || Math.abs(interval) === Infinity) {
      return undefined;
    }

    interavalIDRef.current = setInterval(() => {
      if (isPaused) {
        return;
      }

      callbackRef.current();
    }, interval);

    return (): void => {
      if (interavalIDRef.current !== null) {
        clearInterval(interavalIDRef.current);
        interavalIDRef.current = null;
      }
    };
  }, [idx, interval, isPaused, callbackRef]);

  return {
    pause(): void {
      setPause(true);
    },
    resume(): void {
      setPause(false);
    },
    isPaused(): boolean {
      return isPaused;
    },
  };
}

export const CarouselManager: React.FC<CarouselManagerProps> = (props) => {
  const { currentIdx, slides, children, autoPlay = 0, onChange, testId } = props;
  const total = slides.length;

  const dir = useRef<CarouselAPI['direction']>('next');

  function prev(): void {
    onChange((total + (currentIdx - 1)) % total);
    dir.current = 'prev';
  }
  function next(): void {
    onChange((currentIdx + 1) % total);
    dir.current = 'next';
  }

  function to(idx: number): void {
    dir.current = idx > currentIdx ? 'next' : 'prev';
    onChange(idx);
  }

  const autoPlayApi = useAutoplay({ idx: currentIdx, interval: autoPlay, onNext: next });

  const value: CarouselAPI = {
    slides,
    direction: dir.current,
    currentIdx,
    autoPlay: autoPlayApi,
    to,
    prev,
    next,
    testId,
  };

  return <CarouselContext.Provider value={value}>{children}</CarouselContext.Provider>;
};

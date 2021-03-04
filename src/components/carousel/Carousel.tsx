import React from 'react';

import { CarouselArrows } from './CarouselArrows';
import { CarouselCaption } from './CarouselCaption';
import { CarouselDots } from './CarouselDots';
import { CarouselManager, Slide as ManagerSlide } from './CarouselManager';
import { CarouselSlide, CarouselSlideProps } from './CarouselSlide';
import { CarouselTrack } from './CarouselTrack';
import { b } from './context';

import './Carousel.css';

interface SlideProps extends CarouselSlideProps {
  caption?: string;
}

// istanbul ignore next
const Slide: React.FC<SlideProps> = () => {
  return null;
};

type Child = React.ReactElement<SlideProps>;

interface CarouselProps extends Omit<React.ComponentProps<typeof CarouselManager>, 'slides'> {
  currentIdx: number;
  arrows?: boolean;
  arrowNextLabel?: string;
  arrowPrevLabel?: string;
  arrowNextClassName?: string;
  arrowPrevClassName?: string;
  captionClassName?: string;
  trackClassName?: string;
  dots?: boolean;
  dotsLabel?: string;
  dotsContainerClassName?: string;
  dotClassName?: string;
  className?: string;
  children: Child | Child[];
  onChange: (idx: number) => void;
  testId?: string;
}

interface CarouselComponent<P> extends React.FC<P> {
  Slide: typeof Slide;
}

export const Carousel: CarouselComponent<CarouselProps> = (props) => {
  const {
    className,
    arrows = true,
    arrowNextLabel,
    arrowPrevLabel,
    arrowNextClassName,
    arrowPrevClassName,
    captionClassName,
    trackClassName,
    dots = true,
    dotsLabel,
    dotsContainerClassName,
    dotClassName,
    children,
    currentIdx,
    autoPlay,
    onChange,
    testId,
  } = props;

  const slides: ManagerSlide[] = [];
  const slidesProps: CarouselSlideProps[] = [];

  React.Children.forEach(children, (child: Child, index) => {
    const { caption, ...rest } = child.props;
    slides.push({
      idx: index,
      caption: caption ?? '',
    });

    slidesProps.push(rest);
  });

  if (slides.length === 0) {
    return null;
  }

  const currentSlideProps = slidesProps[currentIdx];

  if (currentSlideProps === undefined) {
    return null;
  }

  return (
    <CarouselManager
      currentIdx={currentIdx}
      slides={slides}
      autoPlay={autoPlay}
      onChange={onChange}
      testId={testId}
    >
      <div className={b.mix(className).toString()} data-testid={testId}>
        <div className={b('Container').toString()}>
          {arrows && (
            <CarouselArrows
              prevLabel={arrowPrevLabel}
              nextLabel={arrowNextLabel}
              prevClassName={arrowPrevClassName}
              nextClassName={arrowNextClassName}
            />
          )}
          <CarouselTrack className={trackClassName}>
            <CarouselSlide {...currentSlideProps} />
          </CarouselTrack>
        </div>
        <CarouselCaption className={captionClassName} />
        {dots && (
          <CarouselDots
            dotsLabel={dotsLabel}
            className={dotsContainerClassName}
            dotClassName={dotClassName}
          />
        )}
      </div>
    </CarouselManager>
  );
};

Carousel.Slide = Slide;

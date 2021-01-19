import React from 'react';

import { Text } from '../text';

import { b, useCarousel, useSlide } from './context';

interface CarouselCaptionProps {
  className?: string;
}

interface CarouselCaptionViewProps extends CarouselCaptionProps {
  caption?: string;
}

export const CarouselCaptionView: React.FC<CarouselCaptionViewProps> = (props) => {
  const { caption = '', className } = props;
  const { testId, currentIdx } = useCarousel();

  if (caption === '') {
    return null;
  }

  return (
    <Text
      size="l"
      lineHeight="xs"
      view="secondary"
      className={b('Caption').mix(className).toString()}
      data-testid={testId && `${testId}:caption:${currentIdx}`}
    >
      {caption}
    </Text>
  );
};

export const CarouselCaption: React.FC<CarouselCaptionProps> = () => {
  const { caption } = useSlide();
  return <CarouselCaptionView caption={caption} />;
};

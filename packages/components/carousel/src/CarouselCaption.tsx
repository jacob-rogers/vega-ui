import React from 'react';
import { Text } from '@gpn-prototypes/vega-text';

import { b, useSlide } from './context';

interface CarouselCaptionProps {
  className?: string;
}

interface CarouselCaptionViewProps extends CarouselCaptionProps {
  caption?: string;
}

export const CarouselCaptionView: React.FC<CarouselCaptionViewProps> = (props) => {
  const { caption = '', className } = props;

  if (caption === '') {
    return null;
  }

  return (
    <Text
      size="l"
      lineHeight="xs"
      view="secondary"
      className={b('Caption').mix(className).toString()}
    >
      {caption}
    </Text>
  );
};

export const CarouselCaption: React.FC<CarouselCaptionProps> = () => {
  const { caption } = useSlide();
  return <CarouselCaptionView caption={caption} />;
};

/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { action } from '@storybook/addon-actions';
import { number, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { ScalePanel } from './ScalePanel';
import { OrientationProps } from './ScalePanelInner';

const stories = storiesOf('ui/ScalePanel', module).addParameters({
  metadata: { author: 'CSSSR', status: 'Approved' },
});

interface StoryProps extends OrientationProps {
  currentScale: number;
  stepScale: number;
  onChange(scale: number): void;
}

function useStoryProps(): StoryProps {
  const [currentScale, setCurrentScale] = React.useState(100);
  const stepScale = number(
    'stepScale',
    10,
    {
      min: 1,
      max: 100,
      range: true,
      step: 1,
    },
    'ScalePanel',
  );
  const onChange = action('onChange');

  const orientation = select('orientation', ['vertical', 'horizontal'], 'horizontal', 'ScalePanel');

  const handleChange = (scale: number): void => {
    setCurrentScale(scale);
    onChange(scale);
  };

  return {
    orientation,
    currentScale,
    stepScale,
    onChange: handleChange,
  };
}

stories.addDecorator(withKnobs).add('по умолчанию', () => {
  const props = useStoryProps();
  return <ScalePanel {...props} />;
});

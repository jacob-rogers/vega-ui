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
  onChangeStep(step: number): void;
}

function useStoryProps(): StoryProps {
  const [currentScale, setCurrentScale] = React.useState(100);
  const [stepScaleMock, setStepScale] = React.useState(10);
  const stepScale = number(
    'stepScale',
    stepScaleMock,
    {
      min: 1,
      max: 100,
      range: true,
      step: 1,
    },
    'stepScale',
  );
  const onChange = action('onChange');
  const onChangeStep = action('onChangeStep');

  const orientation = select('orientation', ['vertical', 'horizontal'], 'horizontal');

  const handleChange = (scale: number): void => {
    setCurrentScale(scale);
    onChange(scale);
  };

  const handleChangeStep = (step: number): void => {
    setStepScale(step);
    onChangeStep(step);
  };

  return {
    orientation,
    currentScale,
    stepScale,
    onChange: handleChange,
    onChangeStep: handleChangeStep,
  };
}

stories.addDecorator(withKnobs).add('Панель масштаба', () => {
  const props = useStoryProps();
  return <ScalePanel {...props} />;
});

/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { action } from '@storybook/addon-actions';
import { select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { ScalePanel } from './ScalePanel';
import { OrientationProps } from './ScalePanelInner';

const stories = storiesOf('ui/ScalePanel', module).addParameters({
  metadata: { author: 'CSSSR', status: 'Approved' },
});

interface StoryProps extends OrientationProps {
  currentScale: number;
  onChange(scale: number): void;
}

function useStoryProps(): StoryProps {
  const [currentScale, setCurrentScale] = React.useState(100);

  const onChange = action('onChange');

  const orientation = select('orientation', ['vertical', 'horizontal'], 'horizontal');

  const handleChange = (scale: number): void => {
    setCurrentScale(scale);
    onChange(scale);
  };

  return {
    orientation,
    currentScale,
    onChange: handleChange,
  };
}

stories.addDecorator(withKnobs).add('Панель масштаба', () => {
  const props = useStoryProps();
  return <ScalePanel {...props} />;
});

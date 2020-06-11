/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { action } from '@storybook/addon-actions';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { ScalePanel } from './ScalePanel';

const stories = storiesOf('ui/ScalePanel', module).addParameters({
  metadata: { author: 'CSSSR', status: 'Approved' },
});

interface StoryProps {
  currentScale: number;
  columnPanel: boolean;
  onChange(scale: number): void;
}

function useStoryProps(): StoryProps {
  const [currentScale, setCurrentScale] = React.useState(100);

  const onChange = action('onChange');

  const columnPanel = boolean('columnPanel', false);

  const handleChange = (scale: number): void => {
    setCurrentScale(scale);
    onChange(scale);
  };

  return {
    columnPanel,
    currentScale,
    onChange: handleChange,
  };
}

// const Container = styled.div`
//   width: 100%;
//   max-width: 200px;
//   margin-left: auto;
//   margin-right: auto;
//   height: 100%;
//   display: flex;
//   align-items: center;
// `;
//
// stories.addDecorator(story => {
//   return <Container>{story()}</Container>;
// });

stories.addDecorator(withKnobs).add('Панель масштаба', () => {
  const props = useStoryProps();
  return <ScalePanel {...props} />;
});

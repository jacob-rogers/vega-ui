/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import { ScalePanel } from './ScalePanel';

const stories = storiesOf('ui/ScalePanel', module).addParameters({
  metadata: { author: 'CSSSR', status: 'Approved' },
});

interface StoryProps {
  currentScale: number;
  onChange(scale: number): void;
}

function useStoryProps(): StoryProps {
  const [currentScale, setCurrentScale] = React.useState(100);

  const onChange = action('onChange');

  const handleChange = (scale: number): void => {
    setCurrentScale(scale);
    onChange(scale);
  };

  return {
    currentScale,
    onChange: handleChange,
  };
}

const Container = styled.div`
  width: 100%;
  max-width: 989px;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  display: flex;
  align-items: center;
`;

stories.addDecorator((story) => {
  return <Container>{story()}</Container>;
});

stories.add('Панель масштаба', () => {
  const props = useStoryProps();
  return <ScalePanel {...props} />;
});

import React from 'react';
import { action } from '@storybook/addon-actions';
import { number, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { ScalePanel } from './ScalePanel';
import { OrientationProps } from './ScalePanelInner';

const stories = storiesOf('ui/ScalePanel', module).addParameters({
  metadata: {
    author: 'GPN',
    status: 'Draft',
    link: {
      href:
        'https://github.com/gpn-prototypes/vega-ui/blob/master/packages/components/scale-panel/README.md',
      text: 'Документация',
    },
  },
});

type StoryProps = OrientationProps & React.ComponentProps<typeof ScalePanel>;

function useStoryProps(): StoryProps {
  const [scale, setCurrentScale] = React.useState(100);
  const step = number('step', 10, {
    min: 1,
    max: 100,
    range: true,
    step: 1,
  });
  const onChange = action('onChange');

  const orientation = select('orientation', ['vertical', 'horizontal'], 'horizontal');

  const handleChange = (newScale: number): void => {
    if (newScale > 100 && newScale < 0) return;
    setCurrentScale(newScale);
    onChange(newScale);
  };

  return {
    orientation,
    scale,
    step,
    onChange: handleChange,
  };
}

stories.add('по умолчанию', () => {
  const props = useStoryProps();
  return <ScalePanel {...props} />;
});

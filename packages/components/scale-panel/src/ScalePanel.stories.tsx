import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { ScalePanel } from './ScalePanel';

const stories = storiesOf('ui/ScalePanel', module).addParameters({
  metadata: {
    author: 'CSSSR',
    status: 'Approved',
    link: {
      href:
        'https://github.com/gpn-prototypes/vega-ui/blob/master/packages/components/scale-panel/README.md',
      text: 'Документация',
    },
  },
});

type StoryProps = React.ComponentProps<typeof ScalePanel>;

function useStoryProps(): StoryProps {
  const step = number('step', 10, {
    min: 1,
    max: 100,
    range: true,
    step: 1,
  });
  const minScale = number('minScale', 20);
  const maxScale = number('maxScale', 150);
  const onAlign = action('onAlign');

  const [scale, setScale] = useState(100);

  const handleChange = (newScale: number): void => {
    setScale(newScale);
  };

  return {
    step,
    scale,
    minScale,
    maxScale,
    onChange: handleChange,
    onAlign,
  };
}

stories.add('по умолчанию', () => {
  const props = useStoryProps();

  return <ScalePanel {...props} />;
});

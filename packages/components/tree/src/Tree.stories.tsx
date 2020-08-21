import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Tree, TreeProps } from './Tree';

const defaultKnobs = (): TreeProps => ({
  title: text('title', 'Title'),
});

storiesOf('ui/Tree', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('по умолчанию', () => <Tree {...defaultKnobs()} />);

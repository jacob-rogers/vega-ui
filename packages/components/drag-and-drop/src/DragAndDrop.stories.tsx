import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { DragAndDrop, DragAndDropProps } from './DragAndDrop';

const defaultKnobs = (): DragAndDropProps => ({
  title: text('title', 'Title'),
});

storiesOf('ui/DragAndDrop', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('DragAndDrop', () => <DragAndDrop {...defaultKnobs()} />);

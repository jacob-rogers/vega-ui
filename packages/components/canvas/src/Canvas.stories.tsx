import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Canvas, CanvasProps } from './Canvas';

const defaultKnobs = (): CanvasProps => ({
  title: text('title', 'Title'),
});

storiesOf('ui/Canvas', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('по умолчанию', () => <Canvas {...defaultKnobs()} />);

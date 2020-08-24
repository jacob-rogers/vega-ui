import React from 'react';
import { useLocalStorage } from '@gpn-prototypes/vega-hooks';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Canvas } from './Canvas';
import { CanvasTree } from './entities';

storiesOf('ui/Canvas', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('по умолчанию', () => {
    const [treeState, setTreeState] = useLocalStorage<CanvasTree[]>('treeState', []);

    return <Canvas state={treeState} onChange={({ state }): void => setTreeState(state)} />;
  });

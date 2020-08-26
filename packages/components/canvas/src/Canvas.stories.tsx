import React, { useState } from 'react';
import { useInterval, useLocalStorage } from '@gpn-prototypes/vega-hooks';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Canvas, Change } from './Canvas';
import { CanvasTree, CanvasUpdate, Context, Tree } from './entities';

const startNode = Tree.of<Context>({
  data: {
    position: { x: 10, y: 300 },
    title: 'Начало',
    type: 'root',
  },
});
const endNode = Tree.of<Context>({
  data: {
    position: { x: 600, y: 300 },
    title: 'Конец',
    type: 'end',
  },
});

const defaultTreeState: CanvasTree[] = [startNode, endNode];

storiesOf('ui/Canvas', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('по умолчанию', () => {
    const [treeState, setTreeState] = useLocalStorage<CanvasTree[]>('treeState', defaultTreeState);
    const [localState, setLocalState] = useState(treeState);
    const [changes, setChanges] = useState<CanvasUpdate[]>([]);

    useInterval(500, () => {
      if (changes.length) {
        setTreeState(localState);
        setChanges([]);
      }
    });

    const updateTree = (change: Change): void => {
      setChanges([...changes, change.update]);
      setLocalState(change.state);
    };

    return <Canvas state={localState} onChange={updateTree} />;
  });

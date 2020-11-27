import React, { useState } from 'react';
import { useInterval, useLocalStorage } from '@gpn-prototypes/vega-hooks';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Canvas, Change } from './Canvas';
import { OptionsPanel } from './components';
import { Tree } from './entities';
import { CanvasData, CanvasTree, CanvasUpdate } from './types';

const startNode = Tree.of<CanvasData>({
  data: {
    position: { x: 10, y: 300 },
    title: 'Начало',
    type: 'root',
  },
});
const eventNode = Tree.of<CanvasData>({
  data: {
    position: { x: 800, y: 300 },
    title: 'Сейсмика',
    eventData: {
      name: 'Сейсмика',
      id: '0',
    },
    type: 'event',
  },
});

const stepNode = Tree.of<CanvasData>({
  data: {
    position: { x: 900, y: 300 },
    title: 'Шаг',
    type: 'step',
    stepData: {
      name: 'Шаг',
      id: '1',
      events: [
        {
          id: '0',
          content: [
            { id: '1', name: 'Залежь - 1', type: 'domainObject' },
            { id: '2', name: 'Залежь - 2', type: 'domainObject' },
            { id: '3', name: 'Залежь - 3', type: 'domainObject' },
          ],
          name: 'Сейсмика',
        },
      ],
    },
  },
});
const endNode = Tree.of<CanvasData>({
  data: {
    position: { x: 600, y: 300 },
    title: 'Конец',
    type: 'end',
  },
});

const defaultTreeState: CanvasTree[] = [startNode, endNode, eventNode, stepNode];

storiesOf('ui/Canvas', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Draft' } })
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
      if (change.update.type === 'clear') {
        setLocalState([]);
        setTreeState([]);
        return;
      }

      setChanges([...changes, change.update]);
      setLocalState(change.state);
    };

    return (
      <div style={{ width: '100%', height: 800 }} id="test">
        <Canvas state={localState} onChange={updateTree} />
      </div>
    );
  })
  .add('панель управления полотном', () => (
    <div style={{ height: 800, width: 200, background: '#fff' }}>
      <OptionsPanel
        activeValue="selection"
        disabledOptions={['dragging']}
        onChange={(change): void => action('onChange')(change)}
      />
    </div>
  ));

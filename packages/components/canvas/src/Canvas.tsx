import React, { useCallback, useRef } from 'react';
import { Layer, Stage } from 'react-konva';
import { useLocalStorage } from '@gpn-prototypes/vega-hooks';
import block from 'bem-cn';

import { List, ListItem } from './components';
import { Canvas as CanvasEntity, Context } from './entities/Canvas';
import { Node } from './entities/Node';
import { TreeState } from './entities/Tree';
import { Position } from './types';

import './Canvas.css';

type CanvasProps = {
  state?: TreeState;
};

const defaultTreeState = {
  0: Node.createLeaf<Context>({ context: { label: 'Начало', x: 10, y: 10, type: 'root' } }),
  1: Node.createLeaf<Context>({ context: { label: 'Конец', x: 1000, y: 10, type: 'end' } }),
};

export const Canvas: React.FC<CanvasProps> = (props) => {
  const { state } = props;

  const [treeStateInStorage, setTreeStateInStorage] = useLocalStorage<TreeState>(
    'treeState',
    state ?? defaultTreeState,
  );

  const canvas = useRef<CanvasEntity>(CanvasEntity.create(treeStateInStorage));

  const tree = canvas.current.extract();

  const onPositionChange = useCallback(
    (idx: number, pos: Position): void => {
      const node = canvas.current.get(idx);
      node.setContext({ ...node.getContext(), x: pos.x, y: pos.y });
      const treeState = canvas.current.extract();
      setTreeStateInStorage({
        ...treeState,
        [idx]: {
          ...treeState.idx,
          data: {
            ...treeState[idx].getData(),
            context: { ...treeState[idx].getData().context, x: pos.x, y: pos.y },
          },
        },
      });
    },
    [setTreeStateInStorage],
  );

  return (
    <Stage
      className={block('VegaCanvas').toString()}
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <Layer>
<<<<<<< HEAD
        <ListItem width={72} position={{ x: 10, y: 10 }} label="Начало" />
        <ListItem width={72} position={{ x: 1000, y: 10 }} label="Конец" />
        <List label="Шаг 1" position={{ x: 200, y: 10 }} />
=======
        {Object.keys(tree).map((key) => {
          const idx = Number(key);
          const currentNode = canvas.current.get(idx);
          const { x, y, type, label } = currentNode.getContext();

          const baseProps = {
            position: { x, y },
            label,
            key: idx,
            onPositionChange: (pos: Position): void => onPositionChange(idx, pos),
          };

          return ['root', 'end'].includes(type) ? (
            <SimpleBlock {...baseProps} width={72} />
          ) : (
            <BaseContainer {...baseProps} />
          );
        })}
>>>>>>> 11da7f1... feat(canvas): добавление сохрания позиции в ls
      </Layer>
    </Stage>
  );
};

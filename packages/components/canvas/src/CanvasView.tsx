import React from 'react';
import { Layer, Stage } from 'react-konva';
import block from 'bem-cn';

import { BaseContainer, Button, SimpleBlock } from './components';
import { Context, TreeItem, TreeState } from './entities';
import { Position } from './types';

import './Canvas.css';

type CanvasViewProps = {
  onPositionChange: (idx: number, pos: Position) => void;
  getNode: (idx: number) => TreeItem<Context>;
  onStepAdding: () => void;
  tree: TreeState;
};

export const CanvasView: React.FC<CanvasViewProps> = (props) => {
  const { onPositionChange, getNode, tree, onStepAdding } = props;

  return (
    <Stage
      className={block('VegaCanvas').toString()}
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <Layer>
        {Object.keys(tree).map((key) => {
          const idx = Number(key);
          const currentNode = getNode(idx);
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
      </Layer>
      <Layer>
        <Button
          label="Добавить шаг"
          onClick={onStepAdding}
          position={{ x: 10, y: window.innerHeight - 150 }}
        />
      </Layer>
    </Stage>
  );
};

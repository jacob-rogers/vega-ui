import React from 'react';
import { Layer, Stage } from 'react-konva';
import block from 'bem-cn';

import { Button, List, ListItem } from './components';
import { Context, Tree } from './entities';
import { Position } from './types';

import './Canvas.css';

type CanvasViewProps = {
  onPositionChange: (idx: string, pos: Position) => void;
  onStepAdding: () => void;
  trees: Tree<Context>[];
};

export const CanvasView: React.FC<CanvasViewProps> = (props) => {
  const { onPositionChange, trees, onStepAdding } = props;

  return (
    <Stage
      className={block('VegaCanvas').toString()}
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <Layer>
        {trees.map((tree) => {
          const idx = tree.getId();
          const { position, type, title } = tree.getData();

          const baseProps = {
            position,
            label: title,
            key: idx,
            onPositionChange: (pos: Position): void => onPositionChange(idx, pos),
          };

          return ['root', 'end'].includes(type) ? (
            <ListItem {...baseProps} width={72} />
          ) : (
            <List {...baseProps} />
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

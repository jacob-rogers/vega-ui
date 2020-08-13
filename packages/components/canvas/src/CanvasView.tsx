import React from 'react';
import { Layer, Stage } from 'react-konva';
import block from 'bem-cn';

import { Button, StepView } from './components';
import { Context, Tree } from './entities';
import { Position } from './types';

import './Canvas.css';

type CanvasViewProps = {
  onPositionChange: (idx: string, pos: Position) => void;
  onStepAdding: () => void;
  trees: Tree<Context>[];
  clearSteps: () => void;
};

export const CanvasView: React.FC<CanvasViewProps> = (props) => {
  const { onPositionChange, trees, onStepAdding, clearSteps } = props;

  return (
    <Stage
      className={block('VegaCanvas').toString()}
      width={window.innerWidth}
      height={window.innerHeight}
    >
      <Layer>
        {trees.map((tree) => {
          return (
            <StepView
              step={tree}
              key={tree.getId()}
              onPositionChange={(pos: Position): void => onPositionChange(tree.getId(), pos)}
            />
          );
        })}
      </Layer>
      <Layer>
        <Button
          label="Добавить шаг"
          onClick={onStepAdding}
          position={{ x: 10, y: window.innerHeight - 150 }}
        />
        <Button
          label="Очистить поле"
          onClick={clearSteps}
          position={{ x: window.innerWidth - 300, y: window.innerHeight - 150 }}
        />
      </Layer>
    </Stage>
  );
};

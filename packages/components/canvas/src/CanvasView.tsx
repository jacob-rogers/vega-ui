import React, { useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import block from 'bem-cn';

import { Button, StepView } from './components';
import { CanvasContext } from './context';
import { CanvasTree } from './entities';
import { Position } from './types';

import './Canvas.css';

type CanvasViewProps = {
  onStepAdding: () => void;
  trees: CanvasTree[];
  clearSteps: () => void;
  onPositionChange: (tree: CanvasTree, position: Position) => void;
};

export const CanvasView: React.FC<CanvasViewProps> = (props) => {
  const { trees, onStepAdding, clearSteps, onPositionChange } = props;
  const [cursor, updateCursor] = useState('default');

  const stageRef = useRef(null);

  return (
    <Stage
      style={{ cursor }}
      className={block('VegaCanvas').toString()}
      width={window.innerWidth}
      height={window.innerHeight}
      ref={stageRef}
    >
      <CanvasContext.Provider value={{ onPositionChange, updateCursor, stageRef }}>
        <Layer>
          {trees.map((tree) => {
            return <StepView step={tree} key={tree.getId()} />;
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
      </CanvasContext.Provider>
    </Stage>
  );
};

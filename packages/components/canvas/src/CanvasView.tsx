import React, { useCallback, useRef, useState } from 'react';
import { Layer, Line, Stage } from 'react-konva';
import Konva from 'konva';

import { cnCanvas } from './cn-canvas';
import { Button, RADIUS, StepView } from './components';
import { CanvasContext, DraggableData } from './context';
import { Canvas, CanvasTree, Context, Tree } from './entities';
import { KonvaMouseEvent } from './types';

import './Canvas.css';

type CanvasViewProps = {
  canvas: Canvas;
};

type Coordinates = [number, number, number, number];

export const CanvasView: React.FC<CanvasViewProps> = (props) => {
  const { canvas } = props;
  const [cursor, setCursor] = useState('default');

  const [connectingLinePoints, setConnectingLinePoints] = useState<Coordinates | null>(null);
  const [draggableData, setDraggableData] = useState<DraggableData | null>(null);

  const stageRef = useRef<Konva.Stage>(null);

  const handleMouseMove = (): void => {
    if (connectingLinePoints && stageRef.current) {
      const pos = stageRef.current.getPointerPosition();
      const newCoordinates = connectingLinePoints.slice() as Coordinates;
      if (pos) {
        setConnectingLinePoints([newCoordinates[0], newCoordinates[1], pos.x, pos.y]);
      }
    }
  };

  const handleStepDrag = (step: CanvasTree): void => {
    setCursor('pointer');
    const steps = canvas.extract().slice();
    const index = steps.indexOf(step);
    steps.splice(index, 1);
    steps.push(step);
    canvas.setTrees(new Set(steps));
  };

  const handleConnectorDrag = (newDraggableData: DraggableData | null): void => {
    setDraggableData(newDraggableData);

    if (newDraggableData) {
      setCursor('pointer');
      const { connector } = newDraggableData;

      if (stageRef.current) {
        const { type, position } = connector;
        const pos = stageRef.current.getPointerPosition();
        if (pos) {
          setConnectingLinePoints([
            position.x + (type === 'parent' ? -RADIUS : RADIUS),
            position.y,
            pos.x,
            pos.y,
          ]);
        }
      }
    }
  };

  const handleMouseUp = (e: KonvaMouseEvent): void => {
    if (draggableData) {
      const id = e.target.id();

      if (id.length) {
        const [stepId, connectionType] = id.split('_');
        const targetStep = canvas.searchTree(stepId);
        if (targetStep && connectionType !== draggableData.connector?.type) {
          const trees =
            connectionType === 'parent'
              ? [draggableData.step, targetStep]
              : [targetStep, draggableData.step];

          canvas.connect(trees[0], trees[1]);
        }
      }

      setDraggableData(null);
      setConnectingLinePoints(null);
    }
    setCursor('default');
  };

  const handleStepAdding = useCallback(() => {
    const tree = Tree.of<Context>({
      data: {
        type: 'step',
        title: 'Шаг',
        position: { x: window.innerWidth / 3, y: window.innerHeight / 3 },
      },
    });
    canvas.add(tree);
  }, [canvas]);

  return (
    <Stage
      style={{ cursor }}
      className={cnCanvas.toString()}
      width={window.innerWidth}
      height={window.innerHeight}
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <CanvasContext.Provider
        value={{
          canvas,
          stageRef,
          handleConnectorDrag,
          draggableData,
          setCursor,
          handleStepDrag,
        }}
      >
        <Layer>
          {connectingLinePoints && (
            <Line
              points={connectingLinePoints}
              stroke="#fff"
              fill="#fff"
              strokeWidth={3}
              pointerWidth={6}
              tension={0.2}
            />
          )}
          {canvas.extract().map((tree) => {
            return <StepView step={tree} key={tree.getId()} />;
          })}
        </Layer>
        <Layer>
          <Button
            label="Добавить шаг"
            onClick={handleStepAdding}
            position={{ x: 10, y: window.innerHeight - 150 }}
          />
        </Layer>
      </CanvasContext.Provider>
    </Stage>
  );
};

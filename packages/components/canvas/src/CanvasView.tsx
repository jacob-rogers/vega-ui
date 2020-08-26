import React, { useCallback, useRef, useState } from 'react';
import { Layer, Line, Stage } from 'react-konva';
import Konva from 'konva';

import { cnCanvas } from './cn-canvas';
import { Button, RADIUS, StepView } from './components';
import { ActiveStep, CanvasContext } from './context';
import { Canvas, Context, Tree } from './entities';
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
  const [activeStep, setActiveStep] = useState<ActiveStep | null>(null);

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

  const handleStepActive = (newActiveStep: ActiveStep | null): void => {
    setActiveStep(newActiveStep);

    if (newActiveStep) {
      setCursor('pointer');
      const steps = canvas.extract().slice();
      const index = steps.indexOf(newActiveStep.stepData);
      steps.splice(index, 1);
      steps.push(newActiveStep.stepData);
      canvas.setTrees(new Set(steps));
      const { connectorData } = newActiveStep;

      if (stageRef.current && connectorData) {
        const { type, position } = connectorData;
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
    if (activeStep) {
      const id = e.target.id();

      if (id.length) {
        const [stepId, connectionType] = id.split('_');
        const targetStep = canvas.searchTree(stepId);
        if (targetStep && connectionType !== activeStep.connectorData?.type) {
          const trees =
            connectionType === 'parent'
              ? [activeStep.stepData, targetStep]
              : [targetStep, activeStep.stepData];

          canvas.connect(trees[0], trees[1]);
        }
      }

      setActiveStep(null);
      setConnectingLinePoints(null);
      setCursor('default');
    }
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
          handleStepActive,
          activeStep,
          setCursor,
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

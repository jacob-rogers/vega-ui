import React, { useCallback, useRef, useState } from 'react';
import { Layer, Line, Stage } from 'react-konva';
import { useKey } from '@gpn-prototypes/vega-hooks';
import Konva from 'konva';

import { cnCanvas } from './cn-canvas';
import { Button, RADIUS, StepList } from './components';
import { ActiveData, CanvasContext, SelectedData } from './context';
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
  const [activeData, setActiveData] = useState<ActiveData | null>(null);
  const [selectedData, setSelectedData] = useState<SelectedData | null>(null);

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

  const handleActiveDataChange = (newActiveData: ActiveData | null): void => {
    setActiveData(newActiveData);

    if (newActiveData) {
      setCursor('pointer');
      const { connector } = newActiveData;

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
    if (activeData) {
      const id = e.target.id();
      if (id.length) {
        const [stepId, connectionType] = id.split('_');
        const targetStep = canvas.searchTree(stepId);
        if (targetStep && connectionType !== activeData.connector?.type) {
          const trees =
            connectionType === 'parent'
              ? [activeData.step, targetStep]
              : [targetStep, activeData.step];

          canvas.connect(trees[0], trees[1]);
        }
      }

      setActiveData(null);
      setConnectingLinePoints(null);
      setCursor('default');
    }
  };

  const removeSelectedLine = useCallback((): void => {
    if (selectedData?.type === 'line') {
      const { childId } = selectedData;
      const child = canvas.searchTree(childId);

      if (child) {
        canvas.disconnect(child);
      }
    }
  }, [canvas, selectedData]);

  const removeSelectedStep = useCallback((): void => {
    if (selectedData?.type === 'step') {
      const { id } = selectedData;
      const tree = canvas.searchTree(id);
      if (tree) {
        canvas.remove(tree);
      }
    }
  }, [canvas, selectedData]);

  const handleRemoveSelectedItem = useCallback(() => {
    removeSelectedStep();
    removeSelectedLine();
    setSelectedData(null);
  }, [removeSelectedLine, removeSelectedStep]);

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

  const handleMouseDown = (): void => {
    if (selectedData) {
      setSelectedData(null);
    }
  };

  useKey([8, 46], handleRemoveSelectedItem, { keyevent: 'keydown' });

  return (
    <Stage
      style={{ cursor }}
      className={cnCanvas.toString()}
      width={window.innerWidth}
      height={window.innerHeight}
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={handleMouseDown}
    >
      <CanvasContext.Provider
        value={{
          stageRef,
          setActiveData: handleActiveDataChange,
          activeData,
          setCursor,
          selectedData,
          setSelectedData,
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
        </Layer>
        <Layer>
          <StepList canvas={canvas} />
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

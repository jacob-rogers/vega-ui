import React, { RefObject, useCallback, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import { useKey, useMount } from '@gpn-prototypes/vega-hooks';
import Konva from 'konva';

import { ConnectionLineView } from './components/ConnectionLineView';
import { cnCanvas } from './cn-canvas';
import { Button, CanvasItems } from './components';
import { CanvasContext } from './context';
import { Canvas, Tree } from './entities';
import { ActiveData, CanvasData, KonvaMouseEvent, Position, SelectedData } from './types';

import './Canvas.css';

type CanvasViewProps = {
  canvas: Canvas;
  parentRef: RefObject<HTMLElement>;
};

type Optional<T> = T | null;

type Coordinates = { parent: Position; child: Position };
type Size = { width: number; height: number };

export const CanvasView: React.FC<CanvasViewProps> = (props) => {
  const { canvas, parentRef } = props;
  const [cursor, setCursor] = useState('default');

  const [connectingLinePoints, setConnectingLinePoints] = useState<Optional<Coordinates>>(null);
  const [activeData, setActiveData] = useState<Optional<ActiveData>>(null);
  const [selectedData, setSelectedData] = useState<Optional<SelectedData>>(null);
  const [stageSize, setStageSize] = useState<Size>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const stageRef = useRef<Konva.Stage>(null);
  const handleMouseMove = (): void => {
    if (connectingLinePoints && stageRef.current) {
      const pos = stageRef.current.getPointerPosition();
      if (pos) {
        setConnectingLinePoints({
          ...connectingLinePoints,
          child: pos,
        });
      }
    }
  };

  useMount(() => {
    if (parentRef.current) {
      setStageSize({
        width: parentRef.current.offsetWidth,
        height: parentRef.current.offsetHeight,
      });
    }
  });

  const handleActiveDataChange = (newActiveData: ActiveData | null): void => {
    setActiveData(newActiveData);

    if (newActiveData) {
      setCursor('pointer');
      const { connector } = newActiveData;

      if (stageRef.current) {
        const { position } = connector;
        const pointerPosition = stageRef.current.getPointerPosition();
        if (pointerPosition) {
          setConnectingLinePoints({ parent: position, child: pointerPosition });
        }
      }
    }
  };

  const abortActiveData = (): void => {
    setActiveData(null);
    setConnectingLinePoints(null);
    setCursor('default');
  };

  const connectActiveItem = (id: string): void => {
    if (activeData) {
      const [itemId, connectionType] = id.split('_');
      const targetItem = canvas.searchTree(itemId);
      if (targetItem && connectionType !== activeData.connector?.type) {
        const trees =
          connectionType === 'parent'
            ? [activeData.item, targetItem]
            : [targetItem, activeData.item];

        canvas.connect(trees[0], trees[1]);
      }
    }
  };

  const handleMouseUp = (e: KonvaMouseEvent): void => {
    const id = e.target.id();
    if (id.length) {
      connectActiveItem(id);
    }

    if (activeData) {
      abortActiveData();
    }
  };

  const removeSelectedLine = useCallback((): void => {
    if (selectedData?.type === 'line') {
      const { childId, parentId } = selectedData;
      const child = canvas.searchTree(childId);
      const parent = canvas.searchTree(parentId);

      if (child && parent) {
        canvas.disconnect(child, parent);
      }
    }
  }, [canvas, selectedData]);

  const removeSelectedItem = useCallback((): void => {
    if (selectedData?.type === 'item') {
      const { id } = selectedData;
      const tree = canvas.searchTree(id);
      if (tree) {
        canvas.remove(tree);
      }
    }
  }, [canvas, selectedData]);

  const handleRemoveSelectedItem = useCallback(() => {
    removeSelectedItem();
    removeSelectedLine();
    setSelectedData(null);
  }, [removeSelectedLine, removeSelectedItem]);

  const handleStepAdding = useCallback(() => {
    const tree = Tree.of<CanvasData>({
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

  useKey(['Delete', 'Backspace'], handleRemoveSelectedItem, { keyevent: 'keydown' });

  return (
    <Stage
      style={{ cursor }}
      className={cnCanvas.toString()}
      ref={stageRef}
      width={stageSize.width}
      height={stageSize.height}
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
          abortActiveData,
          setConnectingLinePoints,
          connectingLinePoints,
        }}
      >
        <Layer>
          <CanvasItems canvas={canvas} />
          {connectingLinePoints && (
            <ConnectionLineView
              parent={connectingLinePoints.parent}
              child={connectingLinePoints.child}
            />
          )}
          <Button
            label="Добавить шаг"
            onClick={handleStepAdding}
            position={{ x: 10, y: stageSize.height - 150 }}
          />
        </Layer>
      </CanvasContext.Provider>
    </Stage>
  );
};

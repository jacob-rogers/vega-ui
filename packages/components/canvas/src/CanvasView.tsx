import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import { useKey, useMount, useUnmount } from '@gpn-prototypes/vega-hooks';
import Konva from 'konva';

import { ConnectionLineView } from './components/ConnectionLineView';
import { cnCanvas } from './cn-canvas';
import { Button, CanvasItems } from './components';
import { CanvasContext } from './context';
import { Canvas, CanvasView as CanvasViewEntity, State, Tree, ViewUpdate } from './entities';
import { CanvasData, Connection, KonvaMouseEvent } from './types';

import './Canvas.css';

type CanvasViewProps = {
  canvas: Canvas;
  parentRef: RefObject<HTMLElement>;
};

export const defaultState: State = {
  cursor: 'default',
  activeData: null,
  selectedData: null,
  stageSize: { width: window.innerWidth, height: window.innerHeight },
  linePoints: null,
};

export const CanvasView: React.FC<CanvasViewProps> = (props) => {
  const { canvas, parentRef } = props;
  const stageRef = useRef<Konva.Stage>(null);
  const [state, setState] = useState(defaultState);

  const view = useMemo(() => CanvasViewEntity.of(state, stageRef.current, canvas), [canvas, state]);

  const handleMouseMove = (): void => {
    view.drawConnectingLine();
  };

  useMount(() => {
    if (parentRef.current) {
      view.updateState({
        stageSize: {
          width: parentRef.current.offsetWidth,
          height: parentRef.current.offsetHeight,
        },
      });
    }
  });

  const handleChange = useCallback((updates: ViewUpdate): void => {
    setState({ ...updates.newState });
  }, []);

  useEffect(() => {
    view.addListener(handleChange);
  }, [view, handleChange]);

  useUnmount(() => {
    canvas.removeAllListeners();
  });

  const abortActiveData = (): void => {
    view.updateState({
      activeData: null,
      cursor: 'default',
      linePoints: null,
    });
  };

  const connectActiveItem = (id: string): void => {
    const [itemId, connectionType] = id.split('_');
    view.connectActiveItem(itemId, connectionType as Connection);
  };

  const handleMouseUp = (e: KonvaMouseEvent): void => {
    const id = e.target.id();
    if (id.length) {
      connectActiveItem(id);
    }

    if (state.activeData) {
      abortActiveData();
    }
  };

  const handleRemoveSelectedItem = useCallback(() => {
    view.removeSelectedItem();
  }, [view]);

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
    view.updateState({ selectedData: null });
  };

  useKey(['Delete', 'Backspace'], handleRemoveSelectedItem, { keyevent: 'keydown' });

  const { activeData, cursor, stageSize, selectedData, linePoints } = view.getState();

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
          stage: view.getStage(),
          setActiveData: (newData): void => view.changeActiveData(newData),
          activeData,
          setCursor: (newCursor): void => view.updateState({ cursor: newCursor }),
          selectedData,
          setSelectedData: (newData): void => {
            view.updateState({ selectedData: newData });
          },
          abortActiveData,
          setConnectingLinePoints: (newData): void => view.updateState({ linePoints: newData }),
          connectingLinePoints: linePoints,
        }}
      >
        <Layer>
          <CanvasItems canvas={canvas} />
          {linePoints && <ConnectionLineView parent={linePoints.parent} child={linePoints.child} />}
          <Button
            label="Добавить шаг"
            onClick={handleStepAdding}
            position={{ x: 10, y: stageSize.height - 150 }}
          />
          <Button
            label="Очистить полотно"
            onClick={(): void => canvas.clear()}
            position={{ x: stageSize.width - 150, y: stageSize.height - 150 }}
          />
        </Layer>
      </CanvasContext.Provider>
    </Stage>
  );
};

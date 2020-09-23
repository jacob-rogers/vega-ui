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
};

export const defaultState: State = {
  cursor: 'default',
  activeData: null,
  selectedData: null,
  stageSize: { width: window.innerWidth, height: window.innerHeight },
  linePoints: null,
};

const SCROLL_PADDING = 10;
const SCROLL_RATIO = 1.04;
const PINNING_KEY_CODE = 'Space';
const GRID_BLOCK_SIZE = 116; // Элемент сетки - квадрат со стороной 116px

const pinning = {
  isKeyPressed: false,
  isMousePressed: false,
  data: {
    clientX: 0,
    clientY: 0,
  },
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

    const y = -contentRect.y * layer.scaleY() + PADDING_VERTICAL - availableHeight * delta;

    layer.y(y);
    layer.batchDraw();
  };

  const initialHorizontalScrollbarX = getHorizontalScrollbarX();
  const initialVerticalScrollbarY = getVerticalScrollbarY();

  const getBgSize = () => {
    const layer = layerRef.current;

    if (!layer) {
      return {
        x: contentRect.x - PADDING_HORIZONTAL,
        y: contentRect.y - PADDING_VERTICAL,
        width: contentRect.width + 2 * PADDING_HORIZONTAL,
        height: contentRect.height + 2 * PADDING_VERTICAL,
      };
    }

    const scale = layer.scaleX();

    const x0 = contentRect.x - PADDING_HORIZONTAL * (1 / scale);
    const y0 = contentRect.y - PADDING_VERTICAL * (1 / scale);
    const width = contentRect.width + 2 * PADDING_HORIZONTAL * (1 / scale);
    const height = contentRect.height + 2 * PADDING_VERTICAL * (1 / scale);
    const x1 = x0 + width;
    const y1 = y0 + height;

    const bgSize = {
      x: x0,
      y: y0,
      width,
      height,
    };

    const intX0 = Math.trunc(x0 / GRID_BLOCK_SIZE);
    const intY0 = Math.trunc(y0 / GRID_BLOCK_SIZE);
    const intX1 = Math.trunc(x1 / GRID_BLOCK_SIZE);
    const intY1 = Math.trunc(y1 / GRID_BLOCK_SIZE);

    if (bgSize.x % GRID_BLOCK_SIZE < 0) {
      bgSize.x = GRID_BLOCK_SIZE * (intX0 - 1);
    }

    if (bgSize.x % GRID_BLOCK_SIZE > 0) {
      bgSize.x = GRID_BLOCK_SIZE * intX0;
    }

    if (bgSize.y % GRID_BLOCK_SIZE < 0) {
      bgSize.y = GRID_BLOCK_SIZE * (intY0 - 1);
    }

    if (bgSize.y % GRID_BLOCK_SIZE > 0) {
      bgSize.y = GRID_BLOCK_SIZE * intY0;
    }

    //

    if (x1 % GRID_BLOCK_SIZE < 0) {
      bgSize.width = GRID_BLOCK_SIZE * intX1 - bgSize.x;
    }

    if (x1 % GRID_BLOCK_SIZE > 0) {
      bgSize.width = GRID_BLOCK_SIZE * (intX1 + 1) - bgSize.x;
    }

    if (y1 % GRID_BLOCK_SIZE < 0) {
      bgSize.height = GRID_BLOCK_SIZE * intY1 - bgSize.y;
    }

    if (y1 % GRID_BLOCK_SIZE > 0) {
      bgSize.height = GRID_BLOCK_SIZE * (intY1 + 1) - bgSize.y;
    }

    return bgSize;
  };

  const bgSize = getBgSize();

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

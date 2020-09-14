import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
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
};

type Optional<T> = T | null;

type Coordinates = { parent: Position; child: Position };
type Size = { width: number; height: number };

type ContentRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

function getContentRect(elements: Konva.Node[], minWidth: number, minHeight: number): ContentRect {
  const rect = {
    x: 0,
    y: 0,
    width: minWidth,
    height: minHeight,
  };

  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];

    if (element.x() < rect.x) {
      rect.width = rect.x + rect.width - element.x();
      rect.x = element.x();
    }

    if (element.y() < rect.y) {
      rect.height = rect.y + rect.height - element.y();
      rect.y = element.y();
    }

    if (rect.x + rect.width < element.x() + element.width()) {
      rect.width = element.x() + element.width() - rect.x;
    }

    if (rect.y + rect.height < element.y() + element.height()) {
      rect.height = element.y() + element.height() - rect.y;
    }
  }

  return rect;
}

const translateValues = { x: 0, y: 0 };
let INITIAL_SCROLL_IS_CALLED = false;

export const CanvasView: React.FC<CanvasViewProps> = (props) => {
  const { canvas } = props;
  const [cursor, setCursor] = useState('default');
  const [connectingLinePoints, setConnectingLinePoints] = useState<Optional<Coordinates>>(null);
  const [activeData, setActiveData] = useState<Optional<ActiveData>>(null);
  const [selectedData, setSelectedData] = useState<Optional<SelectedData>>(null);
  const [stageSize, setStageSize] = useState<Size>({
    width: 0,
    height: 0,
  });
  const [contentRect, setContentRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);

  const handleMouseMove = (): void => {
    if (connectingLinePoints && stageRef.current) {
      const pointerPosition = stageRef.current.getPointerPosition();
      if (pointerPosition) {
        setConnectingLinePoints({
          ...connectingLinePoints,
          child: {
            x: pointerPosition.x - translateValues.x,
            y: pointerPosition.y - translateValues.y,
          },
        });
      }
    }
  };

  useMount(() => {
    if (containerRef.current) {
      setStageSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
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
          setConnectingLinePoints({
            parent: position,
            child: {
              x: pointerPosition.x - translateValues.x,
              y: pointerPosition.y - translateValues.y,
            },
          });
        }
      }
    }
  };

  const handleMouseUp = (e: KonvaMouseEvent): void => {
    if (activeData) {
      const id = e.target.id();
      if (id.length) {
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

  const PADDING_HORIZONTAL = stageSize.width;
  const PADDING_VERTICAL = stageSize.height;
  const STAGE_PADDING = 500;

  /*

    Скролл сделан по примеру #4 из документации https://konvajs.org/docs/sandbox/Canvas_Scrolling.html

    STAGE_PADDING - дополнительное пространство в размере canvas-элемента
    для того, чтобы при быстром пролистывании не было визуальных багов

  */

  const updateStagePosition = (): void => {
    const container = containerRef.current;
    const stage = stageRef.current;

    if (container === null || stage === null) {
      return;
    }

    console.log('updateStagePosition');

    const dx = container.scrollLeft - STAGE_PADDING;
    const dy = container.scrollTop - STAGE_PADDING;

    stage.container().style.transform = `translate(${dx}px, ${dy}px)`;

    const translateX = -dx + PADDING_HORIZONTAL + (0 - contentRect.x);
    const translateY = -dy + PADDING_VERTICAL + (0 - contentRect.y);

    translateValues.x = translateX;
    translateValues.y = translateY;

    stage.x(translateX);
    stage.y(translateY);
    stage.batchDraw();
  };

  const setInitialScroll = (): void => {
    const container = containerRef.current;
    const stage = stageRef.current;

    if (container === null || stage === null) {
      return;
    }

    if (stageSize.width === 0 || stageSize.height === 0) {
      return;
    }

    if (contentRect.width === 0 || contentRect.height === 0) {
      return;
    }

    if (INITIAL_SCROLL_IS_CALLED) {
      return;
    }

    INITIAL_SCROLL_IS_CALLED = true;

    console.log('setInitialScroll');

    /*
      Тут есть расчет на то, что после сработает updateStagePosition
      и установит нужные параметры для stage.container().style.transform и stage.x / stage.y
    */

    /*

    (0 - contentRect.x) и (0 - contentRect.y) - для установки экрана в точку 0,0 на канвасе
    в не зависимости от размеров и положения contentRect

    */

    const scrollLeft = PADDING_HORIZONTAL + (0 - contentRect.x);
    const scrollTop = PADDING_VERTICAL + (0 - contentRect.y);

    container.scrollLeft = scrollLeft;
    container.scrollTop = scrollTop;
  };

  const updateContentRect = (): void => {
    const container = containerRef.current;
    const stage = stageRef.current;

    if (container === null || stage === null || stageSize.width === 0 || stageSize.height === 0) {
      return;
    }

    console.log('updateContentRect');

    const collection = stage.find('.List');
    const elements = collection.toArray();

    const rect = getContentRect(elements, stageSize.width, stageSize.height);

    /*

    Если изменилась координата x или y - значит изменилась левая или верняя граница прямоугольника.
    Для компенсации свободного пространства нам нужно условно добавить новое пространство слева или сверху,
    но размеры прямоугольника могут вырасти только вправо и вниз.
    В увеличившемся прямоугольнике мы проматываем экран вправо / вниз - таким образом
    появляется новое пространство слева или сверху экрана.

    */

    if (rect.x !== contentRect.x && INITIAL_SCROLL_IS_CALLED) {
      const dw = rect.width - contentRect.width;
      const scrollLeft = container.scrollLeft + dw;

      container.scrollLeft = scrollLeft;
    }

    if (rect.y !== contentRect.y && INITIAL_SCROLL_IS_CALLED) {
      const dh = rect.height - contentRect.height;
      const scrollTop = container.scrollTop + dh;

      container.scrollTop = scrollTop;
    }

    /*
      Тут есть расчет на то, что после сработает updateStagePosition
      и установит нужные параметры для stage.container().style.transform и stage.x / stage.y
    */

    setContentRect(rect);
  };

  const placeholderWidth = contentRect.width + PADDING_HORIZONTAL * 2;
  const placeholderHeight = contentRect.height + PADDING_VERTICAL * 2;
  const stageWidth = stageSize.width + STAGE_PADDING * 2;
  const stageHeight = stageSize.height + STAGE_PADDING * 2;

  useEffect(() => {
    setInitialScroll();
  }, [stageSize, contentRect]); // Вызвать один раз, но когда есть stageSize и contentRect

  useEffect(() => {
    updateContentRect();
  }, [stageSize]); // Вызвать один раз, но когда есть stageSize

  return (
    <div ref={containerRef} className={cnCanvas()} onScroll={updateStagePosition}>
      <div
        style={{ width: placeholderWidth, height: placeholderHeight }}
        className={cnCanvas('Placeholder')}
      >
        <Stage
          ref={stageRef}
          style={{ cursor }}
          className={cnCanvas('Stage')}
          width={stageWidth}
          height={stageHeight}
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
              updateContentRect,
            }}
          >
            <Layer>
              {connectingLinePoints && (
                <ConnectionLineView
                  parent={connectingLinePoints.parent}
                  child={connectingLinePoints.child}
                />
              )}
            </Layer>
            <Layer>
              <Rect
                x={contentRect.x}
                y={contentRect.y}
                width={contentRect.width}
                height={contentRect.height}
                stroke="red"
                strokeWidth={5}
              />
              <Rect x={-5} y={-5} width={10} height={10} fill="green" />
              <CanvasItems canvas={canvas} />
            </Layer>
            <Layer>
              <Button
                label="Добавить шаг"
                onClick={handleStepAdding}
                position={{ x: 50, y: Math.max(stageSize.height - 100, 0) }}
              />
            </Layer>
          </CanvasContext.Provider>
        </Stage>
      </div>
    </div>
  );
};

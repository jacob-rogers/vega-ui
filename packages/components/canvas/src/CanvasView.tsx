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
import { getContentRect } from './utils';
import { useImage } from './hooks/use-image';
import gridImageRaw from './grid.svg';

import './Canvas.css';

type CanvasViewProps = {
  canvas: Canvas;
};

type Optional<T> = T | null;

type Coordinates = { parent: Position; child: Position };
type Size = { width: number; height: number };

const translateValues = { x: 0, y: 0 };

const SCROLL_PADDING = 10;
const SCROLL_RATIO = 1.04;
const PINNING_KEY_CODE = 'Space';

const pinning = {
  isKeyPressed: false,
  isMousePressed: false,
  data: {
    clientX: 0,
    clientY: 0,
  },
};

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
  const [debugInfo, setDebugInfo] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const backgroundRef = useRef<Konva.Rect>(null);
  const horizontalScrollbarRef = useRef<Konva.Rect>(null);
  const verticalScrollbarRef = useRef<Konva.Rect>(null);

  const [gridImage] = useImage(gridImageRaw);

  const PADDING_HORIZONTAL = stageSize.width;
  const PADDING_VERTICAL = stageSize.height;

  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>): void => {
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

    if (pinning.isMousePressed) {
      const dx = pinning.data.clientX - event.evt.clientX;
      const dy = pinning.data.clientY - event.evt.clientY;

      pinning.data.clientX = event.evt.clientX;
      pinning.data.clientY = event.evt.clientY;

      handleScroll(dx, dy);
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

  const handleMouseUp = (event: KonvaMouseEvent): void => {
    if (activeData) {
      const id = event.target.id();

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

    if (pinning.isMousePressed) {
      pinning.isMousePressed = false;

      if (!pinning.isKeyPressed) {
        setCursor('default');
      }
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

  const handleClick = (): void => {
    if (selectedData) {
      setSelectedData(null);
    }
  };

  useKey(['Delete', 'Backspace'], handleRemoveSelectedItem, { keyevent: 'keydown' });

  const updateContentRect = (): void => {
    const container = containerRef.current;
    const stage = stageRef.current;

    if (container === null || stage === null || stageSize.width === 0 || stageSize.height === 0) {
      return;
    }

    const collection = stage.find('.List');
    const elements = collection.toArray();

    const rect = getContentRect(elements, stageSize.width, stageSize.height);

    setContentRect(rect);
  };

  useEffect(() => {
    updateContentRect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageSize]); // Вызвать один раз, но когда есть stageSize

  const handleDebugInfoSwitch = (): void => {
    setDebugInfo(!debugInfo);
  };

  const getHorizontalScrollbarX = (): number => {
    const layer = layerRef.current;
    const horizontalScrollbar = horizontalScrollbarRef.current;

    if (!layer || !horizontalScrollbar) {
      return 0;
    }

    const maxX = -contentRect.x * layer.scaleX() + PADDING_HORIZONTAL;
    const availableWidth =
      contentRect.width * layer.scaleX() + 2 * PADDING_HORIZONTAL - stageSize.width;
    const availableScrollWidth = stageSize.width - 2 * SCROLL_PADDING - horizontalScrollbar.width();

    const hx = ((maxX - layer.x()) / availableWidth) * availableScrollWidth + SCROLL_PADDING;

    return hx;
  };

  const getVerticalScrollbarY = (): number => {
    const layer = layerRef.current;
    const verticalScrollbar = verticalScrollbarRef.current;

    if (!layer || !verticalScrollbar) {
      return 0;
    }

    const maxY = -contentRect.y * layer.scaleY() + PADDING_VERTICAL;
    const availableHeight =
      contentRect.height * layer.scaleY() + 2 * PADDING_VERTICAL - stageSize.height;
    const availableScrollHeight =
      stageSize.height - 2 * SCROLL_PADDING - verticalScrollbar.height();

    const vy = ((maxY - layer.y()) / availableHeight) * availableScrollHeight + SCROLL_PADDING;

    return vy;
  };

  // Скролл сделан по примеру #3 из документации https://konvajs.org/docs/sandbox/Canvas_Scrolling.html

  const handleScroll = (deltaX: number, deltaY: number): void => {
    const dx = deltaX;
    const dy = deltaY;

    const stage = stageRef.current;
    const layer = layerRef.current;
    const horizontalScrollbar = horizontalScrollbarRef.current;
    const verticalScrollbar = verticalScrollbarRef.current;
    const bg = backgroundRef.current;

    if (!stage || !layer || !horizontalScrollbar || !verticalScrollbar || !bg) {
      return;
    }

    const minX = -(
      (contentRect.width + contentRect.x) * layer.scaleX() +
      PADDING_HORIZONTAL -
      stageSize.width
    );
    const maxX = -contentRect.x * layer.scaleX() + PADDING_HORIZONTAL;

    const x = Math.max(minX, Math.min(layer.x() - dx, maxX));

    const minY = -(
      (contentRect.height + contentRect.y) * layer.scaleY() +
      PADDING_VERTICAL -
      stageSize.height
    );
    const maxY = -contentRect.y * layer.scaleY() + PADDING_VERTICAL;

    const y = Math.max(minY, Math.min(layer.y() - dy, maxY));
    layer.position({ x, y });

    const vy = getVerticalScrollbarY();
    verticalScrollbar.y(vy);

    const hx = getHorizontalScrollbarX();
    horizontalScrollbar.x(hx);

    stage.batchDraw();
  };

  useMount(() => {
    if (!stageRef.current) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === PINNING_KEY_CODE) {
        event.preventDefault();

        if (!event.repeat) {
          pinning.isKeyPressed = true;
          setCursor('pinning');
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === PINNING_KEY_CODE) {
        pinning.isKeyPressed = false;

        if (!pinning.isMousePressed) {
          setCursor('default');
        }
      }
    };

    const container = stageRef.current.container();
    container.tabIndex = 1;
    container.addEventListener('keydown', handleKeyDown);
    container.addEventListener('keyup', handleKeyUp);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('keyup', handleKeyUp);
    };
  });

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>): void => {
    if (pinning.isKeyPressed) {
      pinning.isMousePressed = true;

      pinning.data.clientX = event.evt.clientX;
      pinning.data.clientY = event.evt.clientY;
    }
  };

  const handleZoom = (event: WheelEvent): void => {
    const stage = stageRef.current;
    const layer = layerRef.current;
    const horizontalScrollbar = horizontalScrollbarRef.current;
    const verticalScrollbar = verticalScrollbarRef.current;
    const bg = backgroundRef.current;

    if (!stage || !layer || !horizontalScrollbar || !verticalScrollbar || !bg) {
      return;
    }

    const oldScale = layer.scaleX();

    const pointer = stage.getPointerPosition();

    if (!pointer) {
      return;
    }

    const mousePointTo = {
      x: (pointer.x - layer.x()) / oldScale,
      y: (pointer.y - layer.y()) / oldScale,
    };

    const newScale = event.deltaY < 0 ? oldScale * SCROLL_RATIO : oldScale / SCROLL_RATIO;

    layer.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    layer.position(newPos);

    const hx = getHorizontalScrollbarX();
    horizontalScrollbar.x(hx);

    const vy = getVerticalScrollbarY();
    verticalScrollbar.y(vy);

    const bgSize = getBgSize();

    bg.x(bgSize.x);
    bg.y(bgSize.y);
    bg.width(bgSize.width);
    bg.height(bgSize.height);

    stage.batchDraw();
  };

  const handleWheel = (event: Konva.KonvaEventObject<WheelEvent>): void => {
    event.evt.preventDefault();

    if (event.evt.ctrlKey || event.evt.metaKey) {
      handleZoom(event.evt);
    } else {
      handleScroll(event.evt.deltaX, event.evt.deltaY);
    }
  };

  const handleHorizontalScrollbar = (): void => {
    const horizontalScrollbar = horizontalScrollbarRef.current;
    const layer = layerRef.current;

    if (!horizontalScrollbar || !layer) {
      return;
    }

    const availableWidth =
      contentRect.width * layer.scaleX() + 2 * PADDING_HORIZONTAL - stageSize.width;
    const availableScrollWidth = stageSize.width - 2 * SCROLL_PADDING - horizontalScrollbar.width();
    const delta = (horizontalScrollbar.x() - SCROLL_PADDING) / availableScrollWidth;

    const x = -contentRect.x * layer.scaleX() + PADDING_HORIZONTAL - availableWidth * delta;

    layer.x(x);
    layer.batchDraw();
  };

  const handleVerticalScrollbar = (): void => {
    const verticalScrollbar = verticalScrollbarRef.current;
    const layer = layerRef.current;

    if (!verticalScrollbar || !layer) {
      return;
    }

    const availableHeight =
      contentRect.height * layer.scaleY() + 2 * PADDING_VERTICAL - stageSize.height;
    const availableScrollHeight =
      stageSize.height - 2 * SCROLL_PADDING - verticalScrollbar.height();
    const delta = (verticalScrollbar.y() - SCROLL_PADDING) / availableScrollHeight;

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

    const bgSize = {
      x: contentRect.x - PADDING_HORIZONTAL * (1 / scale),
      y: contentRect.y - PADDING_VERTICAL * (1 / scale),
      width: contentRect.width + 2 * PADDING_HORIZONTAL * (1 / scale),
      height: contentRect.height + 2 * PADDING_VERTICAL * (1 / scale),
    };

    const blockSize = 116;

    const intX = Math.trunc(bgSize.x / blockSize);
    const intY = Math.trunc(bgSize.y / blockSize);

    /*

    Math.trunc
    Math.ceil
    Math.floor

    */

    if (bgSize.x % blockSize < 0) {
      bgSize.x = blockSize * (intX - 1);
    }

    if (bgSize.x % blockSize > 0) {
      bgSize.x = blockSize * intX;
    }

    if (bgSize.y % blockSize < 0) {
      bgSize.y = blockSize * (intY - 1);
    }

    if (bgSize.y % blockSize > 0) {
      bgSize.y = blockSize * intY;
    }

    const x1 = contentRect.x - PADDING_HORIZONTAL * (1 / scale) + bgSize.width;
    const y1 = contentRect.y - PADDING_VERTICAL * (1 / scale) + bgSize.height;
    const intX1 = Math.trunc(x1 / blockSize);
    const intY1 = Math.trunc(y1 / blockSize);

    if (x1 % blockSize < 0) {
      bgSize.width = blockSize * intX1 - bgSize.x;
    }

    if (x1 % blockSize > 0) {
      bgSize.width = blockSize * (intX1 + 1) - bgSize.x;
    }

    if (y1 % blockSize < 0) {
      bgSize.height = blockSize * intY1 - bgSize.y;
    }

    if (y1 % blockSize > 0) {
      bgSize.height = blockSize * (intY1 + 1) - bgSize.y;
    }

    return bgSize;
  };

  const bgSize = getBgSize();

  return (
    <div ref={containerRef} className={cnCanvas()}>
      <Stage
        ref={stageRef}
        style={{ cursor }}
        className={cnCanvas('Stage')}
        width={stageSize.width}
        height={stageSize.height}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
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
          <Layer ref={layerRef}>
            <Rect
              ref={backgroundRef}
              x={bgSize.x}
              y={bgSize.y}
              width={bgSize.width}
              height={bgSize.height}
              fillPatternImage={gridImage}
              listening={false}
              dasd
            />
            {debugInfo && (
              <>
                <Rect
                  x={contentRect.x}
                  y={contentRect.y}
                  width={contentRect.width}
                  height={contentRect.height}
                  stroke="red"
                  strokeWidth={5}
                />
                <Rect x={-5} y={-5} width={10} height={10} fill="green" />
              </>
            )}
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
              position={{ x: 50, y: Math.max(stageSize.height - 100, 0) }}
            />
            <Button
              label="Debug Info"
              onClick={handleDebugInfoSwitch}
              position={{ x: 180, y: Math.max(stageSize.height - 100, 0) }}
            />
          </Layer>
          <Layer>
            <Rect
              ref={verticalScrollbarRef}
              width={10}
              height={100}
              fill="gray"
              opacity={0.8}
              x={stageSize.width - SCROLL_PADDING - 10}
              y={initialVerticalScrollbarY}
              draggable
              onDragMove={handleVerticalScrollbar}
              dragBoundFunc={(pos): Konva.Vector2d => {
                return {
                  x: stageSize.width - SCROLL_PADDING - 10,
                  y: Math.max(
                    Math.min(pos.y, stageSize.height - 100 - SCROLL_PADDING),
                    SCROLL_PADDING,
                  ),
                };
              }}
            />
            <Rect
              ref={horizontalScrollbarRef}
              width={100}
              height={10}
              fill="gray"
              opacity={0.8}
              x={initialHorizontalScrollbarX}
              y={stageSize.height - SCROLL_PADDING - 10}
              draggable
              onDragMove={handleHorizontalScrollbar}
              dragBoundFunc={(pos): Konva.Vector2d => {
                return {
                  x: Math.max(
                    Math.min(pos.x, stageSize.width - 100 - SCROLL_PADDING),
                    SCROLL_PADDING,
                  ),
                  y: stageSize.height - SCROLL_PADDING - 10,
                };
              }}
            />
          </Layer>
        </CanvasContext.Provider>
      </Stage>
    </div>
  );
};

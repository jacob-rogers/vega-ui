import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { useKey, useMount, useResizeObserver, useUnmount } from '@gpn-prototypes/vega-hooks';
import { ScalePanel } from '@gpn-prototypes/vega-scale-panel';
import Konva from 'konva';
import { v4 as uuid } from 'uuid';

import { ConnectionLineView } from './components/ConnectionLineView';
import { cnCanvas } from './cn-canvas';
import {
  CanvasGrid,
  CanvasItems,
  Changes as OptionalPanelChanges,
  Option,
  OptionsPanel,
  Scrollbar,
} from './components';
import { NAMES_MAP } from './constants';
import { CanvasContext } from './context';
import { Canvas, CanvasView as CanvasViewEntity, State, Tree, ViewUpdate } from './entities';
import { CanvasData, ItemType, KonvaMouseEvent, SelectedData } from './types';
import { createScrollbarPointGetter, getBgRect, getContentPadding } from './utils';

import './Canvas.css';

type CanvasViewProps = {
  canvas: Canvas;
};

export const defaultState: State = {
  activeOption: 'selection',
  cursor: 'default',
  activeData: null,
  selectedData: null,
  stageSize: { width: 0, height: 0 },
  linePoints: null,
  contentRect: { x: 0, y: 0, height: 0, width: 0 },
  overlay: false,
  scale: 1,
};

const pinning = {
  isKeyPressed: false,
  isMousePressed: false,
  data: {
    clientX: 0,
    clientY: 0,
  },
};

const selectionData = {
  x0: 0,
  y0: 0,
  isActive: false,
};
export const CanvasView: React.FC<CanvasViewProps> = (props) => {
  const { canvas } = props;

  const [state, setState] = useState(defaultState);

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const backgroundRectRef = useRef<Konva.Rect>(null);
  const selectionRectRef = useRef<Konva.Rect>(null);
  const horizontalScrollbarRef = useRef<Konva.Rect>(null);
  const verticalScrollbarRef = useRef<Konva.Rect>(null);

  const view = useMemo(
    () =>
      CanvasViewEntity.of({
        canvas,
        state,
        stage: stageRef.current,
        layer: layerRef.current,
        background: backgroundRectRef.current,
        horizontalScrollbar: horizontalScrollbarRef.current,
        verticalScrollbar: verticalScrollbarRef.current,
      }),
    [canvas, state],
  );

  const {
    activeOption,
    activeData,
    cursor,
    stageSize,
    selectedData,
    linePoints,
    contentRect,
    overlay,
    mode,
    scale,
  } = view.getState();

  const handleChange = useCallback((updates: ViewUpdate): void => {
    setState({ ...updates.newState });
  }, []);

  useEffect(() => {
    view.addListener(handleChange);
  }, [view, handleChange]);

  useUnmount(() => {
    view.removeAllListeners();
  });

  useEffect(() => {
    view.updateContentRect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageSize]);

  useEffect(() => {
    const stage = stageRef.current;
    const layout = layerRef.current;

    const getTargetIntersection = () => {
      let intersect;

      const position = stage?.getPointerPosition();

      if (position) {
        const overlap = layout?.getIntersection(position, 'Group');

        intersect = overlap?.attrs.name === 'StepItem' ? overlap : undefined;
      }

      return intersect;
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();

      stage?.setPointersPositions(e);

      const intersect = getTargetIntersection();
      const selected = view.getState().selectedData;

      if (!intersect) {
        if (selected) {
          view.updateState({
            selectedData: null,
          });
        }

        return;
      }

      const intersectId = intersect.attrs.id;

      if (!selected || (selected?.type === 'item' && !selected.ids.includes(intersectId))) {
        const selectEvtObject: SelectedData = { type: 'item', ids: [intersectId] };

        view.updateState({
          selectedData: selectEvtObject,
        });
      }
    };

    const handleDrop = (): void => {
      const intersect = getTargetIntersection();

      if (intersect) {
        const { id } = intersect.attrs;

        canvas.dropEventNotification(id);

        canvas.itemsSelectionNotification({ type: 'item', ids: [id] });
      } else {
        view.updateState({
          selectedData: null,
        });

        canvas.itemsSelectionNotification(null);
      }
    };

    const container = stage?.container();

    if (container) {
      container.addEventListener('dragover', handleDragOver);
      container.addEventListener('drop', handleDrop);
    }

    return (): void => {
      container?.removeEventListener('dragover', handleDragOver);
      container?.removeEventListener('drop', handleDrop);
    };
  }, [canvas, view]);

  const abortActiveData = (): void => {
    view.updateState({
      activeData: null,
      cursor: 'default',
      linePoints: null,
    });
  };

  const handleRemoveSelectedItem = (): void => {
    view.removeSelectedItem();
  };

  const handleMouseMove = (event: KonvaMouseEvent): void => {
    view.drawConnectingLine();

    if (pinning.isMousePressed && activeOption === 'dragging') {
      const dx = pinning.data.clientX - event.evt.clientX;
      const dy = pinning.data.clientY - event.evt.clientY;

      pinning.data.clientX = event.evt.clientX;
      pinning.data.clientY = event.evt.clientY;

      view.scroll(dx, dy);
    }

    if (selectionData.isActive) {
      const stage = stageRef.current;
      const layer = layerRef.current;
      const selectionRect = selectionRectRef.current;

      if (stage === null || layer === null || selectionRect === null) {
        return;
      }

      const pointerPosition = stage.getPointerPosition();

      if (pointerPosition === null) {
        return;
      }

      const { x0, y0 } = selectionData;
      const x1 = (pointerPosition.x - layer.x()) * (1 / layer.scaleX());
      const y1 = (pointerPosition.y - layer.y()) * (1 / layer.scaleY());

      selectionRect.setAttrs({
        x: Math.min(x0, x1),
        y: Math.min(y0, y1),
        width: Math.abs(x1 - x0),
        height: Math.abs(y1 - y0),
      });
      layer.batchDraw();
    }
  };

  const handleMouseDown = (e: KonvaMouseEvent): void => {
    if (pinning.isKeyPressed || mode === 'dragging') {
      pinning.isMousePressed = true;

      pinning.data.clientX = e.evt.clientX;
      pinning.data.clientY = e.evt.clientY;
    } else if (e.target === stageRef.current) {
      const stage = stageRef.current;
      const layer = layerRef.current;
      const selectionRect = selectionRectRef.current;

      if (stage === null || layer === null || selectionRect === null) {
        return;
      }

      const pointerPosition = stage.getPointerPosition();

      if (pointerPosition === null) {
        return;
      }

      selectionData.x0 = (pointerPosition.x - layer.x()) * (1 / layer.scaleX());
      selectionData.y0 = (pointerPosition.y - layer.y()) * (1 / layer.scaleY());
      selectionData.isActive = true;

      selectionRect.width(0);
      selectionRect.height(0);
      selectionRect.visible(true);
      layer.batchDraw();
    }
  };

  const handleMouseUp = (): void => {
    if (state.activeData || state.linePoints) {
      setTimeout(() => {
        abortActiveData();
      }, 0);
    }

    if (pinning.isMousePressed) {
      pinning.isMousePressed = false;

      if (!pinning.isKeyPressed && mode !== 'dragging') {
        view.updateState({
          cursor: 'default',
          overlay: false,
          activeOption: 'selection',
        });
      }
    }

    if (selectionData.isActive) {
      selectionData.isActive = false;

      const stage = stageRef.current;
      const layer = layerRef.current;
      const selectionRect = selectionRectRef.current;

      if (stage === null || layer === null || selectionRect === null) {
        return;
      }

      setTimeout(() => {
        selectionRect.width(0);
        selectionRect.height(0);
        selectionRect.visible(false);
        layer.batchDraw();
      });

      const shapes = stage.find('.StepItem, .ExtremePointItem, .EventItem').toArray();
      const box = selectionRect.getClientRect({});
      const selected = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect()),
      );

      const selectedItems = selected.filter((shape) =>
        ['StepItem', 'ExtremePointItem', 'EventItem'].includes(shape.attrs.name),
      );

      const ids = selectedItems.map((item) => item.attrs.id);

      if (selectedItems.length) {
        view.updateState({ selectedData: { type: 'item', ids } });

        canvas.itemsSelectionNotification({ type: 'item', ids });
      } else {
        view.updateState({ selectedData: null });

        canvas.itemsSelectionNotification(null);
      }
    }
  };

  const createStep = useCallback(
    (type: ItemType) => {
      const treeData: CanvasData = {
        type,
        title: NAMES_MAP[type],
        position: { x: window.innerWidth / 3, y: window.innerHeight / 3 },
      };

      if (type === 'step') {
        treeData.stepData = {
          name: NAMES_MAP[type],
          id: uuid(),
          events: [],
        };
      }

      const tree = Tree.of<CanvasData>({ data: treeData });
      canvas.add(tree);
    },
    [canvas],
  );

  const { height: containerHeight, width: containerWidth } = useResizeObserver(containerRef);

  useLayoutEffect(() => {
    if (containerHeight && containerWidth) {
      view.updateState({
        stageSize: {
          width: containerWidth,
          height: containerHeight,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerHeight, containerWidth]);

  useMount(() => {
    const stage = stageRef.current;
    const container = stage?.container();

    if (container) {
      container.tabIndex = 1;
    }
  });

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.code === 'Space') {
      e.preventDefault();

      if (!e.repeat) {
        pinning.isKeyPressed = true;
        view.updateState({
          overlay: true,
          activeOption: 'dragging',
          cursor: 'grab',
        });
      }
    }

    if (['Backspace', 'Delete'].includes(e.code)) {
      handleRemoveSelectedItem();
    }
  };

  const handleKeyUp = (): void => {
    pinning.isKeyPressed = false;

    if (!pinning.isMousePressed) {
      view.updateState({
        activeOption: 'selection',
        cursor: 'default',
        overlay: false,
      });
    }
  };

  const handleWheel = (event: Konva.KonvaEventObject<WheelEvent>): void => {
    event.evt.preventDefault();

    if (event.evt.ctrlKey || event.evt.metaKey) {
      view.zoom({ source: 'event', delta: event.evt.deltaY });
    } else {
      view.scroll(event.evt.deltaX, event.evt.deltaY);
    }
  };

  const handleMouseLeave = () => {
    const layer = layerRef.current;
    const selectionRect = selectionRectRef.current;

    if (layer === null || selectionRect === null) {
      return;
    }

    selectionData.isActive = false;

    selectionRect.width(0);
    selectionRect.height(0);
    selectionRect.visible(false);
    layer.batchDraw();

    setTimeout(() => {
      abortActiveData();
    }, 0);
  };

  useKey(['Backspace', 'Delete', 'Space'], handleKeyDown, {
    element: stageRef.current?.container(),
    keyevent: 'keydown',
  });

  useKey('Space', handleKeyUp, {
    element: stageRef.current?.container(),
    keyevent: 'keyup',
  });

  const getScrollbarPoint = createScrollbarPointGetter({
    layer: layerRef.current,
    stageSize,
    contentRect,
  });

  const handleOptionPanel = useCallback(
    (change: OptionalPanelChanges): void => {
      if (change.type === 'create') {
        createStep(change.itemType);
      }

      if (change.type === 'selection' || change.type === 'dragging') {
        view.changeActiveOption(change.type);
      }

      if (change.type === 'remove') {
        view.removeSelectedItem();
      }
    },
    [createStep, view],
  );

  const bgRect = getBgRect({
    contentRect,
    contentPadding: getContentPadding(stageSize),
    scale: layerRef.current?.scaleX(),
  });

  const getDisabledOptions = (): Option[] => {
    const disabledOptions: Option[] = [];

    if (selectedData === null) {
      disabledOptions.push('remove');
    }

    if (canvas.hasRoot()) {
      disabledOptions.push('root');
    }

    return disabledOptions;
  };

  const handleScaleChange = (number: number) => {
    view.zoom({ source: 'panel', scale: number / 100 });
  };

  const handleContentAlign = () => {
    let newScale;

    newScale = Math.min(stageSize.width / contentRect.width, stageSize.height / contentRect.height);
    newScale = Math.min(1, Math.max(0.1, newScale));

    const newWidth = contentRect.width * newScale;
    const newHeight = contentRect.height * newScale;

    const marginTop = (stageSize.height - newHeight) / 2;
    const marginLeft = (stageSize.width - newWidth) / 2;

    view.zoom({ source: 'panel', scale: newScale });

    const layer = layerRef.current;

    if (layer === null) {
      return;
    }

    const x = -(contentRect.x * layer.scaleX() - marginLeft);
    const y = -(contentRect.y * layer.scaleY() - marginTop);

    layer.position({ x, y });

    view.updateScrollbars();
  };

  return (
    <div ref={containerRef} id="VegaCanvas" className={cnCanvas()}>
      <div className={cnCanvas('OptionsPanelWrapper')}>
        <OptionsPanel
          disabledOptions={getDisabledOptions()}
          activeValue={activeOption}
          onChange={handleOptionPanel}
        />
        <ScalePanel
          step={10}
          scale={Number((scale * 100).toFixed())}
          minScale={10}
          maxScale={150}
          onChange={handleScaleChange}
          onAlign={handleContentAlign}
        />
      </div>
      <Stage
        style={{ cursor }}
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        className={cnCanvas('Stage').toString()}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <CanvasContext.Provider
          value={{
            stage: view.getStage(),
            layer: view.getLayer(),
            setActiveData: (newData): void => view.changeActiveData(newData),
            activeData,
            setCursor: (newCursor): void => view.updateState({ cursor: newCursor }),
            selectedData,
            setSelectedData: (newData): void => {
              if (newData) {
                canvas.itemsSelectionNotification(newData);
              }

              view.updateState({ selectedData: newData });
            },
            abortActiveData,
            setConnectingLinePoints: (newData): void => view.updateState({ linePoints: newData }),
            connectingLinePoints: linePoints,
            updateContentRect: (): void => view.updateContentRect(),
          }}
        >
          <Layer ref={layerRef}>
            <CanvasGrid innerRef={backgroundRectRef} rect={bgRect} />
            <CanvasItems canvas={canvas} />
            {linePoints && (
              <ConnectionLineView parent={linePoints.parent} child={linePoints.child} />
            )}
            <Rect
              ref={selectionRectRef}
              width={0}
              height={0}
              visible={false}
              strokeWidth={1}
              stroke="#0AA5FF"
              fill="rgba(0, 150, 235, 0.4)"
            />
          </Layer>
          <Layer>
            {overlay && (
              <Rect
                x={0}
                y={0}
                width={stageSize.width}
                height={stageSize.height}
                fill="white"
                opacity={0}
              />
            )}
            <Scrollbar
              innerRef={verticalScrollbarRef}
              type="vertical"
              stageSize={stageSize}
              onDragMove={(): void => view.scrollVertical()}
              getInitialPoint={getScrollbarPoint}
            />
            <Scrollbar
              innerRef={horizontalScrollbarRef}
              type="horizontal"
              stageSize={stageSize}
              onDragMove={(): void => view.scrollHorizontal()}
              getInitialPoint={getScrollbarPoint}
            />
          </Layer>
        </CanvasContext.Provider>
      </Stage>
    </div>
  );
};

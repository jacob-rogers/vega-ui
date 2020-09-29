import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { useKey, useMount, useUnmount } from '@gpn-prototypes/vega-hooks';
import Konva from 'konva';

import { ConnectionLineView } from './components/ConnectionLineView';
import { cnCanvas } from './cn-canvas';
import {
  CanvasGrid,
  CanvasItems,
  CanvasPortal,
  Changes as OptionalPanelChanges,
  OptionsPanel,
  Scrollbar,
} from './components';
import { NAMES_MAP, PINNING_KEY_CODE } from './constants';
import { CanvasContext } from './context';
import { Canvas, CanvasView as CanvasViewEntity, State, Tree, ViewUpdate } from './entities';
import { CanvasData, Connection, ItemType, KonvaMouseEvent } from './types';
import { createScrollbarPointGetter, getBgRect } from './utils';

import './Canvas.css';

type CanvasViewProps = {
  canvas: Canvas;
};

export const defaultState: State = {
  activeOption: 'selection',
  cursor: 'default',
  activeData: null,
  selectedData: null,
  stageSize: { width: window.innerWidth, height: window.innerHeight },
  linePoints: null,
  contentRect: { x: 0, y: 0, height: 0, width: 0 },
  overlay: false,
};

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
  const stageRef = useRef<Konva.Stage>(null);
  const [state, setState] = useState(defaultState);

  const containerRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<Konva.Layer>(null);
  const backgroundRef = useRef<Konva.Rect>(null);
  const horizontalScrollbarRef = useRef<Konva.Rect>(null);
  const verticalScrollbarRef = useRef<Konva.Rect>(null);

  const view = useMemo(
    () =>
      CanvasViewEntity.of({
        layer: layerRef.current,
        stage: stageRef.current,
        state,
        verticalScrollbar: verticalScrollbarRef.current,
        canvas,
        background: backgroundRef.current,
        horizontalScrollbar: horizontalScrollbarRef.current,
        container: containerRef.current,
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
  } = view.getState();

  const handleChange = useCallback((updates: ViewUpdate): void => {
    setState({ ...updates.newState });
  }, []);

  useEffect(() => {
    view.addListener(handleChange);
  }, [view, handleChange]);

  useEffect(() => {
    view.updateContentRect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageSize]);

  const abortActiveData = (): void => {
    view.updateState({
      activeData: null,
      cursor: 'default',
      linePoints: null,
    });
  };

  useUnmount(() => {
    view.removeAllListeners();
  });

  const handleMouseMove = (event: KonvaMouseEvent): void => {
    view.drawConnectingLine();
    if (pinning.isMousePressed) {
      const dx = pinning.data.clientX - event.evt.clientX;
      const dy = pinning.data.clientY - event.evt.clientY;

      pinning.data.clientX = event.evt.clientX;
      pinning.data.clientY = event.evt.clientY;

      view.scroll(dx, dy);
    }
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
  };

  const handleRemoveSelectedItem = (): void => {
    view.removeSelectedItem();
  };

  const createStep = useCallback(
    (type: ItemType) => {
      const tree = Tree.of<CanvasData>({
        data: {
          type,
          title: NAMES_MAP[type],
          position: { x: window.innerWidth / 3, y: window.innerHeight / 3 },
        },
      });
      canvas.add(tree);
    },
    [canvas],
  );

  const handleClick = (): void => {
    if (selectedData !== null) {
      view.updateState({ selectedData: null });
    }
  };

  const handleMouseDown = (e: KonvaMouseEvent): void => {
    if (pinning.isKeyPressed || mode === 'dragging') {
      pinning.isMousePressed = true;

      pinning.data.clientX = e.evt.clientX;
      pinning.data.clientY = e.evt.clientY;
    }
  };

  useMount((): void => {
    if (containerRef.current) {
      view.updateState({
        stageSize: {
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        },
      });
    }

    const container = stageRef.current?.container();
    if (container) {
      container.tabIndex = 1;
    }
  });

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.code === PINNING_KEY_CODE) {
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
      view.zoom(event.evt.deltaY);
    } else {
      view.scroll(event.evt.deltaX, event.evt.deltaY);
    }
  };

  useKey(['Backspace', 'Delete', PINNING_KEY_CODE], handleKeyDown, {
    element: stageRef.current?.container(),
    keyevent: 'keydown',
  });

  useKey(PINNING_KEY_CODE, handleKeyUp, {
    element: stageRef.current?.container(),
    keyevent: 'keyup',
  });

  const getScrollbarPoint = createScrollbarPointGetter({
    layer: layerRef.current,
    contentRect,
    stageSize,
  });

  const handleOptionPanel = (change: OptionalPanelChanges): void => {
    if (change.type === 'create') {
      createStep(change.itemType);
    }

    if (change.type === 'selection' || change.type === 'dragging') {
      view.changeActiveOption(change.type);
    }

    if (change.type === 'remove') {
      view.removeSelectedItem();
    }
  };

  const bgSize = getBgRect({ contentRect, stageSize, scaleX: layerRef.current?.scaleX() });

  return (
    <div ref={containerRef} id="VegaCanvas" className={cnCanvas()}>
      <Stage
        style={{ cursor }}
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        onWheel={handleWheel}
        className={cnCanvas('Stage').toString()}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
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
            updateContentRect: (): void => view.updateContentRect(),
          }}
        >
          <Layer ref={layerRef}>
            {/* <CanvasPortal params={{ name: 'portalsCanvas', parentSelector: '#VegaCanvas' }}>
              <div className={cnCanvas('OptionsPanelWrapper')}>
                <OptionsPanel activeValue={activeOption} onChange={handleOptionPanel} />
              </div>
            </CanvasPortal> */}
            <CanvasGrid innerRef={backgroundRef} size={bgSize} />
            <CanvasItems canvas={canvas} />
            {linePoints && (
              <ConnectionLineView parent={linePoints.parent} child={linePoints.child} />
            )}
          </Layer>
          <Layer>
            {overlay && (
              <Rect
                x={0}
                y={0}
                width={stageSize.width}
                height={stageSize.height}
                fill="rgb(255,255,255, 0)"
              />
            )}
            <Scrollbar
              type="vertical"
              innerRef={verticalScrollbarRef}
              stageSize={stageSize}
              onDragMove={(): void => view.scrollVertical()}
              getInitialPoint={(data): number => getScrollbarPoint(data)}
            />
            <Scrollbar
              type="horizontal"
              innerRef={horizontalScrollbarRef}
              stageSize={stageSize}
              onDragMove={(): void => view.scrollHorizontal()}
              getInitialPoint={(data): number => getScrollbarPoint(data)}
            />
          </Layer>
        </CanvasContext.Provider>
      </Stage>
    </div>
  );
};

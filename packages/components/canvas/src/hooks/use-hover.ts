import { useCallback, useState } from 'react';
import Konva from 'konva';

type KonvaMouseEvent = Konva.KonvaEventObject<MouseEvent>;

type KonvaMouseEventHandler = (e: KonvaMouseEvent) => void;

type Styles = { hover?: string; initial: string };

type Params = {
  onMouseEnter?: KonvaMouseEventHandler;
  onMouseLeave?: KonvaMouseEventHandler;
  cursor?: string;
  stroke?: Styles;
  fill?: Styles;
};

const getContainerFromEvent = (
  e: Konva.KonvaEventObject<MouseEvent>,
): HTMLDivElement | undefined => {
  const { target } = e;

  const stage = target.getStage()?.container();

  return stage;
};

type API = {
  handleMouseEnter: KonvaMouseEventHandler;
  handleMouseLeave: KonvaMouseEventHandler;
  stroke?: string;
  fill?: string;
};

export const useHover = (params: Params): API => {
  const { onMouseEnter, onMouseLeave, cursor, stroke, fill } = params;
  const [fillState, setFill] = useState(fill?.initial);
  const [strokeState, setStroke] = useState(stroke?.initial);

  const setCursor: KonvaMouseEventHandler = useCallback(
    (e) => {
      if (cursor) {
        const stage = getContainerFromEvent(e);
        if (stage) {
          stage.style.cursor = stage.style.cursor === cursor ? 'default' : cursor;
        }
      }
    },
    [cursor],
  );

  const handleMouseEnter: KonvaMouseEventHandler = useCallback(
    (e) => {
      if (onMouseEnter) {
        onMouseEnter(e);
      }
      setCursor(e);
      if (fill?.hover) {
        setFill(fill.hover);
      }
      if (stroke?.hover) {
        setStroke(stroke.hover);
      }
    },
    [onMouseEnter, setCursor, stroke, fill],
  );

  const handleMouseLeave: KonvaMouseEventHandler = useCallback(
    (e) => {
      if (onMouseLeave) {
        onMouseLeave(e);
      }
      setCursor(e);
      if (strokeState !== stroke?.initial) {
        setStroke(stroke?.initial);
      }
      if (fillState !== fill?.initial) {
        setStroke(fill?.initial);
      }
    },
    [onMouseLeave, setCursor, stroke, fill, fillState, strokeState],
  );

  return { handleMouseEnter, handleMouseLeave, fill: fillState, stroke: strokeState };
};

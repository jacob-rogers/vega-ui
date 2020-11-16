import { createContext, useContext } from 'react';
import Konva from 'konva';
import { Shape, ShapeConfig } from 'konva/types/Shape';

import { ActiveData, Position, SelectedData } from '../types';

const noop = (): void => {};

type API = {
  setSelectedData: (newSelected: SelectedData | null) => void;
  setActiveData: (newActive: ActiveData | null) => void;
  setCursor: (newCursor: string) => void;
  stage: Konva.Stage | null;
  layer: Konva.Layer | null;
  tempLayer: Konva.Layer | null;
  lastDropZoneShape: Konva.Group | Shape<ShapeConfig> | null;
  setLastDropZoneShape: (value: Konva.Group | Shape<ShapeConfig> | null) => void;
  activeData: ActiveData | null;
  selectedData: SelectedData | null;
  abortActiveData: () => void;
  setConnectingLinePoints: (points: { parent: Position; child: Position } | null) => void;
  connectingLinePoints: { parent: Position; child: Position } | null;
  updateContentRect: () => void;
};

export const CanvasContext = createContext<API>({
  stage: null,
  layer: null,
  tempLayer: null,
  lastDropZoneShape: null,
  setLastDropZoneShape: noop,
  setCursor: noop,
  setSelectedData: noop,
  setActiveData: noop,
  activeData: null,
  selectedData: null,
  abortActiveData: noop,
  setConnectingLinePoints: noop,
  connectingLinePoints: null,
  updateContentRect: noop,
});

export const useCanvas = (): API => useContext(CanvasContext);

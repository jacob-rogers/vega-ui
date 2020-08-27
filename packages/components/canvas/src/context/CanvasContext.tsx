import { createContext, MutableRefObject, useContext } from 'react';
import Konva from 'konva';

import { Canvas, CanvasTree } from '../entities';
import { ConnectorType, Position } from '../types';

export type StepConnectorData = {
  type: ConnectorType;
  position: Position;
};

export type ActiveData = {
  step: CanvasTree;
  connector: StepConnectorData;
};

export type SelectedData =
  | { type: 'step'; id: string }
  | { type: 'line'; parentId: string; childId: string };

const noop = (): void => {};

type API = {
  canvas: Canvas;
  handleActiveDataChange: (newActive: ActiveData | null) => void;
  setCursor: (newCursor: string) => void;
  stageRef: MutableRefObject<Konva.Stage | null>;
  activeData: ActiveData | null;
  selectedData: SelectedData | null;
};

export const CanvasContext = createContext<API>({
  canvas: Canvas.of([]),
  stageRef: { current: null },
  setCursor: noop,
  handleActiveDataChange: noop,
  activeData: null,
  selectedData: null,
});

export const useCanvas = (): API => useContext(CanvasContext);

import { createContext, MutableRefObject, useContext } from 'react';
import Konva from 'konva';

import { Canvas, CanvasTree } from '../entities';
import { ConnectorType, Position } from '../types';

export type StepConnectorData = {
  type: ConnectorType;
  position: Position;
};

export type DraggableData = {
  step: CanvasTree;
  connector: StepConnectorData;
};

type API = {
  canvas: Canvas;
  handleConnectorDrag: (activeStep: DraggableData | null) => void;
  setCursor: (newCursor: string) => void;
  stageRef: MutableRefObject<Konva.Stage | null>;
  handleStepDrag: (step: CanvasTree) => void;
  draggableData: DraggableData | null;
};

export const CanvasContext = createContext<API>({
  canvas: Canvas.of([]),
  stageRef: { current: null },
  setCursor: () => {},
  handleConnectorDrag: () => {},
  handleStepDrag: () => {},
  draggableData: null,
});

export const useCanvas = (): API => useContext(CanvasContext);

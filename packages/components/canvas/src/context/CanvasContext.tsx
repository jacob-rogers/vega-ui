import { createContext, MutableRefObject, useContext } from 'react';
import Konva from 'konva';

import { Canvas, CanvasTree } from '../entities';
import { ConnectorType, Position } from '../types';

export type StepConnectorData = {
  type: ConnectorType;
  position: Required<Position>;
};

export type ActiveStep = {
  stepData: CanvasTree;
  connectorData: StepConnectorData | null;
};

type API = {
  canvas: Canvas | null;
  handleStepActive: (activeStep: ActiveStep | null) => void;
  setCursor: (newCursor: string) => void;
  stageRef: MutableRefObject<Konva.Stage | null>;
  activeStep: ActiveStep | null;
};

export const CanvasContext = createContext<API>({
  canvas: null,
  stageRef: { current: null },
  setCursor: () => {},
  handleStepActive: () => {},
  activeStep: null,
});

export const useCanvas = (): API => useContext(CanvasContext);

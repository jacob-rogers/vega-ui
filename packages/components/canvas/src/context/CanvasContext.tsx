import { createContext, MutableRefObject, useContext } from 'react';
import Konva from 'konva';

import { CanvasTree } from '../entities';
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
  setSelectedData: (newSelected: SelectedData | null) => void;
  setActiveData: (newActive: ActiveData | null) => void;
  setCursor: (newCursor: string) => void;
  stageRef: MutableRefObject<Konva.Stage | null>;
  activeData: ActiveData | null;
  selectedData: SelectedData | null;
};

export const CanvasContext = createContext<API>({
  stageRef: { current: null },
  setCursor: noop,
  setSelectedData: noop,
  setActiveData: noop,
  activeData: null,
  selectedData: null,
});

export const useCanvas = (): API => useContext(CanvasContext);

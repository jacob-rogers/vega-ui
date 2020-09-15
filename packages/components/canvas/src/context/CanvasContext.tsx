import { createContext, MutableRefObject, useContext } from 'react';
import Konva from 'konva';

import { ActiveData, Position, SelectedData } from '../types';

const noop = (): void => {};

type API = {
  setSelectedData: (newSelected: SelectedData | null) => void;
  setActiveData: (newActive: ActiveData | null) => void;
  setCursor: (newCursor: string) => void;
  stageRef: MutableRefObject<Konva.Stage | null>;
  activeData: ActiveData | null;
  selectedData: SelectedData | null;
  abortActiveData: () => void;
  setConnectingLinePoints: (points: { parent: Position; child: Position } | null) => void;
  connectingLinePoints: { parent: Position; child: Position } | null;
};

export const CanvasContext = createContext<API>({
  stageRef: { current: null },
  setCursor: noop,
  setSelectedData: noop,
  setActiveData: noop,
  activeData: null,
  selectedData: null,
  abortActiveData: noop,
  setConnectingLinePoints: noop,
  connectingLinePoints: null,
});

export const useCanvas = (): API => useContext(CanvasContext);

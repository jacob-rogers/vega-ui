import { createContext, MutableRefObject, useContext } from 'react';
import Konva from 'konva';

import { ActiveData, SelectedData } from '../types';

const noop = (): void => {};

type API = {
  setSelectedData: (newSelected: SelectedData | null) => void;
  setActiveData: (newActive: ActiveData | null) => void;
  setCursor: (newCursor: string) => void;
  stageRef: MutableRefObject<Konva.Stage | null>;
  activeData: ActiveData | null;
  selectedData: SelectedData | null;
  abortActiveData: () => void;
};

export const CanvasContext = createContext<API>({
  stageRef: { current: null },
  setCursor: noop,
  setSelectedData: noop,
  setActiveData: noop,
  activeData: null,
  selectedData: null,
  abortActiveData: noop,
});

export const useCanvas = (): API => useContext(CanvasContext);

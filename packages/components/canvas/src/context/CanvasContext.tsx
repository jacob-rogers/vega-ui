import { createContext, MutableRefObject, useContext } from 'react';

import { CanvasTree } from '../entities';
import { Position } from '../types';

type API = {
  onPositionChange(tree: CanvasTree, position: Position): void;
  updateCursor: (cursor: string) => void;
  stageRef: MutableRefObject<HTMLCanvasElement | null>;
};

export const CanvasContext = createContext<API>({
  onPositionChange: () => {},
  updateCursor: () => {},
  stageRef: { current: null },
});

export const useCanvas = (): API => useContext(CanvasContext);

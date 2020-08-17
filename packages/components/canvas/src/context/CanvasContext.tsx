import { createContext, useContext } from 'react';

import { CanvasTree } from '../entities';
import { Position } from '../types';

type API = {
  onPositionChange(tree: CanvasTree, position: Position): void;
};

export const CanvasContext = createContext<API>({ onPositionChange: () => {} });

export const useCanvas = (): API => useContext(CanvasContext);

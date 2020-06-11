import React, { useContext } from 'react';
import { block } from 'bem-cn';

export const b = block('VegaScalePanel');

export interface ScalePanelAPI {
  currentScale: number;
  zoomIn: () => void;
  zoomOut: () => void;
  inputChange: (value: number) => void;
}

const noop = (): void => {
  // 'mock';
};

export const ScalePanelContext = React.createContext<ScalePanelAPI>({
  currentScale: 100,
  zoomIn: noop,
  zoomOut: noop,
  inputChange: noop,
});

export function useScalePanel(): ScalePanelAPI {
  return useContext(ScalePanelContext);
}

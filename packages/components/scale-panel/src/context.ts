import React, { useContext } from 'react';
import { block } from 'bem-cn';

export const b = block('VegaScalePanel');

export interface ScalePanelAPI {
  currentScale: number;
  stepScale: number;
  zoomIn: () => void;
  zoomOut: () => void;
  inputChange: (value: number) => void;
  setStepScale: (value: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = (): void => {};

export const ScalePanelContext = React.createContext<ScalePanelAPI>({
  currentScale: 100,
  stepScale: 10,
  zoomIn: noop,
  zoomOut: noop,
  setStepScale: noop,
  inputChange: noop,
});

export function useScalePanel(): ScalePanelAPI {
  return useContext(ScalePanelContext);
}

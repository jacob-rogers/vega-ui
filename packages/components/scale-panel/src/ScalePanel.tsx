import React from 'react';

import { OrientationProps, ScalePanelInner } from './ScalePanelInner';

import './ScalePanel.css';

interface ScalePanelProps extends OrientationProps {
  currentScale: number;
  stepScale: number;
  className?: string;
  onChange: (scale: number) => void;
}

const clamp = (min: number, max: number, n: number) => Math.min(max, Math.max(min, n));

export const ScalePanel: React.FC<ScalePanelProps> = (props) => {
  const { onChange, currentScale, stepScale, orientation } = props;

  function zoomOut(): void {
    onChange(clamp(0, 100, currentScale - stepScale));
  }
  function zoomIn(): void {
    onChange(clamp(0, 100, currentScale + stepScale));
  }

  function inputChange(value: number): void {
    if (value > 100 || value < 0) return;
    onChange(value);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = (): void => {};

  return (
    <ScalePanelInner
      currentScale={currentScale}
      stepScale={stepScale}
      orientation={orientation}
      onZoomIn={zoomIn}
      onZoomOut={zoomOut}
      onExpand={noop}
      onWidthMove={noop}
      inputChange={inputChange}
    />
  );
};

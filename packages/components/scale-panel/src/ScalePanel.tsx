import React from 'react';

import { OrientationProps, ScalePanelInner } from './ScalePanelInner';

import './ScalePanel.css';

interface ScalePanelProps extends OrientationProps {
  scale: number;
  step: number;
  className?: string;
  onChange: (scale: number) => void;
  onExpand?: () => void;
  onWidthMove?: () => void;
}

const clamp = (min: number, max: number, n: number): number => Math.min(max, Math.max(min, n));

export const ScalePanel: React.FC<ScalePanelProps> = (props) => {
  const { onChange, scale, step, orientation, onExpand, onWidthMove } = props;

  function handleZoomOut(): void {
    onChange(clamp(0, 100, scale - step));
  }
  function handleZoomIn(): void {
    onChange(clamp(0, 100, scale + step));
  }

  return (
    <ScalePanelInner
      scale={scale}
      step={step}
      orientation={orientation}
      onZoomIn={handleZoomIn}
      onZoomOut={handleZoomOut}
      onExpand={onExpand}
      onWidthMove={onWidthMove}
      onInputValueChange={onChange}
    />
  );
};

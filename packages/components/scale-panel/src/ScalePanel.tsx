import React from 'react';

import { OrientationProps, ScalePanelInner } from './ScalePanelInner';

import './ScalePanel.css';

type DivProps = JSX.IntrinsicElements['div'];

interface ScalePanelProps extends OrientationProps, Omit<DivProps, 'onChange'> {
  scale: number;
  step: number;
  className?: string;
  onChange: (scale: number) => void;
  onExpand?: () => void;
  onFullWidth?: () => void;
  max?: number;
}

const clamp = (min: number, max: number, n: number): number => Math.min(max, Math.max(min, n));

export const ScalePanel: React.FC<ScalePanelProps> = (props) => {
  const { onChange, scale, step, orientation, onExpand, onFullWidth, max = 100, ...rest } = props;

  function handleZoomOut(): void {
    onChange(clamp(0, max, scale - step));
  }
  function handleZoomIn(): void {
    onChange(clamp(0, max, scale + step));
  }

  return (
    <ScalePanelInner
      {...rest}
      scale={scale}
      orientation={orientation}
      onZoomIn={handleZoomIn}
      onZoomOut={handleZoomOut}
      onExpand={onExpand}
      onFullWidth={onFullWidth}
      onInputValueChange={onChange}
    />
  );
};

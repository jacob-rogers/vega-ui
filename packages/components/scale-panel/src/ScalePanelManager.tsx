import React from 'react';

import { ScalePanelAPI, ScalePanelContext } from './context';

interface ScalePanelManagerProps {
  currentScale: number;
  onChange: (scale: number) => void;
}

export const ScalePanelManager: React.FC<ScalePanelManagerProps> = (props) => {
  const { currentScale, children, onChange } = props;
  const clamp = (min: number, max: number, n: number) => Math.min(max, Math.max(min, n));

  function zoomOut(): void {
    onChange(clamp(0, 100, currentScale - 10));
  }
  function zoomIn(): void {
    onChange(clamp(0, 100, currentScale + 10));
  }

  function inputChange(value: number): void {
    if (value > 100 || value < 0) return;
    onChange(value);
  }

  const value: ScalePanelAPI = {
    currentScale,
    zoomOut,
    zoomIn,
    inputChange,
  };

  return <ScalePanelContext.Provider value={value}>{children}</ScalePanelContext.Provider>;
};

import React from 'react';

import { ScalePanelAPI, ScalePanelContext } from './context';

interface ScalePanelManagerProps {
  currentScale: number;
  onChange: (scale: number) => void;
}

export const ScalePanelManager: React.FC<ScalePanelManagerProps> = (props) => {
  const { currentScale, children, onChange } = props;

  function zoomOut(): void {
    return currentScale - 10 < 0 ? onChange(0) : onChange(currentScale - 10);
  }
  function zoomIn(): void {
    return currentScale + 10 > 100 ? onChange(100) : onChange(currentScale + 10);
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

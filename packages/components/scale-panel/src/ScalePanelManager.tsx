import React from 'react';

import { ScalePanelAPI, ScalePanelContext } from './context';

interface ScalePanelManagerProps {
  currentScale: number;
  onChange: (scale: number) => void;
}

export const ScalePanelManager: React.FC<ScalePanelManagerProps> = (props) => {
  const { currentScale, children, onChange } = props;

  function zoomOut(): void {
    if (currentScale === 0) return;
    onChange(currentScale - 10);
  }
  function zoomIn(): void {
    if (currentScale === 100) return;
    onChange(currentScale + 10);
  }

  const value: ScalePanelAPI = {
    currentScale,
    zoomOut,
    zoomIn,
  };

  return <ScalePanelContext.Provider value={value}>{children}</ScalePanelContext.Provider>;
};

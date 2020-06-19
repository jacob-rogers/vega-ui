import React from 'react';

import { ScalePanelAPI, ScalePanelContext } from './context';

interface ScalePanelManagerProps {
  currentScale: number;
  stepScale: number;
  onChange: (scale: number) => void;
  onChangeStep: (step: number) => void;
}

export const ScalePanelManager: React.FC<ScalePanelManagerProps> = (props) => {
  const { currentScale, stepScale, children, onChange, onChangeStep } = props;
  const clamp = (min: number, max: number, n: number) => Math.min(max, Math.max(min, n));

  function zoomOut(): void {
    onChange(clamp(0, 100, currentScale - stepScale));
  }
  function zoomIn(): void {
    console.log('stepScale', stepScale);
    onChange(clamp(0, 100, currentScale + stepScale));
  }

  function inputChange(value: number): void {
    if (value > 100 || value < 0) return;
    onChange(value);
  }

  function setStepScale(value: number): void {
    if (value > 100 || value < 0) return;
    onChangeStep(value);
  }

  const value: ScalePanelAPI = {
    currentScale,
    stepScale,
    zoomOut,
    zoomIn,
    inputChange,
    setStepScale,
  };

  return <ScalePanelContext.Provider value={value}>{children}</ScalePanelContext.Provider>;
};

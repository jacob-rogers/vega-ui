import React from 'react';

import { OrientationProps, ScalePanelInner } from './ScalePanelInner';
import { ScalePanelManager } from './ScalePanelManager';

import './ScalePanel.css';

interface ScalePanelProps extends React.ComponentProps<typeof ScalePanelManager>, OrientationProps {
  currentScale: number;
  stepScale: number;
  className?: string;
  onChange: (scale: number) => void;
  onChangeStep: (step: number) => void;
}

export const ScalePanel: React.FC<ScalePanelProps> = (props) => {
  const { onChange, onChangeStep, currentScale, stepScale, orientation } = props;

  return (
    <ScalePanelManager
      currentScale={currentScale}
      stepScale={stepScale}
      onChange={onChange}
      onChangeStep={onChangeStep}
    >
      <ScalePanelInner
        currentScale={currentScale}
        stepScale={stepScale}
        orientation={orientation}
      />
    </ScalePanelManager>
  );
};

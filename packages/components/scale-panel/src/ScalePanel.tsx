import React from 'react';

import { ScalePanelInner } from './ScalePanelInner';
import { ScalePanelManager } from './ScalePanelManager';

import './ScalePanel.css';

interface ScalePanelProps extends React.ComponentProps<typeof ScalePanelManager> {
  currentScale: number;
  className?: string;
  columnPanel: boolean;
  onChange: (scale: number) => void;
}

export const ScalePanel: React.FC<ScalePanelProps> = (props) => {
  const { onChange, currentScale, columnPanel } = props;

  return (
    <ScalePanelManager currentScale={currentScale} onChange={onChange}>
      <ScalePanelInner currentScale={currentScale} columnPanel={columnPanel} />
    </ScalePanelManager>
  );
};

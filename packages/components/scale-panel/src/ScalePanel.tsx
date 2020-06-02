import React from 'react';
import { block } from 'bem-cn';

import './ScalePanel.css';

export const cnScalePanel = block('VegaScalePanel');

export type ScalePanelProps = {
  className?: string;
};

export const ScalePanel: React.FC<ScalePanelProps> = ({ className, children, ...rest }) => {
  return (
    <div className={cnScalePanel.mix(className)} {...rest}>
      {children}
    </div>
  );
};

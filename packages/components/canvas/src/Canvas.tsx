import React from 'react';
import { block } from 'bem-cn';

import './Canvas.css';

export type CanvasProps = {
  title?: string;
  className?: string;
};

const cnCanvas = block('VegaCanvas');

export const Canvas: React.FC<CanvasProps> = ({ title = 'default', className }) => {
  return <div className={cnCanvas.mix(className)}>Title: {title}</div>;
};

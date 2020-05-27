import React from 'react';

import { DragHandlers } from './types/DragHandlers';
import { cnDragAndDrop } from './cn-drag-and-drop';

import './DragAndDrop.css';

export type DragAndDropFullscreenProps = {
  className?: string;
  show?: boolean;
} & DragHandlers &
  JSX.IntrinsicElements['div'];

export const DragAndDropFullscreen: React.FC<DragAndDropFullscreenProps> = ({
  title = 'default',
  className,
}) => {
  return <div className={cnDragAndDrop.mix(className)}>Title: {title}</div>;
};

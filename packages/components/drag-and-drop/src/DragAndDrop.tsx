import React from 'react';

import { DragHandlers } from './types/DragHandlers';
import { cnDragAndDrop } from './cn-drag-and-drop';

import './DragAndDrop.css';

export type DragAndDropProps = {
  title?: string;
  className?: string;
  withFileInput?: boolean;
} & DragHandlers &
  JSX.IntrinsicElements['div'];

export const DragAndDrop: React.FC<DragAndDropProps> = ({ title = 'default', className }) => {
  return <div className={cnDragAndDrop.mix(className)}>Title: {title}</div>;
};

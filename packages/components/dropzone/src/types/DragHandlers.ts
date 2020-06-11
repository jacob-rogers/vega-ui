import React from 'react';

export type DropzoneDragEvent = DragEvent | React.DragEvent<HTMLDivElement>;

export type ReactDragEventHandler = (e: DropzoneDragEvent) => void;

export type DragHandlers = {
  onDragStart?: ReactDragEventHandler;
  onDragEnd?: ReactDragEventHandler;
  onDragOver?: ReactDragEventHandler;
  onDragEnter?: ReactDragEventHandler;
  onDragLeave?: ReactDragEventHandler;
  onDragExit?: ReactDragEventHandler;
  onDrop?: (e: DropzoneDragEvent | React.ChangeEvent<HTMLInputElement>) => void;
};

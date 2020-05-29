import { DragEvent } from 'react';

export type ReactDivDragEvent = DragEvent<HTMLDivElement>;

export type ReactDragEventHandler = (e: ReactDivDragEvent) => void;

export type DragHandlers = {
  onDragStart?: ReactDragEventHandler;
  onDragEnd?: ReactDragEventHandler;
  onDragOver?: ReactDragEventHandler;
  onDragEnter?: ReactDragEventHandler;
  onDragLeave?: ReactDragEventHandler;
  onDragExit?: ReactDragEventHandler;
  onDrop?: ReactDragEventHandler;
};

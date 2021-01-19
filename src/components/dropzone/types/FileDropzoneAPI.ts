import { ChangeEvent } from 'react';

import { DropzoneDragEvent, ReactDragEventHandler } from './DragHandlers';

export type FileDropzoneAPI = {
  withFullscreen?: boolean;
  fullscreenVisible: boolean;
  inDropArea: boolean;
  handleDragEnter: ReactDragEventHandler;
  handleDragLeave: ReactDragEventHandler;
  handleDragOver: ReactDragEventHandler;
  handleDrop: (e: DropzoneDragEvent | ChangeEvent) => void;
};

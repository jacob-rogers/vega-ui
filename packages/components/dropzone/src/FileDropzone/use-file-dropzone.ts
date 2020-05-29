import React, { useState } from 'react';

import { DragHandlers, FileDropzoneAPI, ReactDivDragEvent, ReactDragEventHandler } from '../types';

type ReactInputChangeEvent = React.ChangeEvent<HTMLInputElement>;
type LoadEvent = ReactDivDragEvent | ReactInputChangeEvent;

type FileDropzoneOptions = {
  withFullscreen?: boolean;
};

type Handlers = DragHandlers & {
  onLoad?: (e: LoadEvent) => void;
};

export const useFileDropzone = (
  handlers: Handlers = {},
  options: FileDropzoneOptions = {},
): FileDropzoneAPI => {
  const [fullscreenVisible, setFullscreenVisible] = useState(false);

  const closeFullscreenVisible = (): void => {
    if (fullscreenVisible) {
      setFullscreenVisible(false);
    }
  };

  const handleDragEnter: ReactDragEventHandler = (e) => {
    e.preventDefault();
    if (options.withFullscreen && !fullscreenVisible) {
      setFullscreenVisible(true);
    }
    if (handlers.onDragEnter) {
      handlers.onDragEnter(e);
    }
  };

  const handleDragLeave: ReactDragEventHandler = (e) => {
    e.preventDefault();
    closeFullscreenVisible();
    if (handlers.onDragLeave) {
      handlers.onDragLeave(e);
    }
  };

  const handleDragOver: ReactDragEventHandler = (e) => {
    e.preventDefault();
    if (handlers.onDragOver) {
      handlers.onDragOver(e);
    }
  };

  const handleLoad = (e: LoadEvent): void => {
    e.preventDefault();
    closeFullscreenVisible();
    if (handlers.onLoad) {
      handlers.onLoad(e);
    }
  };

  return {
    fullscreenVisible,
    closeFullscreenVisible,
    handleDragOver,
    handleLoad,
    handleDragEnter,
    handleDragLeave,
  };
};

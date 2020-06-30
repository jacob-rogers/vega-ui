import { ChangeEvent, useState } from 'react';

import { DropzoneDragEvent, FileDropzoneAPI, ReactDragEventHandler } from '../types';

type FileDropzoneOptions = {
  withFullscreen?: boolean;
};

type Handlers = {
  onDrop: (files: FileList | null) => void;
  onDragEnter?: (e: DropzoneDragEvent) => void;
  onDragLeave?: (e: DropzoneDragEvent) => void;
};

export const useFileDropzone = (
  handlers: Handlers,
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
    e.stopPropagation();
    if (options.withFullscreen && !fullscreenVisible) {
      setFullscreenVisible(true);
    }
    if (handlers.onDragEnter) {
      handlers.onDragEnter(e);
    }
  };

  const handleDragLeave: ReactDragEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeFullscreenVisible();
    if (handlers.onDragLeave) {
      handlers.onDragLeave(e);
    }
  };

  const handleDragOver: ReactDragEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
    }
  };

  const handleDrop = (e: DropzoneDragEvent | ChangeEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    closeFullscreenVisible();
    if (e.target instanceof HTMLInputElement) {
      handlers.onDrop(e.target.files);
    }

    if ('dataTransfer' in e && e.dataTransfer) {
      handlers.onDrop(e.dataTransfer.files);
    }
  };

  return {
    withFullscreen: options.withFullscreen,
    fullscreenVisible,
    handleDragOver,
    handleDrop,
    handleDragEnter,
    handleDragLeave,
  };
};

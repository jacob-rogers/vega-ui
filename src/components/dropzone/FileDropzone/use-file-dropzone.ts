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

  const [inDropArea, setInDropArea] = useState(false);

  const closeFullscreenVisible = (): void => {
    /* istanbul ignore else */
    if (fullscreenVisible) {
      setFullscreenVisible(false);
    }
  };

  const closeDropArea = (): void => {
    /* istanbul ignore else */
    if (inDropArea) {
      setInDropArea(false);
    }
  };

  const handleDragEnter: ReactDragEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    /* istanbul ignore else */
    if (!fullscreenVisible && options.withFullscreen) {
      setFullscreenVisible(true);
    }
    /* istanbul ignore else */
    if (!inDropArea) {
      setInDropArea(true);
    }
    /* istanbul ignore else */
    if (handlers.onDragEnter) {
      handlers.onDragEnter(e);
    }
  };

  const handleDragLeave: ReactDragEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeFullscreenVisible();
    closeDropArea();
    /* istanbul ignore else */
    if (handlers.onDragLeave) {
      handlers.onDragLeave(e);
    }
  };

  const handleDragOver: ReactDragEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    /* istanbul ignore else */
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
      e.dataTransfer.effectAllowed = 'copy';
    }
  };

  const handleDrop = (e: DropzoneDragEvent | ChangeEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    closeFullscreenVisible();
    closeDropArea();
    /* istanbul ignore else */
    if (e.target instanceof HTMLInputElement) {
      handlers.onDrop(e.target.files);
    }

    /* istanbul ignore else */
    if ('dataTransfer' in e && e.dataTransfer) {
      handlers.onDrop(e.dataTransfer.files);
    }
  };

  return {
    withFullscreen: options.withFullscreen,
    fullscreenVisible,
    inDropArea,
    handleDragOver,
    handleDrop,
    handleDragEnter,
    handleDragLeave,
  };
};

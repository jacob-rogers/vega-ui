import { ChangeEvent, useState } from 'react';

import { DropzoneDragEvent, FileDropzoneAPI, ReactDragEventHandler } from '../types';

type FileDropzoneOptions = {
  withFullscreen?: boolean;
};

export const useFileDropzone = (
  onDrop: (files: FileList | null) => void,
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
  };

  const handleDragLeave: ReactDragEventHandler = (e) => {
    e.preventDefault();
    closeFullscreenVisible();
  };

  const handleDragOver: ReactDragEventHandler = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e: DropzoneDragEvent | ChangeEvent): void => {
    e.preventDefault();
    closeFullscreenVisible();
    if (e.target instanceof HTMLInputElement) {
      onDrop(e.target.files);
    }

    if ('dataTransfer' in e && e.dataTransfer) {
      onDrop(e.dataTransfer.files);
    }
  };

  return {
    fullscreenVisible,
    handleDragOver,
    handleDrop,
    handleDragEnter,
    handleDragLeave,
  };
};

import React from 'react';

import { Dropzone } from '../Dropzone';

import { FileDropzoneInput } from './FileDropzoneInput';
import { useFileDropzoneProvider } from './FileDropzoneProvider';

type FileDropzone<T> = React.FC<T> & {
  Fullscreen: typeof FileDropzoneFullscreen;
  Input: typeof FileDropzoneInput;
};

type FileDropzoneProps = {
  children: React.ReactNode;
  className?: string;
};

export const FileDropzone: FileDropzone<FileDropzoneProps> = (props) => {
  const { children, className } = props;
  const {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleLoad,
  } = useFileDropzoneProvider();

  const dropzoneProps = {
    className,
    children,
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDragEnter: handleDragEnter,
    onDrop: handleLoad,
  };

  return <Dropzone {...dropzoneProps} />;
};

FileDropzone.Input = FileDropzoneInput;

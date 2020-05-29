import React from 'react';

import { Dropzone } from '../Dropzone';

import { FileDropzoneInput } from './FileDropzoneInput';
import { FileDropzoneProvider } from './FileDropzoneProvider';
import { useFileDropzoneProvider } from './use-file-dropzone-provider';

type FileDropzoneProps = {
  children: React.ReactNode;
  className?: string;
  show?: boolean;
  fullscreen?: boolean;
};

type FileDropzone<T> = React.FC<T> & {
  Fullscreen: React.FC<FileDropzoneProps>;
  Input: typeof FileDropzoneInput;
  Provider: typeof FileDropzoneProvider;
};

export const FileDropzone: FileDropzone<FileDropzoneProps> = (props) => {
  const { children, className, show = true, fullscreen = false } = props;
  const {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleLoad,
  } = useFileDropzoneProvider();

  const dropzoneProps: React.ComponentProps<typeof Dropzone> = {
    className,
    children,
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDragEnter: handleDragEnter,
    onDrop: handleLoad,
    show,
    fullscreen,
  };

  return <Dropzone {...dropzoneProps} />;
};

const FileDropzoneFullscreen: React.FC<FileDropzoneProps> = (props) => {
  const { fullscreenVisible } = useFileDropzoneProvider();

  return <FileDropzone show={fullscreenVisible} fullscreen {...props} />;
};

FileDropzone.Fullscreen = FileDropzoneFullscreen;

FileDropzone.Input = FileDropzoneInput;

FileDropzone.Provider = FileDropzoneProvider;

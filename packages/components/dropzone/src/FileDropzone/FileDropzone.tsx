import React from 'react';

import { Dropzone } from '../Dropzone';

import { FileDropzoneInput } from './FileDropzoneInput';
import { FileDropzoneContext } from './FileDropzoneProvider';
import { useFileDropzone } from './use-file-dropzone';
import { useFileDropzoneProvider } from './use-file-dropzone-provider';

export type FileDropzoneProps = {
  children: React.ReactNode;
  className?: string;
  show?: boolean;
  fullscreen?: boolean;
  onDrop: (files: FileList | null) => void;
};

type FileDropzoneContentProps = Omit<FileDropzoneProps, 'onDrop'>;

type FileDropzone<T> = React.FC<T> & {
  Fullscreen: React.FC<FileDropzoneContentProps>;
  Input: typeof FileDropzoneInput;
};

const FileDropzoneContent: React.FC<FileDropzoneContentProps> = (props) => {
  const { children, className, show = true, fullscreen = false } = props;
  const {
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useFileDropzoneProvider();

  const dropzoneProps: React.ComponentProps<typeof Dropzone> = {
    className,
    children,
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDragEnter: handleDragEnter,
    onDrop: handleDrop,
    show,
    fullscreen,
  };

  return <Dropzone {...dropzoneProps} />;
};

const FileDropzoneFullscreen: React.FC<React.ComponentProps<typeof FileDropzoneContent>> = (
  props,
) => {
  const { fullscreenVisible } = useFileDropzoneProvider();

  return <FileDropzoneContent show={fullscreenVisible} fullscreen {...props} />;
};

export const FileDropzone: FileDropzone<FileDropzoneProps> = ({ onDrop, fullscreen, ...rest }) => {
  const api = useFileDropzone(onDrop, { withFullscreen: fullscreen });

  return (
    <FileDropzoneContext.Provider value={api}>
      <FileDropzoneContent {...rest} />
    </FileDropzoneContext.Provider>
  );
};

FileDropzone.Fullscreen = FileDropzoneFullscreen;

FileDropzone.Input = FileDropzoneInput;

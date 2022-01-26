import React from 'react';

import { Dropzone, DropzoneContext } from '../Dropzone';
import { DropzoneDragEvent } from '../types';

import { FileDropzoneContext, useFileDropzoneProvider } from './FileDropzoneContext';
import { FileDropzoneInput } from './FileDropzoneInput';
import { useFileDropzone } from './use-file-dropzone';

export type FileDropzoneProps = {
  children: React.ReactNode;
  className?: string;
  show?: boolean;
  fullscreen?: boolean;
  onDrop: (files: FileList | null) => void;
  onDragEnter?: (e: DropzoneDragEvent) => void;
  onDragLeave?: (e: DropzoneDragEvent) => void;
};

type FileDropzoneContentProps = Omit<FileDropzoneProps, 'onDrop' | 'onDragEnter' | 'onDragLeave'>;

type FileDropzoneFullscreenProps = FileDropzoneContentProps & { portal?: HTMLDivElement | null };

type FileDropzoneType<T> = React.FC<T> & {
  Fullscreen: React.FC<FileDropzoneFullscreenProps>;
  Input: typeof FileDropzoneInput;
};

const FileDropzoneContent: React.FC<FileDropzoneContentProps> = (props) => {
  const { children, className, show = true, fullscreen = false } = props;
  const { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, inDropArea } =
    useFileDropzoneProvider();

  const dropzoneProps: React.ComponentProps<typeof Dropzone> = {
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDragEnter: handleDragEnter,
    onDrop: handleDrop,
  };

  return (
    <Dropzone
      inDropArea={inDropArea}
      className={className}
      show={show}
      fullscreen={fullscreen}
      {...dropzoneProps}
    >
      {children}
    </Dropzone>
  );
};

const FileDropzoneFullscreen: React.FC<FileDropzoneFullscreenProps> = ({ portal, ...rest }) => {
  const { fullscreenVisible } = useFileDropzoneProvider();

  return (
    <DropzoneContext.Provider value={{ portal }}>
      <FileDropzoneContent show={fullscreenVisible} fullscreen {...rest} />
    </DropzoneContext.Provider>
  );
};

export const FileDropzone: FileDropzoneType<FileDropzoneProps> = ({
  onDrop,
  onDragEnter,
  onDragLeave,
  fullscreen,
  ...rest
}) => {
  const api = useFileDropzone({ onDrop, onDragEnter, onDragLeave }, { withFullscreen: fullscreen });

  return (
    <FileDropzoneContext.Provider value={api}>
      <FileDropzoneContent {...rest} />
    </FileDropzoneContext.Provider>
  );
};

FileDropzone.Fullscreen = FileDropzoneFullscreen;

FileDropzone.Input = FileDropzoneInput;

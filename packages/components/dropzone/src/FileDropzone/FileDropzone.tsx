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
  portalSelector?: string;
  onDrop: (files: FileList | null) => void;
  onDragEnter?: (e: DropzoneDragEvent) => void;
  onDragLeave?: (e: DropzoneDragEvent) => void;
};

type FileDropzoneContentProps = Omit<FileDropzoneProps, 'onDrop' | 'onDragEnter' | 'onDragLeave'>;

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
    withFullscreen,
  } = useFileDropzoneProvider();

  const dropzoneProps: React.ComponentProps<typeof Dropzone> = {
    onDragLeave: handleDragLeave,
    onDragOver: handleDragOver,
    onDragEnter: handleDragEnter,
    onDrop: handleDrop,
  };

  const getProps = (): Partial<React.ComponentProps<typeof Dropzone>> => {
    if (withFullscreen) {
      return fullscreen ? dropzoneProps : {};
    }

    return dropzoneProps;
  };

  return (
    <Dropzone className={className} show={show} fullscreen={fullscreen} {...getProps()}>
      {children}
    </Dropzone>
  );
};

const FileDropzoneFullscreen: React.FC<FileDropzoneContentProps> = (props) => {
  const { fullscreenVisible } = useFileDropzoneProvider();

  return <FileDropzoneContent show={fullscreenVisible} fullscreen {...props} />;
};

export const FileDropzone: FileDropzone<FileDropzoneProps> = ({
  onDrop,
  onDragEnter,
  onDragLeave,
  fullscreen,
  portalSelector = 'body',
  ...rest
}) => {
  const api = useFileDropzone({ onDrop, onDragEnter, onDragLeave }, { withFullscreen: fullscreen });

  return (
    <FileDropzoneContext.Provider value={api}>
      <DropzoneContext.Provider value={{ portalSelector }}>
        <FileDropzoneContent {...rest} />
      </DropzoneContext.Provider>
    </FileDropzoneContext.Provider>
  );
};

FileDropzone.Fullscreen = FileDropzoneFullscreen;

FileDropzone.Input = FileDropzoneInput;

import React, { useState } from 'react';
import { FileInput } from '@gpn-prototypes/vega-file-input';
import {
  FileIconDoc,
  FileIconMp4,
  FileIconPdf,
  FileIconPtt as FileIconPpt,
  FileIconXls,
  IconAttach,
} from '@gpn-prototypes/vega-icons';
import block from 'bem-cn';

import { Dropzone } from '../Dropzone';

import './FileDropzone.css';

type ReactDragEvent = React.DragEvent<HTMLDivElement>;
type ReactInputChangeEvent = React.ChangeEvent<HTMLInputElement>;

type LoadEvent = ReactDragEvent | ReactInputChangeEvent;

const cnFileDropzone = block('FileDropzone');

type FileDropzone<T> = React.FC<T> & {
  DocIcons: typeof FileDropzoneDocIcons;
  Fullscreen: typeof FileDropzoneFullscreen;
  Input: typeof FileDrozoneInput;
};

type FileDropzoneProps = {
  onLoad: (e: LoadEvent) => void;
  withFileInput?: boolean;
  withDocIcons?: { fullscreen?: boolean; main?: boolean };
  withFullscreen?: boolean;
  fullscreenContent?: React.ReactNode;
  mainContent?: React.ReactNode;
  className?: string;
};

export const FileDropzone: React.FC<FileDropzoneProps> = (props) => {
  const {
    withFullscreen,
    onLoad,
    mainContent,
    withFileInput,
    withDocIcons,
    fullscreenContent,
  } = props;
  const [fullscreenVisible, setFullscreenVisible] = useState(false);

  const closeFullscreenVisible = (): void => {
    if (fullscreenVisible) {
      setFullscreenVisible(false);
    }
  };

  const handleDragEnter = (e: ReactDragEvent): void => {
    e.preventDefault();
    if (withFullscreen && !fullscreenVisible) {
      setFullscreenVisible(true);
    }
  };

  const handleDragLeave = (e: ReactDragEvent): void => {
    e.preventDefault();
    closeFullscreenVisible();
  };

  const handleDragOver = (e: ReactDragEvent): void => e.preventDefault();

  const handleLoad = (e: LoadEvent): void => {
    e.preventDefault();
    closeFullscreenVisible();
    onLoad(e);
  };

  const DocIcons = (
    <div className={cnFileDropzone('Docs')}>
      <FileIconDoc size="m" />
      <FileIconXls size="m" />
      <FileIconPpt size="m" />
      <FileIconPdf size="m" />
      <FileIconMp4 size="m" />
    </div>
  );

  const dropzoneProps = {
    onDragEnter: handleDragEnter,
    onDragOver: handleDragOver,
    onDrop: handleLoad,
    onDragLeave: handleDragLeave,
  };

  const FullscreenContent = withFullscreen && (
    <Dropzone {...dropzoneProps} fullscreen show={fullscreenVisible}>
      {withDocIcons && DocIcons}
      {fullscreenContent}
    </Dropzone>
  );

  return (
    <>
      <Dropzone {...dropzoneProps}>
        {mainContent}
        {withFileInput && (
          <FileInput
            id="file-dropzone-input"
            onChange={handleLoad}
            view="ghost"
            size="s"
            iconSize="xs"
            iconLeft={IconAttach}
          >
            Загрузить файл
          </FileInput>
        )}
      </Dropzone>
      {FullscreenContent}
    </>
  );
};

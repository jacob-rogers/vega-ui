import React, { DragEventHandler } from 'react';
import { usePortalRender } from '@gpn-prototypes/vega-root';

import { DragHandlers } from '../types';

import { cnDropzone } from './cn-dropzone';
import { useDropzoneContext } from './DropzoneContext';

import './Dropzone.css';

export type DropzoneProps = {
  className?: string;
  children?: React.ReactNode;
  show?: boolean;
  fullscreen?: boolean;
  inDropArea?: boolean;
} & DragHandlers &
  JSX.IntrinsicElements['div'];

type EventKeys =
  | 'onDragOver'
  | 'onDragEnd'
  | 'onDragLeave'
  | 'onDragExit'
  | 'onDrop'
  | 'onDragEnter'
  | 'onDragStart';

type DropzoneEvents = {
  [k in EventKeys]: DragEventHandler;
};

export const Dropzone: React.FC<DropzoneProps> = (props) => {
  const defaultDragHandler = (): void => {};
  const {
    className,
    children,
    onDragEnd = defaultDragHandler,
    onDragExit = defaultDragHandler,
    onDragOver = defaultDragHandler,
    onDragStart = defaultDragHandler,
    onDragEnter = defaultDragHandler,
    onDragLeave = defaultDragHandler,
    onDrop = defaultDragHandler,
    fullscreen = false,
    inDropArea = false,
    show = true,
    ...rest
  } = props;

  const { portal = document.body } = useDropzoneContext();

  const { renderPortalWithTheme } = usePortalRender();

  React.useEffect(() => {
    if (fullscreen) {
      document.addEventListener('dragenter', onDragEnter);
    }

    return (): void => {
      document.removeEventListener('dragenter', onDragEnter);
    };
  }, [fullscreen, onDragEnter]);

  const dropzoneClassName = fullscreen
    ? cnDropzone.state({ fullscreen, droparea: inDropArea })
    : cnDropzone.state({ droparea: inDropArea });

  const eventProps = {
    onDragOver,
    onDragEnd,
    onDragExit,
    onDrop,
    onDragStart,
    onDragEnter,
    onDragLeave,
  };

  const getProps = (): Partial<DropzoneEvents> => {
    if (fullscreen) {
      return {};
    }

    return eventProps;
  };

  const content = (
    <div className={dropzoneClassName.mix(className)} {...getProps()} {...rest}>
      <div className={cnDropzone('Content')}>{children}</div>
    </div>
  );

  if (portal && fullscreen) {
    return renderPortalWithTheme(
      <div {...eventProps} className={cnDropzone('Overlay').state({ visible: show })}>
        {content}
      </div>,
      portal,
    );
  }

  if (portal === null && fullscreen) {
    return null;
  }

  return content;
};

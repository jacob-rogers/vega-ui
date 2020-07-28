import React from 'react';
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

  const baseDropzoneClassName = cnDropzone({ activated: inDropArea });

  const dropzoneClassName = fullscreen
    ? baseDropzoneClassName.state({ fullscreen })
    : baseDropzoneClassName;

  const eventProps = {
    onDragOver,
    onDragEnd,
    onDragExit,
    onDrop,
    onDragStart,
    onDragEnter,
    onDragLeave,
  };

  const contentProps: DropzoneProps = fullscreen ? {} : eventProps;

  const content = (
    <div className={dropzoneClassName.mix(className)} {...contentProps} {...rest}>
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

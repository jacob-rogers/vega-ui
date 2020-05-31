import React from 'react';
import { createPortal } from 'react-dom';
import { usePortalDomNode } from '@gpn-prototypes/vega-hooks';

import { DragHandlers } from '../types';

import { cnDragAndDrop } from './cn-dropzone';

import './Dropzone.css';

export type DropzoneProps = {
  className?: string;
  children?: React.ReactNode;
  show?: boolean;
  fullscreen?: boolean;
  portalSelector?: string;
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
    portalSelector = 'body',
    fullscreen = false,
    show = true,
    ...rest
  } = props;

  const portalNode = usePortalDomNode(portalSelector);

  React.useEffect(() => {
    if (fullscreen) {
      document.addEventListener('dragenter', onDragEnter);
    }

    return (): void => {
      document.removeEventListener('dragenter', onDragEnter);
    };
  });

  const dropzoneClassName = fullscreen ? cnDragAndDrop.state({ fullscreen }) : cnDragAndDrop;

  const eventsProps = {
    onDragOver,
    onDragEnd,
    onDragEnter,
    onDragExit,
    onDrop,
    onDragLeave,
    onDragStart,
  };

  const content = (
    <div className={dropzoneClassName.mix(className)} {...eventsProps} {...rest}>
      <div className={cnDragAndDrop('Content')}>{children}</div>
    </div>
  );

  if (portalNode && fullscreen) {
    return createPortal(
      <div className={cnDragAndDrop('Overlay').state({ visible: show })}>{content}</div>,
      portalNode,
    );
  }

  return content;
};

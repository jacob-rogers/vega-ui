import React from 'react';
import { createPortal } from 'react-dom';
import { usePortalDomNode } from '@gpn-prototypes/vega-hooks';

import { DragHandlers, ReactDragEventHandler } from '../types';

import { cnDragAndDrop } from './cn-dropzone';

import './Dropzone.css';

export type DropzoneProps = {
  className?: string;
  children?: React.ReactNode;
  show?: boolean;
  fullscreen?: boolean;
  portalSelector?: string;
} & DragHandlers;

type DragEventKey =
  | 'dragend'
  | 'dragenter'
  | 'dragleave'
  | 'drop'
  | 'dragexit'
  | 'dragover'
  | 'dragstart';

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
  } = props;

  const events: Record<DragEventKey, EventListener | ReactDragEventHandler> = {
    dragend: onDragEnd,
    dragenter: onDragEnter,
    dragleave: onDragLeave,
    drop: onDrop,
    dragexit: onDragExit,
    dragover: onDragOver,
    dragstart: onDragStart,
  };

  const eventKeys: DragEventKey[] | string[] = Object.keys(events);
  const portalNode = usePortalDomNode(portalSelector);

  React.useEffect(() => {
    if (fullscreen) {
      eventKeys.forEach((key: DragEventKey | string) => {
        const eventKey = key as DragEventKey;
        document.addEventListener(key, events[eventKey] as EventListener);
      });
    }

    return (): void => {
      eventKeys.forEach((key: DragEventKey | string) => {
        const eventKey = key as DragEventKey;
        document.removeEventListener(key, events[eventKey] as EventListener);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show) {
    return null;
  }

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
    <div className={dropzoneClassName.mix(className)} {...eventsProps}>
      <div className={cnDragAndDrop('Description')}>{children}</div>
    </div>
  );

  if (fullscreen && portalNode) {
    return createPortal(<div className={cnDragAndDrop('Overlay')}>{content}</div>, portalNode);
  }

  return content;
};

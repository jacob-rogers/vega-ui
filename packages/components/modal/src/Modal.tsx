import React, { useRef } from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { PossibleCloseEvent as CloseEvent, useRootClose } from '@gpn-prototypes/vega-hooks';
import { IconClose } from '@gpn-prototypes/vega-icons';
import { usePortalRender } from '@gpn-prototypes/vega-root';

import { cnModal } from './cn-modal';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';

import './Modal.css';

type DivProps = JSX.IntrinsicElements['div'];

type PossibleCloseEvent = CloseEvent | React.SyntheticEvent;

export type ModalProps = {
  onClose: (e: PossibleCloseEvent) => void;
  isOpen?: boolean;
  hasCloseButton?: boolean;
  children?: React.ReactNode;
  hasOverlay?: boolean;
  onOverlayClick?: React.EventHandler<React.MouseEvent>;
  portal?: HTMLDivElement | null;
  className?: string;
};

interface Modal<T> extends React.FC<T>, DivProps {
  Header: typeof ModalHeader;
  Footer: typeof ModalFooter;
  Body: typeof ModalBody;
}

export const Modal: Modal<ModalProps> = (props) => {
  const {
    hasCloseButton,
    onClose,
    children,
    onOverlayClick,
    isOpen,
    hasOverlay,
    portal = document.body,
    className,
    ...rest
  } = props;
  const ref = useRef<HTMLDivElement | null>(null);

  const { renderPortalWithTheme } = usePortalRender();

  const onCloseModal = (e: PossibleCloseEvent): void => {
    if (isOpen) {
      onClose(e);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent): void => {
    if (onOverlayClick) {
      onOverlayClick(e);
    }
  };

  useRootClose(ref, onCloseModal);

  if (!portal || !isOpen) {
    return null;
  }

  return renderPortalWithTheme(
    <>
      <div
        {...rest}
        aria-modal="true"
        role="dialog"
        ref={ref}
        className={cnModal('Root').mix(className)}
      >
        {hasCloseButton && (
          <Button
            aria-label="Кнопка закрытия модального окна"
            className={cnModal('CloseButton').toString()}
            view="ghost"
            type="button"
            onClick={onCloseModal}
            onlyIcon
            iconLeft={IconClose}
            iconSize="s"
          />
        )}
        {children}
      </div>
      {hasOverlay && (
        <button
          aria-label="Оверлей модального окна"
          type="button"
          onClick={handleOverlayClick}
          className={cnModal('Overlay')}
        />
      )}
    </>,
    portal,
  );
};

Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;
Modal.Body = ModalBody;

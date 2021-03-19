import React, { useState } from 'react';

import { ContextMenuTarget } from '../../types';

type useContextMenuProps = {
  enabled: boolean;
};

type contextMenuApi = {
  callerRef: React.RefObject<HTMLElement> | null;
  menuCoordinates?: {
    left: string | number;
    top: string | number;
  };
  isOpen: boolean;
  open: (event: React.MouseEvent, target: ContextMenuTarget) => void;
  close: () => void;
};

export const useContextMenu = ({ enabled }: useContextMenuProps): contextMenuApi => {
  const [isOpen, setIsOpen] = useState(false);
  const [callerRef, setCallerRef] = useState<React.RefObject<HTMLElement> | null>(null);
  const [menuCoordinates, setCoordinates] = useState<{
    left: string | number;
    top: string | number;
  }>({ left: 0, top: 0 });

  const open = (event: React.MouseEvent, target: ContextMenuTarget): void => {
    if (!enabled) {
      return;
    }

    event.preventDefault();

    setCallerRef(target.ref);
    setCoordinates({
      left: event.clientX,
      top: event.clientY,
    });

    setIsOpen(true);
  };

  const close = (): void => {
    setIsOpen(false);
  };

  return {
    isOpen,
    callerRef,
    menuCoordinates,
    open,
    close,
  };
};

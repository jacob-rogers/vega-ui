import React from 'react';

type DropdownAPI = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
};

export const useDropdown = (): DropdownAPI => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = React.useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const close = React.useCallback(() => setIsOpen(false), []);
  const open = React.useCallback(() => setIsOpen(true), []);

  return {
    isOpen,
    toggle,
    open,
    close,
  };
};

import React from 'react';

type API = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  close(): void;
};

export const useClose = (initialOpen = false): API => {
  const [isOpen, setIsOpen] = React.useState(initialOpen);

  const close = (): void => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return { isOpen, setIsOpen, close };
};

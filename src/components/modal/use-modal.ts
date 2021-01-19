import { useCallback, useMemo, useState } from 'react';

type ModalAPI = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export function useModal({ initialOpen = false } = {}): ModalAPI {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return useMemo(
    () => ({
      isOpen,
      open,
      close,
    }),
    [close, open, isOpen],
  );
}

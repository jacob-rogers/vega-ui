import { useCallback, useMemo, useState } from 'react';

type ResultType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export function useSidebar({ initialState = false } = {}): ResultType {
  const [isOpen, setIsOpen] = useState(initialState);
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

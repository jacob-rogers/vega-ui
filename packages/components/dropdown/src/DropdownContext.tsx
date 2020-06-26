import React, { useContext } from 'react';

export interface DropdownContextValue {
  portalId?: string;
  isOpen: boolean;
  onlyOpen: boolean;
  toggle(event: React.SyntheticEvent): void;
  clickOutside(): void;
  triggerProps: {
    triggerElement: HTMLElement | null;
    setTriggerElement: (ref: HTMLElement | null) => void;
  };
  menuProps: {
    menuElement: HTMLElement | null;
    setMenuElement: (ref: HTMLElement | null) => void;
    style: React.CSSProperties;
    attributes: { [key: string]: string };
  };
}

const noop = (): void => {};

export const DropdownContext = React.createContext<DropdownContextValue>({
  onlyOpen: true,
  isOpen: false,
  portalId: undefined,
  toggle: noop,
  clickOutside: noop,
  triggerProps: {
    triggerElement: null,
    setTriggerElement: (): void => {},
  },
  menuProps: {
    menuElement: null,
    setMenuElement: (): void => {},
    style: {},
    attributes: {},
  },
});

export function useDropdown(): DropdownContextValue {
  return useContext(DropdownContext);
}

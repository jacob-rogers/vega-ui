import React from 'react';

import { useDropdown } from '../../DropdownContext';

export type DropdownTriggerChildrenProps = {
  toggle(event: React.SyntheticEvent): void;
  isOpen: boolean;
  props: {
    ref: (ref: HTMLElement | null) => void;
  };
};

type DropdownTriggerProps = {
  children: (childrenProps: DropdownTriggerChildrenProps) => React.ReactNode;
};

export const DropdownTrigger: React.FC<DropdownTriggerProps> = (props) => {
  const {
    isOpen,
    toggle,
    triggerProps: { setTriggerElement },
  } = useDropdown();

  return <>{props.children({ toggle, isOpen, props: { ref: setTriggerElement } })}</>;
};

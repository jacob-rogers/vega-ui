import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import { Placement } from '@popperjs/core';

import { DropdownMenu, DropdownTrigger } from './components';
import { DropdownContext, DropdownContextValue } from './DropdownContext';

export type DropdownPlacement = Placement;

export type DropdownProps = {
  isOpen?: boolean;
  onlyOpen?: boolean;
  onToggle?(nextState: boolean, event: React.SyntheticEvent): void;
  onClickOutside?(): void;
  children?: React.ReactNode;
  portal?: HTMLDivElement | null;
  offset?: [number, number];
  placement?: DropdownPlacement;
};

/* istanbul ignore next */
const noop = (): void => {};

export type DropdownType<T> = React.FC<T> & {
  Menu: typeof DropdownMenu;
  Trigger: typeof DropdownTrigger;
};

export const Dropdown: DropdownType<DropdownProps> = (props) => {
  const {
    placement = 'bottom',
    children,
    portal,
    onToggle = noop,
    onClickOutside = noop,
    offset,
    onlyOpen = true,
    isOpen = false,
  } = props;

  const toggle = (event: React.SyntheticEvent): void => {
    onToggle(!isOpen, event);
  };

  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);
  const [menuElement, setMenuElement] = useState<HTMLElement | null>(null);

  const { styles, attributes } = usePopper(triggerElement, menuElement, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset,
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['bottom', 'right', 'left', 'top'],
        },
      },
    ],
  });

  const value: DropdownContextValue = {
    isOpen,
    onlyOpen,
    portal,
    toggle,
    clickOutside: onClickOutside,
    triggerProps: {
      triggerElement,
      setTriggerElement,
    },
    menuProps: {
      menuElement,
      setMenuElement,
      style: styles.popper,
      attributes: attributes.popper,
    },
  };

  return <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>;
};

Dropdown.Menu = DropdownMenu;
Dropdown.Trigger = DropdownTrigger;

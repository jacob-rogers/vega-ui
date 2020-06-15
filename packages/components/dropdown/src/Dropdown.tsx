/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, useState } from 'react';
import { usePopper } from 'react-popper';
import { Placement } from 'popper.js';

import { DropdownMenu, DropdownTrigger } from './components';
import { DropdownContext, DropdownContextValue } from './DropdownContext';

export type DropdownPlacement = Placement;

export type DropdownProps = {
  isOpen?: boolean;
  onToggle?(nextState: boolean, event: React.SyntheticEvent): void;
  onClickOutside?(): void;
  onClose?(): void;
  onOpen?(): void;
  children?: React.ReactNode;
  portalId?: string;
  offset?: [number, number];
  placement?: DropdownPlacement;
};

const noop = (): void => {};

export type Dropdown<T> = React.FC<T> & {
  Menu: typeof DropdownMenu;
  Trigger: typeof DropdownTrigger;
};

export const Dropdown: Dropdown<DropdownProps> = (props) => {
  const {
    placement = 'bottom',
    children,
    portalId,
    onToggle = noop,
    onClickOutside = noop,
    offset,
    isOpen = false,
  } = props;

  const toggle = useCallback(
    (event) => {
      onToggle(!isOpen, event);
    },
    [onToggle, isOpen],
  );

  const clickOutside = useCallback(() => {
    onClickOutside();
  }, [onClickOutside]);

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
    ],
  });

  const value: DropdownContextValue = {
    isOpen,
    portalId,
    toggle,
    clickOutside,
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

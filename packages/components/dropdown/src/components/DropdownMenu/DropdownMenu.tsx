import React from 'react';
import { createPortal } from 'react-dom';
import { usePortalDomNode, useRootClose } from '@gpn-prototypes/vega-hooks';

import { useDropdown } from '../../DropdownContext';

export type DropdownMenuChildrenProps = {
  isOpen: boolean;
  props: {
    ref: (ref: HTMLElement | null) => void;
    style: React.CSSProperties;
  };
};

export type DropdownMenuProps = {
  children: (childrenProps: DropdownMenuChildrenProps) => React.ReactNode;
};

function useCallbackRef<T>(value: T): React.MutableRefObject<T> {
  const ref = React.useRef<T>(value);
  ref.current = value;

  return ref;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
  const {
    isOpen,
    triggerProps: { triggerElement },
    menuProps,
    clickOutside,
    portalId,
  } = useDropdown();

  const { menuElement, setMenuElement, style, attributes } = menuProps;

  const menuRef = useCallbackRef(menuElement);
  const triggerRef = useCallbackRef(triggerElement);

  const children = props.children({
    isOpen,
    props: {
      ref: setMenuElement,
      style,
      ...attributes,
    },
  });

  const portalNode = usePortalDomNode(`#${portalId}`);

  const refs = [menuRef, triggerRef];

  useRootClose(refs, clickOutside);

  return <>{portalId && portalNode ? createPortal(children, portalNode) : children}</>;
};

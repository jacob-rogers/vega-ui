import React from 'react';

import { useRootClose } from '../../../../hooks';
import { usePortalRender } from '../../../root';
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
    onlyOpen,
    triggerProps: { triggerElement },
    menuProps,
    clickOutside,
    portal = document.body,
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

  const { renderPortalWithTheme } = usePortalRender();

  const refs = [menuRef, triggerRef];
  useRootClose(refs, clickOutside);

  let node = null;
  const content = portal ? renderPortalWithTheme(children, portal) : children;

  if (onlyOpen) {
    node = <>{isOpen ? content : null}</>;
  } else {
    node = <>{content}</>;
  }

  return node;
};

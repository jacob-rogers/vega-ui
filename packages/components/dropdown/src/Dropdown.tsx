import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';
import { CSSTransition } from 'react-transition-group';
import { PossibleCloseEvent, usePortalDomNode, useRootClose } from '@gpn-prototypes/vega-hooks';
import { Placement } from 'popper.js';

import { cnDropdown } from './helpers/cnDropdown';
import { DropdownItem } from './DropdownItem';
import { DropdownMenu } from './DropdownMenu';
import { DropdownTrigger } from './DropdownTrigger';

import './Dropdown.css';

type ElementsProps = JSX.IntrinsicElements;

export type DropdownProps = {
  trigger?: React.ReactNode;
  onClose: (e?: PossibleCloseEvent) => void;
  children?: React.ReactNode;
  isOpen: boolean;
  className?: string;
  portalId?: string;
  portal?: boolean;
  offset?: number[];
  placement?: Placement;
} & ElementsProps['div'];

type Dropdown<T> = React.FC<T> & {
  Menu: typeof DropdownMenu;
  Item: typeof DropdownItem;
  Trigger: typeof DropdownTrigger;
};

export const Dropdown: Dropdown<DropdownProps> = (props) => {
  const {
    trigger,
    onClose,
    children,
    className,
    isOpen,
    portalId,
    portal,
    placement = 'left',
    ...rest
  } = props;
  const dropdownRef = useRef(null);

  const [innerRef, setInnerRef] = useState<HTMLDivElement | null>(null);

  const offset = props.offset ? props.offset.map(Number) : [0, 0];

  const { styles, attributes } = usePopper(dropdownRef.current, innerRef, {
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

  const onDropdownClose = (e: PossibleCloseEvent): void => {
    const isKeyboardEvent = e instanceof KeyboardEvent;
    const isClickByTrigger =
      !isKeyboardEvent &&
      e.target instanceof HTMLElement &&
      e.target.parentElement?.id === portalId;

    const canClose = isKeyboardEvent || !isClickByTrigger;
    if (isOpen && canClose) {
      onClose(e);
    }
  };

  useRootClose(dropdownRef, onDropdownClose);

  const portalNode = usePortalDomNode(`#${portalId}`);

  if (!portalNode && !trigger) {
    return null;
  }

  const cssTransitionClasses = {
    enter: cnDropdown.state({ enter: true }).toString(),
    enterActive: cnDropdown.state({ enterActive: true }).toString(),
    exit: cnDropdown.state({ exit: true }).toString(),
    exitActive: cnDropdown.state({ exitActive: true }).toString(),
  };

  const content = (
    <div ref={dropdownRef} className={cnDropdown()}>
      {trigger}
      <CSSTransition
        timeout={300}
        classNames={cssTransitionClasses}
        in={isOpen}
        mountOnEnter
        unmountOnExit
      >
        <div ref={setInnerRef} style={styles.popper} {...attributes.popper}>
          <>{children}</>
        </div>
      </CSSTransition>
    </div>
  );

  if (portalNode && portal) {
    return createPortal(content, portalNode);
  }

  return content;
};

Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.Trigger = DropdownTrigger;

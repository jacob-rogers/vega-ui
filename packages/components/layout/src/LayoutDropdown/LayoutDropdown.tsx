import React from 'react';
import {
  Dropdown,
  DropdownPlacement,
  DropdownTriggerChildrenProps,
} from '@gpn-prototypes/vega-dropdown';
import { useClose } from '@gpn-prototypes/vega-hooks';

import { cnLayout } from '../cn-layout';
import { PORTAL_LAYOUT_ID } from '../constants';

type LayoutDropdownProps = {
  placement: DropdownPlacement;
  trigger: (props: DropdownTriggerChildrenProps & { isOpen: boolean }) => React.ReactNode;
  menu: (props: { closeDropdown: () => void }) => React.ReactNode;
};

export const LayoutDropdown: React.FC<LayoutDropdownProps> = (props) => {
  const { placement, trigger, menu } = props;

  const { isOpen, setIsOpen, close } = useClose();

  return (
    <Dropdown
      placement={placement}
      portalId={PORTAL_LAYOUT_ID}
      isOpen={isOpen}
      onClickOutside={close}
      onToggle={setIsOpen}
    >
      <Dropdown.Trigger>
        {(triggerProps): React.ReactNode => trigger({ ...triggerProps, isOpen })}
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {({ props: menuProps }): React.ReactNode => (
          <div className={cnLayout('MenuWrapper')} {...menuProps}>
            {menu({ closeDropdown: close })}
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

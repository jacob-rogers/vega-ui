import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { Dropdown } from '@gpn-prototypes/vega-dropdown';
import { useClose } from '@gpn-prototypes/vega-hooks';
import { IconSelect } from '@gpn-prototypes/vega-icons';

import { cnLayout } from '../cn-layout';
import { PORTAL_LAYOUT_ID } from '../constants';

type MenuItem = {
  value: string;
  label: string;
};

type LayoutMenuProps = {
  activeItem: MenuItem;
  items: MenuItem[];
  onChange: (item: MenuItem) => void;
};

export const LayoutMenu: React.FC<LayoutMenuProps> = (props) => {
  const { activeItem, items, onChange } = props;

  const { isOpen, setIsOpen, close: closeDropdown } = useClose();

  return (
    <Dropdown
      placement="bottom-start"
      isOpen={isOpen}
      onClickOutside={closeDropdown}
      portalId={PORTAL_LAYOUT_ID}
      onToggle={setIsOpen}
    >
      <Dropdown.Trigger>
        {({ toggle, props: { ref, ...triggerProps } }): React.ReactNode => (
          <Button
            innerRef={ref}
            onClick={toggle}
            label={activeItem.label}
            aria-label="Триггер для меню layout"
            iconRight={IconSelect}
            size="xs"
            iconSize="xs"
            className={cnLayout('MenuTrigger', { isMenuOpen: isOpen }).toString()}
            form="brick"
            type="button"
            view="clear"
            {...triggerProps}
          />
        )}
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {({ props: menuProps }): React.ReactNode => (
          <div className={cnLayout('Menu')} {...menuProps}>
            {activeItem.label}
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

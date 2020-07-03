import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { IconSelect } from '@gpn-prototypes/vega-icons';

import { cnLayout } from '../cn-layout';
import { LayoutDropdown } from '../LayoutDropdown';

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

  return (
    <LayoutDropdown
      placement="bottom-start"
      trigger={({ toggle, isOpen, props: { ref, ...triggerProps } }): React.ReactNode => {
        return (
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
        );
      }}
      menu={({ closeMenu }): React.ReactNode => {
        return <div>{activeItem.label}</div>;
      }}
    />
  );
};

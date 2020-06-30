import React from 'react';
import { Tabs } from '@gpn-prototypes/vega-tabs';

import { cnHeader } from '../cn-header';
import { NavItem } from '../types';

type HeaderNavProps = {
  navItems: NavItem[];
  activeItem?: NavItem[];
  onChangeItem: (item: NavItem[]) => void;
};

export const HeaderNav: React.FC<HeaderNavProps> = (props) => {
  const { navItems, activeItem, onChangeItem } = props;

  const handleChangeItem = (item: NavItem[] | null): void => {
    if (item !== null) {
      onChangeItem(item);
    }
  };

  return (
    <nav className={cnHeader('Nav')}>
      <Tabs<NavItem>
        items={navItems}
        value={activeItem}
        getItemKey={(item): string => item.name}
        getItemLabel={(item): string => item.name}
        onChange={({ value }): void => handleChangeItem(value)}
      />
    </nav>
  );
};

import React, { useState } from 'react';
import { Tabs } from '@gpn-prototypes/vega-tabs';

import { cnHeader } from '../cn-header';

type NavItem = {
  name: string;
  isActive?: boolean;
};

type HeaderNavProps = {
  navItems: NavItem[];
  activeItem: NavItem[];
  onChangeItem: (item: NavItem[] | null) => void;
};

export const HeaderNav: React.FC<HeaderNavProps> = (props) => {
  const { navItems, activeItem, onChangeItem } = props;

  return (
    <div className={cnHeader('Nav')}>
      <Tabs<NavItem>
        items={navItems}
        value={activeItem}
        getItemKey={(item): string => item.name}
        getItemLabel={(item): string => item.name}
        onChange={({ value }): void => onChangeItem(value)}
      />
    </div>
  );
};

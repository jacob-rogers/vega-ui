import React from 'react';
import { Tabs } from '@gpn-prototypes/vega-tabs';

import { cnHeader } from '../cn-header';
import { NavItemType } from '../types';

type HeaderNavProps = {
  navItems: NavItemType[];
  activeItem?: NavItemType[];
  onChangeItem: (item: NavItemType[]) => void;
};

export const HeaderNav: React.FC<HeaderNavProps> = (props) => {
  const { navItems, activeItem, onChangeItem } = props;

  const handleChangeItem = (item: NavItemType[] | null): void => {
    if (item !== null) {
      onChangeItem(item);
    }
  };

  return (
    <nav className={cnHeader('Nav')}>
      <Tabs<NavItemType>
        items={navItems}
        value={activeItem}
        getItemKey={(item): string => item.name}
        getItemLabel={(item): string => item.name}
        onChange={({ value }): void => handleChangeItem(value)}
      />
    </nav>
  );
};

import React from 'react';
import { Tabs } from '@gpn-prototypes/vega-tabs';

import { NavItem } from '../types';

import { useHeaderNavContext } from './HeaderNavContext';

export const HeaderNavTabs = (): React.ReactElement => {
  const { activeItem, onChangeItem, navItems } = useHeaderNavContext();

  return (
    <Tabs<NavItem>
      items={navItems}
      value={activeItem}
      getItemKey={(item): string => item.name}
      getItemLabel={(item): string => item.name}
      onChange={({ value }): void => onChangeItem(value)}
    />
  );
};

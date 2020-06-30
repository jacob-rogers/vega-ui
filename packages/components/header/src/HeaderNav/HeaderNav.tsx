import React from 'react';

import { cnHeader } from '../cn-header';
import { NavItem } from '../types';

import { HeaderNavContext, HeaderNavContextProps } from './HeaderNavContext';
import { HeaderNavTabs } from './HeaderNavTabs';

type HeaderNavProps = Omit<HeaderNavContextProps, 'onChangeItem'> & {
  children: React.ReactNode;
  onChangeItem: (item: NavItem[]) => void;
};

type HeaderNav = React.FC<HeaderNavProps> & {
  Tabs: typeof HeaderNavTabs;
};

export const HeaderNav: HeaderNav = (props) => {
  const { navItems, activeItem, onChangeItem, children } = props;

  const handleChangeItem = (item: NavItem[] | null): void => {
    if (item !== null) {
      onChangeItem(item);
    }
  };

  return (
    <HeaderNavContext.Provider value={{ navItems, activeItem, onChangeItem: handleChangeItem }}>
      <nav className={cnHeader('Nav')}>{children}</nav>
    </HeaderNavContext.Provider>
  );
};

HeaderNav.Tabs = HeaderNavTabs;

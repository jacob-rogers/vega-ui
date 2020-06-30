import { createContext, useContext } from 'react';

import { NavItem } from '../types';

export type HeaderNavContextProps = {
  navItems: NavItem[];
  activeItem?: NavItem[];
  onChangeItem: (item: NavItem[] | null) => void;
};

export const HeaderNavContext = createContext<HeaderNavContextProps>({
  navItems: [],
  onChangeItem: () => {},
});

export const useHeaderNavContext = (): HeaderNavContextProps => useContext(HeaderNavContext);

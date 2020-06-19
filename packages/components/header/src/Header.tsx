import React from 'react';

import { HeaderMenu } from './HeaderMenu/HeaderMenu';
import { HeaderNav } from './HeaderNav/HeaderNav';
import { cnHeader } from './helpers/cn-header';
import { MenuItem } from './types';

import './Header.css';

type NavLink = {
  name: string;
};

type HeaderProps = {
  navItems?: NavLink[];
  menuItems: MenuItem[];
  title: string;
  onLogout?(): void;
};

export const Header: React.FC<HeaderProps> = (props): React.ReactElement => {
  const { navItems, title, menuItems, onLogout } = props;
  return (
    <header className={cnHeader()}>
      <HeaderMenu title={title} menuItems={menuItems} onLogout={onLogout} />
      {navItems && (
        <>
          <div className={cnHeader('Delimiter')} />
          <HeaderNav navItems={navItems} />
        </>
      )}
    </header>
  );
};

import React from 'react';

import { HeaderMenu } from './HeaderMenu/HeaderMenu';
import { HeaderNav } from './HeaderNav/HeaderNav';
import { cnHeader } from './helpers/cn-header';

import './Header.css';

type NavLink = {
  name: string;
};

type HeaderProps = {
  navItems?: NavLink[];
  title: string;
};

export const Header: React.FC<HeaderProps> = (props): React.ReactElement => {
  const { navItems, title } = props;
  return (
    <header className={cnHeader()}>
      <HeaderMenu title={title} />
      {navItems && (
        <>
          <div className={cnHeader('Delimiter')} />
          <HeaderNav navItems={navItems} />
        </>
      )}
    </header>
  );
};

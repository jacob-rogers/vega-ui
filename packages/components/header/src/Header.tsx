import React from 'react';

import { HeaderMenu } from './HeaderMenu/HeaderMenu';
import { HeaderNav } from './HeaderNav/HeaderNav';
import { cnHeader } from './cn-header';

import './Header.css';

type NavLink = {
  name: string;
};

type HeaderProps = {
  children: React.ReactNode;
};

type Header = React.FC<HeaderProps> & {
  Menu: typeof HeaderMenu;
  Nav: typeof HeaderNav;
};

export const Header: Header = (props) => {
  const { children } = props;
  return <header className={cnHeader()}>{children}</header>;
};

Header.Menu = HeaderMenu;
Header.Nav = HeaderNav;

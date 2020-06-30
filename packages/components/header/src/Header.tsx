import React from 'react';

import { cnHeader } from './cn-header';
import { HeaderMenu } from './HeaderMenu';
import { HeaderNav } from './HeaderNav';

import './Header.css';

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

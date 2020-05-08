import React from 'react';

import { cnHeader } from './helpers/cn-header';
import { HeaderMenu } from './HeaderMenu';

import './Header.css';

export const Header = (): React.ReactElement => {
  return (
    <header className={cnHeader()}>
      <HeaderMenu />
    </header>
  );
};

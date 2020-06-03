import React from 'react';

import { cnDropdown } from './cn-dropdown';

import './Dropdown.css';

export type DropdownMenuProps = {
  className?: string;
  children?: React.ReactNode;
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ className, children, ...rest }) => {
  return (
    <nav role="navigation">
      <ul {...rest} className={cnDropdown('Menu').mix(className)}>
        {children}
      </ul>
    </nav>
  );
};

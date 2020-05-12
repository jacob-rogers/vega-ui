import React, { MouseEvent } from 'react';

import { cnDropdown } from './cn-dropdown';

import './Dropdown.css';

export type DropdownItemProps = {
  className?: string;
  children?: React.ReactNode;
  onClick?: (e: MouseEvent) => void;
  isActive?: boolean;
  align?: 'center' | 'start' | 'end';
};

export const DropdownItem: React.FC<DropdownItemProps> = (props) => {
  const { className, children, onClick, isActive, align = 'center', ...rest } = props;

  const onItemClick = (e: MouseEvent): void => {
    if (onClick) {
      onClick(e);
    }
  };

  const itemClassName: string = cnDropdown('Item')
    .mix(className)
    .state({ active: Boolean(isActive) })
    .toString();

  return (
    <li {...rest} className={itemClassName}>
      <button type="button" className={cnDropdown('ItemButton', { align })} onClick={onItemClick}>
        {children}
      </button>
    </li>
  );
};

DropdownItem.defaultProps = {
  align: 'center',
};

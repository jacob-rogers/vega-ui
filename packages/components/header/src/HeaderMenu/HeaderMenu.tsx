import React, { useState } from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { Dropdown } from '@gpn-prototypes/vega-dropdown';
import { IconHamburger } from '@gpn-prototypes/vega-icons';
import { Text } from '@gpn-prototypes/vega-text';

import { cnHeader } from '../helpers/cn-header';
import { MenuItem } from '../types';

interface HeaderMenuProps {
  onLogout?(): void;
  title: string;
  menuItems: MenuItem[];
}

const testId = {
  trigger: 'Header:Menu:Trigger',
};

export const HeaderMenu: React.FC<HeaderMenuProps> = (propsHeader) => {
  const { title, menuItems, onLogout } = propsHeader;
  const [isOpen, setIsOpen] = useState(false);

  const menu = menuItems.map((item) => (
    <li className={cnHeader('MenuItem')} key={item.name} role="menuitem">
      <a
        href={item.url}
        onClick={(e): void => {
          // istanbul ignore else path
          if (item.onClick) {
            e.preventDefault();
            item.onClick(e);
          }
          setIsOpen(false);
        }}
        className={cnHeader('MenuLink')}
      >
        <Text>{item.name}</Text>
      </a>
    </li>
  ));

  const handleLogout = (): void => {
    // istanbul ignore else path
    if (onLogout) {
      onLogout();
    }
  };

  const handleClickOutside = (): void => {
    setIsOpen(false);
  };

  return (
    <div className={cnHeader('MenuWrap')} role="menubar" aria-haspopup="true">
      <Dropdown
        isOpen={isOpen}
        onToggle={(nextState): void => {
          setIsOpen(nextState);
        }}
        onClickOutside={handleClickOutside}
        placement="bottom-start"
      >
        <Dropdown.Trigger>
          {({ toggle, props }): React.ReactNode => (
            <div className={cnHeader('MenuTrigger')} {...props}>
              <Button
                id="headerMenuTrigger"
                size="m"
                view="clear"
                type="button"
                onlyIcon
                onClick={toggle}
                iconLeft={IconHamburger}
                form="brick"
                aria-expanded={isOpen}
                aria-haspopup="true"
                data-testid={testId.trigger}
              />
            </div>
          )}
        </Dropdown.Trigger>
        <Dropdown.Menu>
          {({ props }): React.ReactNode => (
            <div
              className={cnHeader('Dropdown')}
              {...props}
              aria-hidden={!isOpen}
              aria-labelledby="headerMenuTrigger"
            >
              <ul className={cnHeader('Menu')} role="menu">
                {menu}
                <li className={cnHeader('MenuDelimiter')} />
                <li className={cnHeader('MenuItem')} role="menuitem">
                  <a href="/" onClick={handleLogout} className={cnHeader('MenuLink')}>
                    <Text>Выйти</Text>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </Dropdown.Menu>
      </Dropdown>
      <Text className={cnHeader('MenuTriggerText').toString()}>{title}</Text>
    </div>
  );
};

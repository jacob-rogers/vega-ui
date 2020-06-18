import React, { useState } from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { Dropdown } from '@gpn-prototypes/vega-dropdown';
import { IconHamburger } from '@gpn-prototypes/vega-icons';
import { Text } from '@gpn-prototypes/vega-text';

import { cnHeader } from '../helpers/cn-header';

interface MenuItem {
  name: string;
  onClick?: (e: MouseEvent | TouchEvent | React.SyntheticEvent) => void;
}

interface HeaderMenuProps {
  onLogout?(): void;
  title: string;
}

export const HeaderMenu: React.FC<HeaderMenuProps> = (propsHeader) => {
  const { title } = propsHeader;
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: MenuItem[] = [{ name: 'Проекты' }, { name: 'Обучение' }, { name: 'Помощь' }];

  const menu = menuItems.map((item) => (
    <li className={cnHeader('MenuItem')} key={item.name}>
      <a
        href="."
        onClick={(e): void => {
          if (item.onClick) {
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

  return (
    <Dropdown
      isOpen={isOpen}
      onToggle={(nextState): void => {
        setIsOpen(nextState);
      }}
      placement="bottom-start"
    >
      <Dropdown.Trigger>
        {({ toggle, props }): React.ReactNode => (
          <div className={cnHeader('MenuTrigger')} {...props}>
            <Button
              size="m"
              view="clear"
              type="button"
              onlyIcon
              onClick={toggle}
              iconLeft={IconHamburger}
              iconSize="s"
              form="brick"
              className={cnHeader('MenuTriggerButton')}
            />
            <Text className={cnHeader('MenuTriggerText').toString()}>{title}</Text>
          </div>
        )}
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {({ props }): React.ReactNode => (
          <div className={cnHeader('Dropdown')} {...props}>
            <ul className={cnHeader('Menu')}>
              {menu}
              <li className={cnHeader('MenuDelimiter')} />
              <li className={cnHeader('MenuItem')}>
                <a href="." className={cnHeader('MenuLink')}>
                  <Text>Выйти</Text>
                </a>
              </li>
            </ul>
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

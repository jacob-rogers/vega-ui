import React from 'react';
import { Button } from '@vega-ui/button';
import { Dropdown, useDropdown } from '@vega-ui/dropdown/src';
import { IconHamburger } from '@vega-ui/icons';
import { Text } from '@vega-ui/text';

import { cnHeader } from './helpers/cn-header';

interface MenuItem {
  name: string;
  onClick?: (e: MouseEvent | TouchEvent | React.SyntheticEvent) => void;
}

interface HeaderMenuProps {
  onLogout(): void;
}

export const HeaderMenu: React.FC<HeaderMenuProps> = (props) => {
  const { onLogout } = props;
  const { isOpen, toggle: handleToggle, close: handleClose } = useDropdown();

  const [activeItemName, setActiveItemName] = React.useState('Проекты');

  const menuItems: MenuItem[] = [{ name: 'Проекты' }, { name: 'Обучение' }, { name: 'Помощь' }];

  const activeName = 'Очень длинное название проекта';

  const trigger = (
    <div className={cnHeader('MenuTrigger')}>
      <Button view="clear" type="button" onlyIcon onClick={handleToggle} iconLeft={IconHamburger} />
      <Text>{activeName.slice(0, 27)}...</Text>
    </div>
  );

  const items = menuItems.map((item) => {
    const isActive = item.name === activeItemName;
    return (
      <Dropdown.Item
        key={item.name}
        isActive={isActive}
        align="start"
        onClick={(e): void => {
          if (item.onClick) {
            item.onClick(e);
          }
          setActiveItemName(() => item.name);
          handleClose();
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={cnHeader('MenuLink')} href="#">
          <Text>{item.name}</Text>
        </a>
      </Dropdown.Item>
    );
  });

  return (
    <Dropdown className={cnHeader('Menu')} isOpen={isOpen} trigger={trigger} onClose={handleClose}>
      <Dropdown.Menu>
        {items}
        <Dropdown.Delimeter />
        <Dropdown.Item
          align="start"
          onClick={(): void => {
            if (onLogout) {
              onLogout();
            }
            handleClose();
            setActiveItemName(() => 'Проекты');
          }}
        >
          <Text>Выйти</Text>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

import React, { useState } from 'react';
import { Button } from '@gpn-design/uikit/Button';
import { Text } from '@gpn-design/uikit/Text';
import { array, boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Dropdown, DropdownProps } from './Dropdown';
import { DropdownItemProps } from './DropdownItem';
import { useDropdown } from './use-dropdown';

const KNOB_GROUPS = {
  dropdown: 'Dropdown',
  item: 'Dropdown.Item',
};

const dropdownItemKnobs = (): Partial<DropdownItemProps> => ({
  align: select(
    'align',
    { start: 'start', center: 'center', end: 'end' },
    'center',
    KNOB_GROUPS.item,
  ),
  isActive: boolean('isActive', false, KNOB_GROUPS.item),
});

const dropdownKnobs = (): Partial<DropdownProps> => ({
  placement: select(
    'placement',
    {
      'top': 'top',
      'top-start': 'top-start',
      'top-end': 'top-end',
      'bottom': 'bottom',
      'bottom-start': 'bottom-start',
      'bottom-end': 'bottom-end',
      'left': 'left',
      'left-start': 'left-start',
      'left-end': 'left-end',
      'right': 'right',
      'right-start': 'right-start',
      'right-end': 'right-end',
    },
    'top',
    KNOB_GROUPS.dropdown,
  ),
  offset: array('offset', ['0', '0'], ',', KNOB_GROUPS.dropdown),
});

const exampleKnobs = (): { text: string } => ({
  text: text('Dropdown.Item | Первый пункт', 'Нулевой'),
});

const menuList = [
  {
    id: 'item-1',
    text: 'Первый',
  },
  {
    id: 'item-2',
    text: 'Второй',
  },
  {
    id: 'item-3',
    text: 'Третий',
  },
  {
    id: 'item-4',
    text: 'Четвертый',
  },
];

storiesOf('ui/Dropdown', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('Рендер без портала', () => {
    const { isOpen, close: handleClose, toggle: toggleDropdownOpen } = useDropdown();
    const [activeItem, setActiveItem] = React.useState(menuList[0].id);
    const example = exampleKnobs();

    const triggerNode = <Button label="Click Me" onClick={toggleDropdownOpen} />;

    return (
      <div style={{ margin: '200px 250px' }}>
        <Dropdown isOpen={isOpen} trigger={triggerNode} onClose={handleClose} {...dropdownKnobs()}>
          <Dropdown.Menu>
            <Dropdown.Item {...dropdownItemKnobs()}>
              <Text>{example.text}</Text>
            </Dropdown.Item>
            {menuList.map((item) => (
              <Dropdown.Item
                key={item.id}
                isActive={activeItem === item.id}
                onClick={(): void => setActiveItem(item.id)}
              >
                <Text>{item.text}</Text>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  })
  .add('Рендер в портале', () => {
    const { isOpen, close: handleClose, toggle: toggleDropdownOpen } = useDropdown();
    const [activeItem, setActiveItem] = React.useState(menuList[0].id);
    const example = exampleKnobs();

    return (
      <>
        <Dropdown.Trigger id="trigger">
          <Button label="Click Me" onClick={toggleDropdownOpen} />
        </Dropdown.Trigger>
        <Dropdown
          portalId="trigger"
          portal
          isOpen={isOpen}
          onClose={handleClose}
          {...dropdownKnobs()}
        >
          <Dropdown.Menu>
            <Dropdown.Item {...dropdownItemKnobs()}>
              <Text>{example.text}</Text>
            </Dropdown.Item>
            {menuList.map((item) => (
              <Dropdown.Item
                key={item.id}
                isActive={activeItem === item.id}
                onClick={(): void => setActiveItem(item.id)}
              >
                <Text>{item.text}</Text>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  });

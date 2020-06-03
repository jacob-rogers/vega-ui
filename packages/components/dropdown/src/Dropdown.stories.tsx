import React from 'react';
import { Button } from '@gpn-design/uikit/Button';
import { Text } from '@gpn-design/uikit/Text';
import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Dropdown } from './Dropdown';
import { DropdownItemProps } from './DropdownItem';
import { useDropdown } from './use-dropdown';

const KNOB_GROUPS = {
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
  .addParameters({
    metadata: {
      author: 'CSSSR',
      status: 'Approved',
      link: {
        href: 'https://github.com/gpn-prototypes/vega-ui/tree/master/packages/components/dropdown',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    const { isOpen, close: handleClose, toggle: toggleDropdownOpen } = useDropdown();
    const [activeItem, setActiveItem] = React.useState(menuList[0].id);
    const example = exampleKnobs();

    const triggerNode = <Button label="Открыть" onClick={toggleDropdownOpen} />;

    return (
      <Dropdown isOpen={isOpen} trigger={triggerNode} onClose={handleClose}>
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
    );
  })
  .add('рендер в портале', () => {
    const { isOpen, close: handleClose, toggle: toggleDropdownOpen } = useDropdown();
    const [activeItem, setActiveItem] = React.useState(menuList[0].id);

    return (
      <div>
        <Dropdown.Trigger id="trigger">
          <Button label="Открыть" onClick={toggleDropdownOpen} />
        </Dropdown.Trigger>
        <Dropdown portalId="trigger" portal isOpen={isOpen} onClose={handleClose}>
          <Dropdown.Menu>
            {menuList.map((item) => (
              <Dropdown.Item
                key={item.id}
                isActive={activeItem === item.id}
                onClick={(): void => {
                  setActiveItem(item.id);
                  handleClose();
                }}
              >
                <Text>{item.text}</Text>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  });

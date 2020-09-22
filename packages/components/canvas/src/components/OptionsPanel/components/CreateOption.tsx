import React from 'react';
import { Dropdown } from '@gpn-prototypes/vega-dropdown';
import { useToggle } from '@gpn-prototypes/vega-hooks';
import { NavigationList } from '@gpn-prototypes/vega-navigation-list';
import { usePortal } from '@gpn-prototypes/vega-root';

import { cnCanvas } from '../../../cn-canvas';
import { ItemType } from '../../../types';
import * as Icons from '../Icons';
import { OptionView } from '../types';

import { Option, OptionProps } from './Option';

type CreateOptionProps = Omit<OptionProps, 'onClick'> & {
  onCreate(type: ItemType): void;
};

export const items: OptionView<ItemType>[] = [
  { type: 'root', icon: Icons.IconNodeStart, label: 'Начало проекта' },
  { type: 'end', icon: Icons.IconNodeEnd, label: 'Шаг проекта' },
  { type: 'step', icon: Icons.IconNodeStep, label: 'Конец проекта' },
];

export const CreateOption = (props: CreateOptionProps): React.ReactElement => {
  const [dropdownOpen, dropdownToggle] = useToggle(false);
  const { portal } = usePortal();

  const handleItemClick = (type: ItemType): void => {
    props.onCreate(type);
    dropdownToggle(false);
  };

  return (
    <Dropdown
      placement="top"
      portal={portal}
      isOpen={dropdownOpen}
      onClickOutside={(): void => dropdownToggle(false)}
      onToggle={dropdownToggle}
    >
      <Dropdown.Trigger>
        {({ toggle, props: { ref } }): React.ReactNode => (
          <Option
            role="menuitem"
            isActive={dropdownOpen}
            onClick={toggle}
            innerRef={ref}
            {...props}
          />
        )}
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {({ props: menuProps }): React.ReactNode => {
          return (
            <div role="menu" aria-label="Меню для создания элементов" {...menuProps}>
              <NavigationList className={cnCanvas('CreateOptionsList')}>
                {items.map((item) => {
                  return (
                    <NavigationList.Item key={item.type}>
                      {(): React.ReactNode => (
                        <Option
                          role="menuitem"
                          onClick={(): void => handleItemClick(item.type)}
                          option={item}
                        />
                      )}
                    </NavigationList.Item>
                  );
                })}
              </NavigationList>
            </div>
          );
        }}
      </Dropdown.Menu>
    </Dropdown>
  );
};

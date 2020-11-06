import React from 'react';
import { Dropdown } from '@gpn-prototypes/vega-dropdown';
import { useToggle } from '@gpn-prototypes/vega-hooks';
import { IconNodeEnd, IconNodeStart, IconNodeStep } from '@gpn-prototypes/vega-icons';
import { NavigationList } from '@gpn-prototypes/vega-navigation-list';
import { usePortal } from '@gpn-prototypes/vega-root';

import { cnCanvas } from '../../../cn-canvas';
import { ItemType } from '../../../types';
import { Option as OptionType, OptionView } from '../types';

import { Option, OptionProps } from './Option';

export interface CreateOptionProps extends Omit<OptionProps, 'onClick'> {
  onCreate(type: ItemType): void;

  disabledOptions: OptionType[];
}

export const items: OptionView<ItemType>[] = [
  { type: 'root', icon: IconNodeStart, label: 'Начало' },
  { type: 'end', icon: IconNodeStep, label: 'Выход' },
  { type: 'step', icon: IconNodeEnd, label: 'Шаг' },
];

export const CreateOption: React.FC<CreateOptionProps> = (props) => {
  const [dropdownOpen, dropdownToggle] = useToggle(false);
  const { portal } = usePortal();

  const { onCreate, disabledOptions, className, ...rest } = props;

  const handleItemClick = (type: ItemType): void => {
    onCreate(type);
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
            onlyIcon
            role="menuitem"
            isActive={dropdownOpen}
            onClick={toggle}
            innerRef={ref}
            {...rest}
          />
        )}
      </Dropdown.Trigger>
      <Dropdown.Menu>
        {({ props: menuProps }): React.ReactNode => {
          return (
            <div
              className={className}
              role="menu"
              aria-label="Меню для создания элементов"
              {...menuProps}
            >
              <NavigationList className={cnCanvas('CreateOptionsList')}>
                {items.map((item) => {
                  return (
                    <NavigationList.Item key={item.type}>
                      {(): React.ReactNode => (
                        <Option
                          label={item.label}
                          disabled={disabledOptions.includes(item.type)}
                          iconSize="s"
                          role="menuitem"
                          onClick={(): void => handleItemClick(item.type)}
                          option={item}
                          className={cnCanvas('CreateOptionItem').toString()}
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

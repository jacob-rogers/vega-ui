import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { IconSelect } from '@gpn-prototypes/vega-icons';

import { cnLayout } from '../cn-layout';
import { LayoutDropdown } from '../LayoutDropdown';

import { LayoutMenuList, LayoutMenuListProps } from './LayoutMenuList';

export type LayoutMenuProps = LayoutMenuListProps;

export const LayoutMenu: React.FC<LayoutMenuProps> = (props) => {
  const { activeValue = '', items = [], onChange = (): void => {} } = props;

  const activeItem = React.useMemo(() => items.find((item) => activeValue === item.value), [
    activeValue,
    items,
  ]);

  return (
    <LayoutDropdown
      placement="bottom-start"
      trigger={({ toggle, isOpen, props: { ref, ...triggerProps } }): React.ReactNode => {
        return (
          <Button
            innerRef={ref}
            onClick={toggle}
            label={activeItem?.label}
            aria-label="Открыть список виджетов"
            iconRight={IconSelect}
            size="xs"
            iconSize="xs"
            className={cnLayout('MenuTrigger', { isMenuOpen: isOpen }).toString()}
            form="brick"
            type="button"
            view="clear"
            {...triggerProps}
          />
        );
      }}
      menu={({ closeDropdown }): React.ReactNode => {
        return (
          <LayoutMenuList
            items={items}
            activeValue={activeValue}
            onChange={(value: string): void => {
              closeDropdown();
              onChange(value);
            }}
          />
        );
      }}
    />
  );
};

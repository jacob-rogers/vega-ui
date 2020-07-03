import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { NavigationList } from '@gpn-prototypes/vega-navigation-list';

import { cnLayout } from '../cn-layout';

export type MenuItem = {
  value: string;
  label: string;
};

export type LayoutMenuListProps = {
  activeValue: string;
  items: MenuItem[];
  onChange: (value: string) => void;
};

export const LayoutMenuList: React.FC<LayoutMenuListProps> = (props) => {
  const { activeValue, items, onChange } = props;

  const cn = cnLayout('List');

  return (
    <NavigationList className={cn}>
      {items.map((item) => (
        <NavigationList.Item active={activeValue === item.value} key={item.value}>
          {(itemProps): React.ReactNode => (
            <Button
              label={item.label}
              aria-label={item.label}
              onClick={(): void => onChange(item.value)}
              size="m"
              view="clear"
              className={cnLayout('Option').mix(itemProps.className).toString()}
            />
          )}
        </NavigationList.Item>
      ))}
    </NavigationList>
  );
};

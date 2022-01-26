import React from 'react';
import { Button } from '@consta/uikit/Button';

import { NavigationList } from '../../navigation-list';
import { cnLayout } from '../cn-layout';

export type MenuItem = {
  value: string;
  label: string;
};

export type LayoutMenuListProps = {
  activeValue?: string;
  items?: MenuItem[];
  onChange?: (value: string) => void;
};

export const LayoutMenuList: React.FC<LayoutMenuListProps> = (props) => {
  const { activeValue = '', items = [], onChange = (): void => {} } = props;

  const cn = cnLayout('List');

  return (
    <NavigationList className={cn}>
      {items.map((item) => (
        <NavigationList.Item active={activeValue === item.value} key={item.label}>
          {(itemProps): React.ReactNode => (
            <Button
              label={item.label}
              aria-label={item.label}
              aria-current={activeValue === item.value}
              onClick={(): void => onChange(item.value)}
              size="m"
              form="brick"
              view="clear"
              className={cnLayout('Option').mix(itemProps.className).toString()}
            />
          )}
        </NavigationList.Item>
      ))}
    </NavigationList>
  );
};

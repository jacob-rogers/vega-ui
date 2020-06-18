import React, { useState } from 'react';
import { Tabs } from '@gpn-prototypes/vega-tabs';

import { cnHeader } from '../helpers/cn-header';

type NavItem = {
  name: string;
  isActive?: boolean;
};

type HeaderNavProps = {
  navItems: NavItem[];
};

export const HeaderNav: React.FC<HeaderNavProps> = (props) => {
  const { navItems } = props;
  const activeItem = navItems.filter((item) => item.isActive);
  const [valueTab, setValueTab] = useState<NavItem[] | null>(activeItem);

  return (
    <div className={cnHeader('Nav')}>
      <div>
        <Tabs<NavItem>
          items={navItems}
          value={valueTab}
          getItemKey={(item): string => item.name}
          getItemLabel={(item): string => item.name}
          onChange={({ value }): void => setValueTab(value)}
        />
      </div>
    </div>
  );
};

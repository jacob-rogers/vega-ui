import React from 'react';

import { cnNavigationList } from './cn-navigation-list';

export type NavigationListItemChildrenProps = {
  className: string;
};

export type NavigationListItemProps = {
  active?: boolean;
  className?: string;
  children(childrenProps: NavigationListItemChildrenProps): React.ReactNode;
};

export const NavigationListItem: React.FC<NavigationListItemProps> = ({
  active,
  className,
  children,
  ...rest
}) => {
  const childrenProps = {
    className: cnNavigationList('Item', { active }).toString(),
  };

  return (
    <li className={className} {...rest}>
      {children(childrenProps)}
    </li>
  );
};

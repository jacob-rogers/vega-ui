import React from 'react';

import { cnNavigationList } from './cn-navigation-list';

export type NavigationListDelimiterProps = {
  className?: string;
};

export const NavigationListDelimiter: React.FC<NavigationListDelimiterProps> = ({
  className,
  ...rest
}) => {
  return <div className={cnNavigationList('Delimiter').mix(className)} {...rest} />;
};

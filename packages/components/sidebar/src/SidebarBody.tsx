import React from 'react';

import { cnSidebar } from './cn-sidebar';

export type SidebarBodyProps = {
  className?: string;
};

export const SidebarBody: React.FC<SidebarBodyProps> = ({ className, children, ...rest }) => (
  <div aria-label="Основное содержимое" className={cnSidebar('Body').mix(className)} {...rest}>
    {children}
  </div>
);

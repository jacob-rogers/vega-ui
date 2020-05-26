import React from 'react';

import { cnSidebar } from './helpers/cn-sidebar';

import './Sidebar.css';

export type SidebarBodyProps = {
  className?: string;
};

export const SidebarBody: React.FC<SidebarBodyProps> = ({ className, children, ...rest }) => (
  <main className={cnSidebar('Body').mix(className)} {...rest}>
    {children}
  </main>
);

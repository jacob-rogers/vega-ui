import React, { useContext } from 'react';

export type SidebarContextType = {
  onMinimize?: (event: React.MouseEvent) => void;
  onClose?: (event: React.MouseEvent) => void;
};

export const SidebarContext = React.createContext<SidebarContextType>({});

export const useSidebarContext = (): SidebarContextType => {
  return useContext(SidebarContext);
};

import React, { useState } from 'react';

import { ContextMenuData } from '../../types';

type useContextMenuProps = {
  isContextMenuEnable: boolean;
};

type contextMenuApi = {
  contextMenuData: ContextMenuData | null;
  isOpenContextMenu: boolean;
  handleContextMenu: (event: React.MouseEvent, ref: React.RefObject<HTMLElement>) => void;
  closeContextMenu: () => void;
};

export const useContextMenu = ({ isContextMenuEnable }: useContextMenuProps): contextMenuApi => {
  const [isOpenContextMenu, setIsOpenContextMenu] = useState(false);
  const [contextMenuData, setContextMenuData] = useState<ContextMenuData | null>(null);

  const handleContextMenu = (event: React.MouseEvent, ref: React.RefObject<HTMLElement>): void => {
    if (!isContextMenuEnable) {
      return;
    }

    event.preventDefault();

    setContextMenuData({
      callerRef: ref,
      style: {
        left: event.clientX,
        top: event.clientY,
      },
    });

    setIsOpenContextMenu(true);
  };

  const closeContextMenu = (): void => {
    setIsOpenContextMenu(false);
  };

  return {
    contextMenuData,
    isOpenContextMenu,
    handleContextMenu,
    closeContextMenu,
  };
};

import React, { useRef } from 'react';

import { useOnClickOutside } from '../../../../hooks';
import { usePortal, usePortalRender } from '../../../root';
import cnTree from '../../cn-tree';
import { ContextMenuItem } from '../../types';

import TreeContextMenuList from './TreeContextMenuList';

export type ContextMenuProps = {
  menuCoordinates?: {
    left: string | number;
    top: string | number;
  };
  closeContextMenu: () => void;
  items: ContextMenuItem[];
};

export const TreeContextMenu: React.FC<ContextMenuProps> = (props) => {
  const { menuCoordinates, closeContextMenu, items } = props;

  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  const { portal } = usePortal({ name: 'portalContextMenu' });

  const { renderPortalWithTheme } = usePortalRender();

  useOnClickOutside({ ref: contextMenuRef, handler: closeContextMenu });

  const ContextMenu = (
    <div
      ref={contextMenuRef}
      className={cnTree('ContextMenu')}
      style={{
        left: menuCoordinates?.left,
        top: menuCoordinates?.top,
      }}
    >
      <TreeContextMenuList items={items} />
    </div>
  );

  if (portal) {
    return renderPortalWithTheme(ContextMenu, portal);
  }

  return ContextMenu;
};

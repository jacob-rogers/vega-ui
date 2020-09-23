import React, { useRef } from 'react';
import { useOnClickOutside } from '@gpn-prototypes/vega-hooks';
import { usePortal, usePortalRender } from '@gpn-prototypes/vega-root';

import cnTree from '../../cn-tree';

import TreeContextMenuList from './TreeContextMenuList';

export type ContextMenuProps = {
  menuCoordinates?: {
    left: string | number;
    top: string | number;
  };
  closeContextMenu: () => void;
  handleRename?: () => void;
  handleCopy?: () => void;
  handleDelete?: () => void;
  handlePaste?: (transferringIds: string[], receivingId: string) => void;
};

export const TreeContextMenu: React.FC<ContextMenuProps> = (props) => {
  const { menuCoordinates, closeContextMenu } = props;

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
      <TreeContextMenuList
        handleCopy={props.handleCopy}
        handleRename={props.handleRename}
        handleDelete={props.handleDelete}
        handlePaste={props.handlePaste}
      />
    </div>
  );

  if (portal) {
    return renderPortalWithTheme(ContextMenu, portal);
  }

  return ContextMenu;
};

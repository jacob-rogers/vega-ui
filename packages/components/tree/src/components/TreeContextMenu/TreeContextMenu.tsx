import React, { useRef } from 'react';
import { useOnClickOutside, usePortal, usePortalRender } from '@gpn-prototypes/vega-ui';

import cnTree from '../../cn-tree';
import { ContextMenuProps } from '../../types';

import TreeContextMenuList from './TreeContextMenuList';

export const TreeContextMenu: React.FC<ContextMenuProps> = (props) => {
  const { contextMenuData, closeContextMenu } = props;

  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  const { portal } = usePortal({ name: 'portalContextMenu' });

  const { renderPortalWithTheme } = usePortalRender();

  useOnClickOutside({ ref: contextMenuRef, handler: closeContextMenu });

  const ContextMenu = (
    <div
      ref={contextMenuRef}
      className={cnTree('ContextMenu')}
      style={{
        left: contextMenuData?.style?.left,
        top: contextMenuData?.style?.top,
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

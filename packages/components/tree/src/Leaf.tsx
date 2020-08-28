import React, { useRef } from 'react';

import cnTree from './cn-tree';
import { LeafType } from './types';

export const Leaf: React.FC<LeafType> = (props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleSelect = () => {
    if (typeof props.handleSelectItem === 'function') {
      props.handleSelectItem(ref);
    }
  };

  const handleContextMenuOpen = (event: React.MouseEvent) => {
    if (typeof props.handleContextMenu === 'function') {
      handleSelect();

      props.handleContextMenu(event, ref);
    }
  };

  return (
    <li
      className={cnTree('Leaf', { Selected: props.selectedItems?.includes(ref) })}
      draggable="true"
      onDragStart={props.handleDragStart}
    >
      <div
        ref={ref}
        role="treeitem"
        tabIndex={0}
        onKeyDown={handleSelect}
        onClick={handleSelect}
        onContextMenu={handleContextMenuOpen}
      >
        <div>{props.name}</div>
      </div>
    </li>
  );
};

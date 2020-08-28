import React, { useRef } from 'react';

import cnTree from './cn-tree';
import { LeafType } from './types';

export const Leaf: React.FC<LeafType> = (props) => {
  const ref = useRef<HTMLLIElement | null>(null);

  const handleDragStart = (event: React.DragEvent): void => {
    if (typeof props.handleDragStart === 'function') {
      props.handleDragStart(event, ref);
    }
  };

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
      draggable={props.isDraggable === false ? "false" : "true"}
      onDragStart={handleDragStart}
      ref={ref}
    >
      <div
        role="treeitem"
        tabIndex={0}
        onKeyDown={() => {}}
        onClick={handleSelect}
        onContextMenu={handleContextMenuOpen}
      >
        <div>{props.name}</div>
      </div>
    </li>
  );
};

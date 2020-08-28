import React, { useRef, useState } from 'react';

import cnTree from './cn-tree';
import { NodeTreeType } from './types';

export const TreeNode: React.FC<NodeTreeType> = (props) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const ref = useRef<HTMLLIElement | null>(null);

  const handleExpand = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.stopPropagation();

    setExpanded(!expanded);
  };

  const handleSelect = (): void => {
    if (typeof props.handleSelectItem === 'function') {
      props.handleSelectItem(ref);
    }
  };

  const handleContextMenuOpen = (event: React.MouseEvent): void => {
    if (typeof props.handleContextMenu === 'function') {
      handleSelect();

      props.handleContextMenu(event, ref);
    }
  };

  const handleDragStart = (event: React.DragEvent): void => {
    if (typeof props.handleDragStart === 'function') {
      props.handleDragStart(event);
    }
  };

  const handleDragOver = (event: React.DragEvent): void => {
    if (typeof props.handleDragOver === 'function') {
      props.handleDragOver(event);
    }
  };

  const handleDrop = (event: React.DragEvent): void => {
    if (typeof props.handleDragDrop === 'function') {
      props.handleDragDrop(event);
    }
  };

  return (
    <li className={cnTree('TreeNode')} draggable="true" ref={ref} onDragStart={handleDragStart}>
      <div
        className={cnTree('NavigationItem', { Selected: props.selectedItems?.includes(ref) })}
        role="treeitem"
        aria-label="List name"
        tabIndex={0}
        onClick={handleSelect}
        onKeyPress={handleSelect}
        onDoubleClick={handleExpand}
        onContextMenu={handleContextMenuOpen}
      >
        <div
          className={cnTree('NavigationArrow', { expanded })}
          onClick={handleExpand}
          onKeyPress={handleExpand}
          aria-label="List controller"
          role="button"
          tabIndex={0}
        />

        <div>{props.name}</div>
      </div>

      <ul
        className={cnTree('NodeList', { expanded })}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {props.children}
      </ul>
    </li>
  );
};

import React, { useRef, useState } from 'react';

import cnTree from './cn-tree';
import { NodeTreeType } from './types';

export const TreeNode: React.FC<NodeTreeType> = (props) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const targetRef = useRef<HTMLLIElement | null>(null);
  const dropZoneRef = useRef<HTMLUListElement | null>(null);

  const handleExpand = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.stopPropagation();

    setExpanded(!expanded);
  };

  const handleSelect = (): void => {
    if (typeof props.handleSelectItem === 'function') {
      props.handleSelectItem(targetRef);
    }
  };

  const handleContextMenuOpen = (event: React.MouseEvent): void => {
    if (typeof props.handleContextMenu === 'function') {
      handleSelect();

      props.handleContextMenu(event, targetRef);
    }
  };

  const handleDragStart = (event: React.DragEvent): void => {
    if (props.onlyDropZone) {
      return;
    }

    if (typeof props.handleDragStart === 'function') {
      props.handleDragStart(event, targetRef);
    }
  };

  const handleDragOver = (event: React.DragEvent): void => {
    if (typeof props.handleDragOver === 'function') {
      props.handleDragOver(event, dropZoneRef);
    }
  };

  const handleDrop = (event: React.DragEvent): void => {
    if (typeof props.handleDragDrop === 'function') {
      props.handleDragDrop(event);
    }
  };

  return (
    <li className={cnTree('TreeNode')}
        draggable={props.isDraggable === false ? "false" : "true"}
        ref={targetRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragStart={handleDragStart}
        onDragEnd={props.handleDragEnd}
    >
      <div
        className={cnTree('NavigationItem',
          { Selected: props.selectedItems?.includes(targetRef),
            Droppable: props.dropZone === dropZoneRef
          })}
        role="treeitem"
        aria-label="List name"
        tabIndex={0}
        onClick={handleSelect}
        onKeyDown={() => {}}
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
        ref={dropZoneRef}
        className={cnTree('NodeList', { expanded })}
      >
        {props.children}
      </ul>
    </li>
  );
};

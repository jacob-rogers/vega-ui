import React, { useRef, useState } from 'react';

import cnTree from './cn-tree';
import { TreeItemContainer } from './TreeItemContainer';
import { NodeTree } from './types';
import { useTreeHandlers } from './use-tree-handlers';
import { useVisibilityIdentifier } from './use-visability-identifier';

export const TreeNode: React.FC<NodeTree> = (props) => {
  const {
    name,
    onHideItem,
    onContextMenu,
    onSelectItem,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDragDrop,
    children,
    selectedItems,
    hiddenItems,
    isDraggable,
    dropZone,
    iconId,
    icons,
    rootRef,
  } = props;

  const [expanded, setExpanded] = useState(false);

  const targetRef = useRef<HTMLLIElement | null>(null);
  const dropZoneRef = useRef<HTMLUListElement | null>(null);

  const { handleDragStart, handleSelect, handleHide, handleContextMenuOpen } = useTreeHandlers({
    ref: targetRef,
    dropZoneRef,
    onContextMenu,
    onSelectItem,
    onHideItem,
    onDragStart,
    onDragOver,
    onDragDrop,
  });

  const visibilityIdentifier = useVisibilityIdentifier({ ref: targetRef, handleHide, hiddenItems });

  const handleExpand = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.stopPropagation();

    setExpanded(!expanded);
  };

  const handleDragOver = (event: React.DragEvent): void => {
    if (onDragOver) {
      onDragOver(event, dropZoneRef);
    }
  };

  const handleDrop = (event: React.DragEvent): void => {
    if (onDragDrop) {
      onDragDrop(event);
    }
  };

  return (
    <TreeItemContainer
      className={cnTree('TreeNode')}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      targetRef={targetRef}
      onClick={handleSelect}
      onContextMenu={handleContextMenuOpen}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={onDragEnd}
      aria-label="List name"
    >
      <div
        className={cnTree('NavigationItem', {
          Selected: selectedItems?.includes(targetRef),
          Droppable: dropZone === dropZoneRef,
          Hidden: !!visibilityIdentifier.visibilityIdentifierData,
        })}
        role="treeitem"
        aria-label="List name"
        onDoubleClick={handleExpand}
        tabIndex={0}
        onKeyPress={(): void => {}}
      >
        <button
          className={cnTree('NavigationArrow', { expanded })}
          onClick={handleExpand}
          onKeyPress={handleExpand}
          aria-label="List controller"
          type="button"
          tabIndex={0}
        />

        {iconId && icons && <div className={cnTree('Icon')}>{icons[iconId]}</div>}

        <div className={cnTree('ItemName')}>{name}</div>

        <div
          className={cnTree('Backlight')}
          style={{
            width: rootRef?.current?.offsetWidth ?? '100%',
          }}
        />

        {visibilityIdentifier.renderNavigationIcon()}
      </div>

      <ul ref={dropZoneRef} className={cnTree('NodeList', { expanded })}>
        {children}
      </ul>
    </TreeItemContainer>
  );
};

TreeNode.defaultProps = {
  isDraggable: 'true',
};

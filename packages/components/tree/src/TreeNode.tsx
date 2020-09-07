import React, { useContext, useRef, useState } from 'react';

import cnTree from './cn-tree';
import TreeContext from './context';
import { TreeItemContainer } from './TreeItemContainer';
import { NodeItem } from './types';
import { useTreeHandlers } from './use-tree-handlers';
import { useVisibilityIdentifier } from './use-visability-identifier';

export const TreeNode: React.FC<NodeItem> = (props) => {
  const {
    name,
    id,
    onHideItem,
    onContextMenu,
    onSelectItem,
    onDragStart,
    onDragEnd,
    onDragEnter,
    onDragOver,
    onDragDrop,
    children,
    selectedItems,
    hiddenItems,
    isDraggable,
    dropZone,
    iconId,
  } = props;

  const {
    treeContainerWidth,
    withVisibilitySwitcher,
    isShownLeftLines,
    icons,
    functionIcons,
  } = useContext(TreeContext);

  const [expanded, setExpanded] = useState(false);

  const targetRef = useRef<HTMLLIElement | null>(null);
  const dropZoneRef = useRef<HTMLUListElement | null>(null);

  const { handleDragStart, handleSelect, handleHide, handleContextMenuOpen } = useTreeHandlers({
    ref: targetRef,
    onContextMenu,
    onSelectItem,
    isDraggable,
    onHideItem,
    onDragStart,
  });

  const visibilityIdentifier = useVisibilityIdentifier({ ref: targetRef, handleHide, hiddenItems });

  const handleExpand = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.stopPropagation();

    setExpanded(!expanded);
  };

  const handleDragEnter = (event: React.DragEvent): void => {
    if (onDragEnter) {
      onDragEnter(event, dropZoneRef);
    }
  };

  const handleDragOver = (event: React.DragEvent): void => {
    if (onDragOver) {
      onDragOver(event);
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
      id={id?.toString()}
      onDragOver={handleDragOver}
      targetRef={targetRef}
      onContextMenu={handleContextMenuOpen}
      onDragEnter={handleDragEnter}
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
        onClick={handleSelect}
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
            width: treeContainerWidth,
          }}
        />

        {functionIcons && functionIcons}

        {withVisibilitySwitcher && visibilityIdentifier.renderNavigationIcon()}
      </div>

      <ul
        ref={dropZoneRef}
        data-container-id={id?.toString()}
        className={cnTree('NodeList', { expanded, withLeftLines: isShownLeftLines && expanded })}
      >
        {children}
      </ul>
    </TreeItemContainer>
  );
};

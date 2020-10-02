import React, { useContext, useRef, useState } from 'react';
import { IconArrowDown, IconArrowRight } from '@gpn-prototypes/vega-icons';

import cnTree from './cn-tree';
import TreeContext from './context';
import { TreeItemContainer } from './TreeItemContainer';
import { TreeItemContent } from './TreeItemContent';
import { TreeItem } from './types';
import { useTreeHandlers } from './use-tree-handlers';
import { useVisibilityIdentifier } from './use-visability-identifier';

export const TreeNode: React.FC<TreeItem> = (props) => {
  const { name, id, children, isDraggable, isDropZone = true, iconId } = props;

  const {
    showIndentGuides,
    selectedItems,
    hiddenItems,
    isDndEnable,
    dropZone,
    onHideItem,
    onContextMenu,
    onSelectItem,
    onDragStart,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragDrop,
  } = useContext(TreeContext);

  const [expanded, setExpanded] = useState(false);

  const targetRef = useRef<HTMLLIElement | null>(null);
  const dropZoneRef = useRef<HTMLUListElement | null>(null);

  const {
    targetData,
    handleDragStart,
    handleSelect,
    handleHide,
    handleContextMenuOpen,
  } = useTreeHandlers({
    id,
    ref: targetRef,
    onContextMenu,
    onSelectItem,
    isDraggable: isDndEnable && isDraggable !== false,
    onHideItem,
    onDragStart,
  });

  const visibilityIdentifier = useVisibilityIdentifier({ ref: targetRef, handleHide, hiddenItems });

  const handleToggleExpand = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.stopPropagation();

    setExpanded(!expanded);
  };

  const handleDragEnter = (event: React.DragEvent): void => {
    if (onDragEnter) {
      onDragEnter(event, { id, ref: dropZoneRef, isDropZone });
    }
  };

  const handleDragOver = (event: React.DragEvent): void => {
    if (onDragOver) {
      onDragOver(event);
    }
  };

  const handleDragLeave = (event: React.DragEvent): void => {
    if (onDragLeave) {
      onDragLeave(event, id);
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
      draggable={isDndEnable && isDraggable !== false}
      onDragStart={handleDragStart}
      id={id}
      targetRef={targetRef}
      onContextMenu={handleContextMenuOpen}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={onDragEnd}
      aria-label="List name"
    >
      <TreeItemContent
        className={cnTree('NavigationItem', {
          Selected: selectedItems?.includes(targetData),
          AccessibleDropZone: dropZone?.id === id && dropZone.accessible,
          InaccessibleDropZone: dropZone?.id === id && dropZone?.accessible === false,
          Hidden: visibilityIdentifier.isHidden,
        })}
        onClick={handleSelect}
        name={name}
        iconId={iconId}
        renderVisibilitySwitcher={visibilityIdentifier.renderVisibilitySwitcher}
      >
        <button
          className={cnTree('NavigationArrow', { expanded })}
          onClick={handleToggleExpand}
          role="menuitem"
          onKeyPress={handleToggleExpand}
          aria-label="List controller"
          type="button"
          tabIndex={0}
        >
          {expanded ? <IconArrowDown size="s" /> : <IconArrowRight size="s" />}
        </button>
      </TreeItemContent>

      <ul
        ref={dropZoneRef}
        data-container-id={id}
        onDragLeave={handleDragLeave}
        className={cnTree('NodeList', { expanded, withIndentGuides: showIndentGuides && expanded })}
      >
        {children}
      </ul>
    </TreeItemContainer>
  );
};

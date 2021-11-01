import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { IconArrowDown } from '@consta/uikit/IconArrowDown';
import { IconArrowRight } from '@consta/uikit/IconArrowRight';

import cnTree from './cn-tree';
import TreeContext from './context';
import { TreeItemContainer } from './TreeItemContainer';
import { TreeItemContent } from './TreeItemContent';
import { TreeItem } from './types';
import { useCheckedElementIdentifier } from './use-checked-element-identifier';
import { useTreeHandlers } from './use-tree-handlers';
import { useVisibilityIdentifier } from './use-visibility-identifier';

export const TreeNode: React.FC<TreeItem> = (props) => {
  const {
    name,
    id,
    children,
    isDraggable = true,
    isDropZone = true,
    iconId,
    isExpanded = false,
  } = props;

  const {
    showIndentGuides,
    selectedItems,
    isDndEnable,
    dropZone,
    onHideItem,
    onCheckItem,
    onContextMenu,
    onSelectItem,
    onDragStart,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragDrop,
    onRestoreHiddenItem,
    withDropZoneIndicator,
  } = useContext(TreeContext);

  const [expanded, setExpanded] = useState(isExpanded);

  useLayoutEffect(() => {
    if (isExpanded) {
      setExpanded(true);
    }
  }, [isExpanded]);

  const targetRef = useRef<HTMLLIElement | null>(null);
  const dropZoneRef = useRef<HTMLUListElement | null>(null);

  const {
    targetData,
    handleDragStart,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleSelect,
    handleHide,
    handleCheck,
    handleContextMenuOpen,
  } = useTreeHandlers({
    id,
    ref: targetRef,
    dropZoneRef,
    onContextMenu,
    onSelectItem,
    isDropZone,
    isDraggable: isDndEnable && isDraggable,
    onHideItem,
    onCheckItem,
    onDragStart,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragDrop,
  });

  useEffect(() => {
    if (onRestoreHiddenItem) {
      onRestoreHiddenItem({ id, ref: targetRef });
    }
  }, [id, onRestoreHiddenItem]);
  const visibilityIdentifier = useVisibilityIdentifier({
    item: { id, ref: targetRef },
    handleHide,
  });

  const checkedElementIdentifier = useCheckedElementIdentifier({
    item: { id },
    handleCheck,
  });
  const handleToggleExpand = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.stopPropagation();

    setExpanded(!expanded);
  };

  return (
    <TreeItemContainer
      className={cnTree('TreeNode')}
      draggable={isDndEnable}
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
          AccessibleDropZone:
            withDropZoneIndicator &&
            dropZone &&
            dropZone.ref === dropZoneRef &&
            dropZone.accessible,
          InaccessibleDropZone:
            withDropZoneIndicator &&
            dropZone &&
            dropZone.ref === dropZoneRef &&
            !dropZone.accessible,
          Hidden: visibilityIdentifier.isHidden,
          Checked: checkedElementIdentifier.isChecked,
        })}
        onClick={handleSelect}
        name={name}
        iconId={iconId}
        renderVisibilitySwitcher={visibilityIdentifier.renderVisibilitySwitcher}
        renderCheckedSwitcher={checkedElementIdentifier.renderCheckedSwitcher}
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
        className={cnTree('NodeList', {
          expanded,
          withIndentGuides: showIndentGuides && expanded,
        })}
      >
        {children}
      </ul>
    </TreeItemContainer>
  );
};

import React, { useContext, useEffect, useRef } from 'react';

import cnTree from './cn-tree';
import TreeContext from './context';
import { TreeItemContainer } from './TreeItemContainer';
import { TreeItemContent } from './TreeItemContent';
import { TreeItem } from './types';
import { useCheckedElementIdentifier } from './use-checked-element-identifier';
import { useTreeHandlers } from './use-tree-handlers';
import { useVisibilityIdentifier } from './use-visibility-identifier';

export const TreeLeaf: React.FC<TreeItem> = (props) => {
  const {
    id,
    name,
    isDraggable = true,
    iconId,
    isDropZone = true,
    rich = false,
  } = props;

  const targetRef = useRef<HTMLLIElement | null>(null);

  const {
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

  const {
    targetData,
    handleSelect,
    handleHide,
    handleCheck,
    handleContextMenuOpen,
    handleDragStart,
    handleDragEnter,
    handleDragOver,
    handleDrop,
  } = useTreeHandlers({
    id,
    ref: targetRef,
    dropZoneRef: targetRef,
    onContextMenu,
    isDraggable: isDndEnable && isDraggable,
    onSelectItem,
    onHideItem,
    onCheckItem,
    onDragStart,
    isDropZone,
    onDragEnd,
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
  return (
    <TreeItemContainer
      className={cnTree('Leaf')}
      draggable={isDndEnable}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={onDragEnd}
      id={id}
      targetRef={targetRef}
      onContextMenu={handleContextMenuOpen}
    >
      <TreeItemContent
        className={cnTree('NavigationItem', {
          Selected: selectedItems?.includes(targetData),
          AccessibleDropZone:
            withDropZoneIndicator && dropZone && dropZone.ref === targetRef && dropZone.accessible,
          InaccessibleDropZone:
            withDropZoneIndicator && dropZone && dropZone.ref === targetRef && !dropZone.accessible,
          Hidden: visibilityIdentifier.isHidden,
          Checked: checkedElementIdentifier.isChecked,
        })}
        onClick={handleSelect}
        name={name}
        iconId={iconId}
        labelKind={rich === true ? 'rich' : 'normal'}
        renderVisibilitySwitcher={visibilityIdentifier.renderVisibilitySwitcher}
        renderCheckedSwitcher={checkedElementIdentifier.renderCheckedSwitcher}
      />
    </TreeItemContainer>
  );
};

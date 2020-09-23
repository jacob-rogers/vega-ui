import React, { useContext, useRef } from 'react';

import cnTree from './cn-tree';
import TreeContext from './context';
import { TreeItemContainer } from './TreeItemContainer';
import { TreeItemContent } from './TreeItemContent';
import { TreeItem } from './types';
import { useTreeHandlers } from './use-tree-handlers';
import { useVisibilityIdentifier } from './use-visability-identifier';

export const TreeLeaf: React.FC<TreeItem> = (props) => {
  const { id, name, isDraggable, iconId } = props;

  const targetRef = useRef<HTMLLIElement | null>(null);

  const {
    selectedItems,
    hiddenItems,
    isDndEnable,
    onHideItem,
    onContextMenu,
    onSelectItem,
    onDragStart,
  } = useContext(TreeContext);

  const {
    targetData,
    handleSelect,
    handleHide,
    handleContextMenuOpen,
    handleDragStart,
  } = useTreeHandlers({
    id,
    ref: targetRef,
    onContextMenu,
    isDraggable: isDndEnable && isDraggable !== false,
    onSelectItem,
    onHideItem,
    onDragStart,
  });

  const visibilityIdentifier = useVisibilityIdentifier({ ref: targetRef, handleHide, hiddenItems });

  return (
    <TreeItemContainer
      className={cnTree('Leaf', { Hidden: visibilityIdentifier.isHidden })}
      draggable={isDndEnable && isDraggable !== false}
      onDragStart={handleDragStart}
      id={id}
      targetRef={targetRef}
      onContextMenu={handleContextMenuOpen}
    >
      <TreeItemContent
        className={cnTree('LeafContent', { Selected: selectedItems?.includes(targetData) })}
        onClick={handleSelect}
        name={name}
        iconId={iconId}
        renderVisibilitySwitcher={visibilityIdentifier.renderVisibilitySwitcher}
      />
    </TreeItemContainer>
  );
};

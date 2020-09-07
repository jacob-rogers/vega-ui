import React, { useRef } from 'react';

import cnTree from './cn-tree';
import { TreeItemContainer } from './TreeItemContainer';
import { TreeItemContent } from './TreeItemContent';
import { LeafTree } from './types';
import { useTreeHandlers } from './use-tree-handlers';
import { useVisibilityIdentifier } from './use-visability-identifier';

export const TreeLeaf: React.FC<LeafTree> = (props) => {
  const {
    id,
    name,
    onHideItem,
    onContextMenu,
    onSelectItem,
    onDragStart,
    selectedItems,
    hiddenItems,
    isDraggable,
    iconId,
  } = props;

  const targetRef = useRef<HTMLLIElement | null>(null);

  const { handleSelect, handleHide, handleContextMenuOpen, handleDragStart } = useTreeHandlers({
    ref: targetRef,
    onContextMenu,
    isDraggable,
    onSelectItem,
    onHideItem,
    onDragStart,
  });

  const visibilityIdentifier = useVisibilityIdentifier({ ref: targetRef, handleHide, hiddenItems });

  return (
    <TreeItemContainer
      className={cnTree('Leaf', { Hidden: !!visibilityIdentifier.visibilityIdentifierData })}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      id={id?.toString()}
      targetRef={targetRef}
      onContextMenu={handleContextMenuOpen}
    >
      <TreeItemContent
        className={cnTree('LeafContent', { Selected: selectedItems?.includes(targetRef) })}
        onClick={handleSelect}
        name={name}
        iconId={iconId}
        renderNavigationIcon={visibilityIdentifier.renderNavigationIcon}
      />
    </TreeItemContainer>
  );
};

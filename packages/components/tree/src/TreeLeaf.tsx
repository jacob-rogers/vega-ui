import React, { useRef } from 'react';

import cnTree from './cn-tree';
import { TreeItemContainer } from './TreeItemContainer';
import { LeafTree } from './types';
import { useTreeHandlers } from './use-tree-handlers';
import { useVisibilityIdentifier } from './use-visability-identifier';

export const TreeLeaf: React.FC<LeafTree> = (props) => {
  const {
    name,
    onHideItem,
    onContextMenu,
    onSelectItem,
    onDragStart,
    selectedItems,
    hiddenItems,
    isDraggable,
    iconId,
    icons,
    rootRef,
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
      targetRef={targetRef}
      onContextMenu={handleContextMenuOpen}
    >
      <div
        role="treeitem"
        tabIndex={0}
        onClick={handleSelect}
        className={cnTree('LeafContent', { Selected: selectedItems?.includes(targetRef) })}
        onKeyDown={(): void => {}}
      >
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
    </TreeItemContainer>
  );
};

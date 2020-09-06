import React, { useContext, useRef } from 'react';

import cnTree from './cn-tree';
import TreeContext from './context';
import { TreeItemContainer } from './TreeItemContainer';
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
    rootRef,
  } = props;

  const { withVisibilitySwitcher, icons } = useContext(TreeContext);

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

        {withVisibilitySwitcher && visibilityIdentifier.renderNavigationIcon()}
      </div>
    </TreeItemContainer>
  );
};

import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';

import { useKey, useResizeObserver } from '../../hooks';

import { TreeContextMenu } from './components/TreeContextMenu';
import { useContextMenu } from './components/TreeContextMenu/use-context-menu';
import cnTree from './cn-tree';
import TreeContext from './context';
import renderTree from './tree-creator';
import { ContextMenuTarget, DropZone, HiddenItem, TargetData, TreeProps } from './types';
import { useCheckedItems } from './use-checked-items';
import { useHiddenItems } from './use-hidden-items';

import './Tree.css';

export function Tree<T extends unknown>(
  props: PropsWithChildren<TreeProps<T>>,
): React.ReactElement {
  const {
    isDndEnable = true,
    icons,
    checkedElements,
    nodeList = [],
    projectId,
    onDragStart,
    onDragEnd,
    onPasteItem,
    onSelectItem,
    onHideItem,
    getCheckedItems,
    contextMenuItems,
    actionItemComponents,
    isExternalDraggingElement = false,
    isContextMenuEnable = true,
    withVisibilitySwitcher = true,
    withCheckElementSwitcher = true,
    withDropZoneIndicator = true,
    withMultiSelect = true,
    showIndentGuides = true,
  } = props;

  const [dropZone, setDropZone] = useState<DropZone | null>(null);

  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Array<TargetData>>([]);
  const [contextMenuTarget, setContextMenuTarget] = useState<ContextMenuTarget | null>(null);

  const { hiddenItems, handleHideItem, handleRestoreHiddenItem } = useHiddenItems(projectId);
  const { checkedItems, intermediateItems, handleCheckItem } = useCheckedItems(
    nodeList,
    checkedElements as string[],
    projectId,
  );
  const rootRef = useRef<HTMLDivElement | null>(null);

  const { width: treeContainerWidth } = useResizeObserver(rootRef);

  const { isOpen, menuCoordinates, open, close } = useContextMenu({
    enabled: isContextMenuEnable,
  });

  useKey(
    'Control',
    () => {
      if (withMultiSelect) {
        setIsMultiSelect(true);
      }
    },
    { keyevent: 'keydown' },
  );
  useKey(
    'Control',
    () => {
      if (withMultiSelect) {
        setIsMultiSelect(false);
      }
    },
    { keyevent: 'keyup' },
  );

  useEffect(() => {
    if (getCheckedItems) {
      getCheckedItems(checkedItems);
    }
  }, [checkedItems, getCheckedItems]);

  const handleSelectItem = (selectItem: TargetData): void => {
    if (isMultiSelect && selectedItems) {
      if (selectedItems.includes(selectItem)) {
        const newState = selectedItems.filter((item: TargetData) => item.id !== selectItem.id);

        setSelectedItems([...newState]);

        if (onSelectItem) {
          onSelectItem([...newState]);
        }

        return;
      }

      setSelectedItems([...selectedItems, selectItem]);

      if (onSelectItem) {
        onSelectItem([...selectedItems, selectItem]);
      }

      return;
    }

    if (selectedItems?.includes(selectItem)) {
      setSelectedItems([]);

      if (onSelectItem) {
        onSelectItem([]);
      }
      return;
    }

    setSelectedItems([selectItem]);

    if (onSelectItem) {
      onSelectItem([selectItem]);
    }
  };

  const handleDragStart = (e: React.BaseSyntheticEvent, dragItem: TargetData): void => {
    e.stopPropagation();

    if (!selectedItems.includes(dragItem)) {
      handleSelectItem(dragItem);

      if (onDragStart) {
        const dragItems = isMultiSelect ? [...selectedItems, dragItem] : [dragItem];

        onDragStart(dragItems);
      }

      return;
    }

    if (onDragStart) {
      onDragStart(selectedItems);
    }
  };

  const handleDragOver = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
  };

  const handleDragEnter = (
    e: React.BaseSyntheticEvent,
    dropZoneItem: TargetData & { isDropZone: boolean },
  ): void => {
    e.stopPropagation();
    e.preventDefault();

    const newState = { id: dropZoneItem.id, ref: dropZoneItem.ref, accessible: true };

    const inaccessible =
      !dropZoneItem.isDropZone ||
      (!isExternalDraggingElement &&
        selectedItems?.some((item) => {
          return (
            item.ref?.current?.contains(dropZoneItem.ref?.current as Node) ||
            dropZoneItem.id === item.id ||
            item.ref?.current?.draggable === false
          );
        }));

    if (inaccessible) {
      newState.accessible = false;
    }

    setDropZone(newState);
  };

  const handleDragLeave = (e: React.DragEvent, id: string): void => {
    e.preventDefault();
    e.stopPropagation();

    if (dropZone?.id === id) {
      setDropZone(null);
    }
  };

  const handleDrop = (e: React.BaseSyntheticEvent): void => {
    e.stopPropagation();

    if (!onPasteItem || !dropZone || !dropZone.accessible || !selectedItems) {
      setDropZone(null);

      return;
    }

    const selectedItemsId = selectedItems.map((item) => item.id);

    onPasteItem(selectedItemsId, dropZone.id);

    setDropZone(null);
  };

  const handleDragEnd = (e: React.BaseSyntheticEvent): void => {
    e.stopPropagation();

    if (onDragEnd) {
      onDragEnd();
    }

    setDropZone(null);
  };

  const handleContextMenu = (event: React.MouseEvent, target: ContextMenuTarget) => {
    setContextMenuTarget(target);
    open(event, target);
  };

  return (
    <TreeContext.Provider
      value={{
        treeContainerWidth,
        withVisibilitySwitcher,
        withCheckElementSwitcher,
        withDropZoneIndicator,
        showIndentGuides,
        icons,
        contextMenuTarget,
        actionItemComponents,
        hiddenItems,
        checkedItems,
        intermediateItems,
        selectedItems,
        isDndEnable,
        dropZone,
        projectId,
        onContextMenu: handleContextMenu,
        onDragStart: handleDragStart,
        onDragOver: handleDragOver,
        onDragEnter: handleDragEnter,
        onDragDrop: handleDrop,
        onDragEnd: handleDragEnd,
        onDragLeave: handleDragLeave,
        onSelectItem: handleSelectItem,
        onHideItem: (item: HiddenItem) => handleHideItem(item, onHideItem),
        onCheckItem: (item: string) => handleCheckItem(item),
        onRestoreHiddenItem: handleRestoreHiddenItem,
      }}
    >
      <div className={cnTree()}>
        <div className={cnTree('TreeRootNode')} ref={rootRef}>
          <ul role="tree" tabIndex={0} className={cnTree('RootList')}>
            {nodeList && renderTree(nodeList)}
          </ul>

          {isOpen && menuCoordinates && !!contextMenuItems?.length && contextMenuTarget && (
            <TreeContextMenu
              menuCoordinates={menuCoordinates}
              closeContextMenu={close}
              items={contextMenuItems}
            />
          )}
        </div>
      </div>
    </TreeContext.Provider>
  );
}

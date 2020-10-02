import React, { useRef, useState } from 'react';
import { useKey } from '@gpn-prototypes/vega-hooks';

import { TreeContextMenu } from './components/TreeContextMenu';
import { useContextMenu } from './components/TreeContextMenu/use-context-menu';
import cnTree from './cn-tree';
import TreeContext from './context';
import renderTree from './tree-creator';
import { DropZone, TargetData, TreeProps } from './types';
import { useOnChangeTreeWidth } from './use-on-change-width';

import './Tree.css';

export const Tree: React.FC<TreeProps> = (props) => {
  const {
    isDndEnable = true,
    icons,
    nodeList = [],
    onRenameItem,
    onDuplicateItem,
    onDeleteItem,
    onPasteItem,
    actionItemComponents,
    isContextMenuEnable = false,
    withVisibilitySwitcher = true,
    showIndentGuides = true,
  } = props;

  const [dropZone, setDropZone] = useState<DropZone | null>(null);

  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Array<TargetData>>([]);

  const [hiddenItems, setHiddenItems] = useState<Array<React.RefObject<HTMLElement>> | null>([]);

  const rootRef = useRef<HTMLDivElement | null>(null);

  const treeContainerWidth = useOnChangeTreeWidth(cnTree('TreeRootNode'));

  const { isOpen, menuCoordinates, open, close } = useContextMenu({
    enabled: isContextMenuEnable,
  });

  useKey('Control', () => setIsMultiSelect(true), { keyevent: 'keydown' });
  useKey('Control', () => setIsMultiSelect(false), { keyevent: 'keyup' });

  const handleSelectItem = (selectItem: TargetData): void => {
    if (isMultiSelect && selectedItems) {
      if (selectedItems.includes(selectItem)) {
        const newState = selectedItems.filter((item: TargetData) => item.id !== selectItem.id);

        setSelectedItems([...newState]);

        return;
      }

      setSelectedItems([...selectedItems, selectItem]);

      return;
    }

    if (selectedItems?.includes(selectItem)) {
      setSelectedItems([]);

      return;
    }

    setSelectedItems([selectItem]);
  };

  const handleHideItem = (ref: React.RefObject<HTMLElement>): void => {
    if (hiddenItems?.includes(ref)) {
      const newState = hiddenItems.filter((refItem) => refItem !== ref);

      setHiddenItems([...newState]);

      return;
    }

    if (hiddenItems) {
      setHiddenItems([...hiddenItems, ref]);
    }
  };

  const handleDragStart = (e: React.BaseSyntheticEvent, dragItem: TargetData): void => {
    e.stopPropagation();

    if (!selectedItems?.includes(dragItem)) {
      handleSelectItem(dragItem);
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
      selectedItems?.some((item) => {
        return (
          item.ref?.current?.contains(dropZoneItem.ref?.current as Node) ||
          dropZoneItem.id === item.id ||
          item.ref?.current?.draggable === false
        );
      });

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

    setDropZone(null);
  };

  return (
    <TreeContext.Provider
      value={{
        treeContainerWidth,
        withVisibilitySwitcher,
        showIndentGuides,
        icons,
        actionItemComponents,
        hiddenItems,
        selectedItems,
        isDndEnable,
        dropZone,
        onContextMenu: open,
        onDragStart: handleDragStart,
        onDragOver: handleDragOver,
        onDragEnter: handleDragEnter,
        onDragDrop: handleDrop,
        onDragEnd: handleDragEnd,
        onDragLeave: handleDragLeave,
        onSelectItem: handleSelectItem,
        onHideItem: handleHideItem,
      }}
    >
      <div className={cnTree()}>
        <div className={cnTree('TreeRootNode')} ref={rootRef}>
          <ul role="tree" tabIndex={0} className={cnTree('RootList')}>
            {nodeList && renderTree(nodeList)}
          </ul>

          {isOpen && menuCoordinates && (
            <TreeContextMenu
              menuCoordinates={menuCoordinates}
              closeContextMenu={close}
              handleRename={onRenameItem}
              handleCopy={onDuplicateItem}
              handleDelete={onDeleteItem}
              handlePaste={onPasteItem}
            />
          )}
        </div>
      </div>
    </TreeContext.Provider>
  );
};

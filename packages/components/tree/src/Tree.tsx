import React, { useRef, useState } from 'react';
import { useKey } from '@gpn-prototypes/vega-hooks';

import TreeContextMenu, { ContextMenuData } from './components/TreeContextMenu';
import cnTree from './cn-tree';
import TreeContext from './context';
import { TreeLeaf } from './TreeLeaf';
import { TreeNode } from './TreeNode';
import { LeafTree, NodeItem } from './types';

import './Tree.css';

export const Tree: React.FC<NodeItem> = (props) => {
  const {
    isDndEnable = true,
    icons,
    nodeList,
    onRenameItem,
    onCopyItem,
    onDeleteItem,
    onPasteItem,
    isContextMenuEnable = false,
    withVisibilitySwitcher = true,
    isShownLeftLines = true,
  } = props;

  const [dropZone, setDropZone] = useState<React.RefObject<HTMLElement> | null>(null);

  const [isOpenContextMenu, setIsOpenContextMenu] = useState(false);
  const [contextMenuData, setContextMenuData] = useState<ContextMenuData | null>(null);

  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Array<React.RefObject<HTMLElement>> | null>(
    [],
  );

  const [hiddenItems, setHiddenItems] = useState<Array<React.RefObject<HTMLElement>> | null>([]);

  const rootRef = useRef<HTMLDivElement | null>(null);

  useKey('Control', () => setIsMultiSelect(true), { keyevent: 'keydown' });
  useKey('Control', () => setIsMultiSelect(false), { keyevent: 'keyup' });

  const handleSelectItem = (ref: React.RefObject<HTMLElement>): void => {
    if (isMultiSelect && selectedItems && !selectedItems.includes(ref)) {
      setSelectedItems([...selectedItems, ref]);

      return;
    }

    if (isMultiSelect && selectedItems && selectedItems.includes(ref)) {
      const newState = selectedItems.filter((refItem: React.Ref<HTMLElement>) => refItem !== ref);

      setSelectedItems([...newState]);

      return;
    }

    if (selectedItems?.includes(ref)) {
      setSelectedItems([]);

      return;
    }

    setSelectedItems([ref]);
  };

  const handleHideItem = (ref: React.RefObject<HTMLElement>): void => {
    if (hiddenItems?.includes(ref)) {
      const newState = hiddenItems.filter((refItem) => refItem !== ref);

      setHiddenItems([...newState]);

      return;
    }

    if (hiddenItems) {
      setHiddenItems([...hiddenItems, ref]);

      return;
    }

    setHiddenItems([ref]);
  };

  const handleContextMenu = (event: React.MouseEvent, ref: React.RefObject<HTMLElement>): void => {
    if (!isContextMenuEnable) {
      return;
    }

    event.preventDefault();

    if (rootRef.current) {
      setContextMenuData({
        callerRef: ref,
        style: {
          left: event.clientX - rootRef.current.getBoundingClientRect().left,
          top: event.clientY - rootRef.current.getBoundingClientRect().top,
        },
      });
    }

    setIsOpenContextMenu(true);
  };

  const handleDragStart = (
    e: React.BaseSyntheticEvent,
    ref: React.RefObject<HTMLElement>,
  ): void => {
    e.stopPropagation();

    if (!selectedItems?.includes(ref)) {
      handleSelectItem(ref);
    }
  };

  const handleDragOver = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
  };

  const handleDragEnter = (
    e: React.BaseSyntheticEvent,
    ref: React.RefObject<HTMLElement>,
  ): void => {
    e.stopPropagation();
    e.preventDefault();

    setDropZone(ref);
  };

  const handleDragDrop = (e: React.BaseSyntheticEvent): void => {
    e.stopPropagation();

    if (dropZone && selectedItems) {
      selectedItems.forEach((item) => {
        if (
          !dropZone.current?.contains(item.current as Node) &&
          item.current?.draggable !== false
        ) {
          if (onPasteItem) {
            onPasteItem(
              item.current?.id as string,
              dropZone.current?.dataset.containerId as string,
            );
          }
          // eslint-disable-next-line no-unused-expressions
          dropZone.current?.appendChild(item.current as Node);
        }
      });
    }
  };

  const handleDragEnd = (e: React.BaseSyntheticEvent): void => {
    e.stopPropagation();

    setDropZone(null);
  };

  const renderTree = (t: NodeItem[]): React.ReactElement[] => {
    return t.reduce((acc: Array<React.ReactElement>, node: NodeItem | LeafTree) => {
      if ('nodeList' in node) {
        const element = (
          <TreeNode
            id={node.id}
            name={node.name}
            nodeList={node.nodeList}
            key={node.name}
            dropZone={dropZone}
            rootRef={rootRef}
            isDraggable={isDndEnable && node.isDraggable !== false}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragDrop={handleDragDrop}
            onDragEnd={handleDragEnd}
            onContextMenu={handleContextMenu}
            onSelectItem={handleSelectItem}
            onHideItem={handleHideItem}
            selectedItems={selectedItems}
            hiddenItems={hiddenItems}
            iconId={node.iconId}
          >
            {node.nodeList && renderTree(node.nodeList)}
          </TreeNode>
        );

        acc.push(element);

        return acc;
      }

      if (node.name) {
        acc.push(
          <TreeLeaf
            id={node.id}
            name={node.name}
            key={node.name}
            rootRef={rootRef}
            isDraggable={isDndEnable && node.isDraggable !== false}
            onDragStart={handleDragStart}
            onContextMenu={handleContextMenu}
            onSelectItem={handleSelectItem}
            onHideItem={handleHideItem}
            selectedItems={selectedItems}
            hiddenItems={hiddenItems}
            iconId={node.iconId}
          />,
        );

        return acc;
      }

      return acc;
    }, []);
  };

  return (
    <TreeContext.Provider value={{ withVisibilitySwitcher, isShownLeftLines, icons }}>
      <div className={cnTree()}>
        <div className={cnTree('TreeRootNode')} ref={rootRef}>
          <ul role="tree" tabIndex={0} className={cnTree('RootList')}>
            {nodeList && renderTree(nodeList)}
          </ul>

          {isOpenContextMenu && contextMenuData && (
            <TreeContextMenu
              contextMenuData={contextMenuData}
              setIsOpenContextMenu={setIsOpenContextMenu}
              handleRename={onRenameItem}
              handleCopy={onCopyItem}
              handleDelete={onDeleteItem}
              handlePaste={onPasteItem}
            />
          )}
        </div>
      </div>
    </TreeContext.Provider>
  );
};

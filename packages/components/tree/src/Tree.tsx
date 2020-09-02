import React, { useRef, useState } from 'react';
import { useKey } from '@gpn-prototypes/vega-hooks';

import TreeContextMenu, { ContextMenuData } from './components/TreeContextMenu';
import cnTree from './cn-tree';
import { TreeLeaf } from './TreeLeaf';
import { TreeNode } from './TreeNode';
import { LeafTree, NodeTree } from './types';

import './Tree.css';

export const Tree: React.FC<NodeTree> = (props) => {
  const [currentDraggingElement, setCurrentDraggingElement] = useState<React.RefObject<
    HTMLElement
  > | null>(null);
  const [dropZone, setDropZone] = useState<React.RefObject<HTMLElement> | null>(null);

  const [isOpenContextMenu, setIsOpenContextMenu] = useState<boolean>(false);
  const [contextMenuData, setContextMenuData] = useState<ContextMenuData | null>(null);

  const [isMultiSelect, setIsMultiSelect] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<Array<React.Ref<HTMLElement> | null>>([]);

  const [hiddenItems, setHiddenItems] = useState<Array<React.RefObject<HTMLElement>> | null>([]);

  const rootRef = useRef<HTMLDivElement | null>(null);

  useKey('Control', () => setIsMultiSelect(true), { keyevent: 'keydown' });
  useKey('Control', () => setIsMultiSelect(false), { keyevent: 'keyup' });

  const handleSelectItem = (ref: React.Ref<HTMLElement>): void => {
    if (isMultiSelect && !selectedItems.includes(ref)) {
      setSelectedItems([...selectedItems, ref]);

      return;
    }

    if (isMultiSelect && selectedItems.includes(ref)) {
      const newState = selectedItems.filter((refItem: React.Ref<HTMLElement>) => refItem !== ref);

      setSelectedItems([...newState]);

      return;
    }

    if (selectedItems.includes(ref)) {
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

  const handleContextMenu = (event: React.MouseEvent, ref: React.Ref<HTMLElement>): void => {
    event.preventDefault();

    setContextMenuData({
      callerRef: ref,
      style: {
        left: rootRef.current
          ? event.clientX - rootRef.current.getBoundingClientRect().left
          : '-999',
        top: rootRef.current ? event.clientY - rootRef.current.getBoundingClientRect().top : '-999',
      },
    });

    setIsOpenContextMenu(true);
  };

  const handleDragStart = (
    e: React.BaseSyntheticEvent,
    ref: React.RefObject<HTMLElement>,
  ): void => {
    e.stopPropagation();

    setCurrentDraggingElement(ref);
  };

  const handleDragOver = (e: React.BaseSyntheticEvent, ref: React.RefObject<HTMLElement>): void => {
    e.stopPropagation();
    e.preventDefault();

    setDropZone(ref);
  };

  const handleDragDrop = (e: React.BaseSyntheticEvent): void => {
    e.stopPropagation();

    if (
      dropZone &&
      currentDraggingElement &&
      !dropZone?.current?.contains(currentDraggingElement?.current as Node)
    ) {
      // eslint-disable-next-line no-unused-expressions
      dropZone.current?.appendChild(currentDraggingElement.current as Node);
    }
  };

  const handleDragEnd = (e: React.BaseSyntheticEvent): void => {
    e.stopPropagation();

    setDropZone(null);
    setCurrentDraggingElement(null);
  };

  const renderTree = (t: NodeTree[]): React.ReactElement[] => {
    return t.reduce((acc: Array<React.ReactElement>, node: NodeTree | LeafTree) => {
      if ('nodeList' in node) {
        const element = (
          <TreeNode
            name={node.name}
            nodeList={node.nodeList}
            key={node.name}
            dropZone={dropZone}
            rootRef={rootRef}
            isDraggable={props.isDraggable === false ? props.isDraggable : node.isDraggable}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDragDrop={handleDragDrop}
            handleDragEnd={handleDragEnd}
            handleContextMenu={handleContextMenu}
            handleSelectItem={handleSelectItem}
            handleHideItem={handleHideItem}
            selectedItems={selectedItems}
            hiddenItems={hiddenItems}
            iconId={node.iconId}
            icons={props.icons}
          >
            {node.nodeList && renderTree(node.nodeList)}
          </TreeNode>
        );

        acc.push(element);

        return acc;
      }

      if (node?.name) {
        acc.push(
          <TreeLeaf
            name={node.name}
            key={node.name}
            rootRef={rootRef}
            isDraggable={props.isDraggable === false ? props.isDraggable : node.isDraggable}
            handleDragStart={handleDragStart}
            handleContextMenu={handleContextMenu}
            handleSelectItem={handleSelectItem}
            handleHideItem={handleHideItem}
            selectedItems={selectedItems}
            hiddenItems={hiddenItems}
            icons={props.icons}
            iconId={node.iconId}
          />,
        );

        return acc;
      }

      return acc;
    }, []);
  };

  return (
    <div className={cnTree()}>
      <div className={cnTree('TreeRootNode')} ref={rootRef}>
        <ul role="tree" tabIndex={0} className={cnTree('RootList')}>
          {props.nodeList && renderTree(props.nodeList)}
        </ul>

        {isOpenContextMenu && contextMenuData && (
          <TreeContextMenu
            contextMenuData={contextMenuData}
            setIsOpenContextMenu={setIsOpenContextMenu}
            handleRename={props.handleRename}
            handleCopy={props.handleCopy}
            handleDelete={props.handleDelete}
            handlePaste={props.handlePaste}
          />
        )}
      </div>
    </div>
  );
};

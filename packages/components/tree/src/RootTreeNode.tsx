import React, {useRef, useState} from 'react';

import TreeContextMenu, {ContextMenuData} from './components/TreeContextMenu';
import cnTree from './cn-tree';
import {useMultiSelect} from './hooks';
import {Leaf} from './Leaf';
import {TreeNode} from './TreeNode';
import {LeafType, NodeTreeType} from './types';


export const RootTreeNode: React.FC<NodeTreeType> = (props) => {
  const [currentDraggingElement, setCurrentDraggingElement] = useState<React.RefObject<HTMLElement> | null>(null);
  const [dropZone, setDropZone] = useState<React.RefObject<HTMLElement> | null>(null);
  const [isOpenContextMenu, setIsOpenContextMenu] = useState<boolean>(false);
  const [contextMenuData, setContextMenuData] = useState<ContextMenuData | null>(null);
  const [isMultiSelect, setIsMultiSelect] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<Array<React.Ref<HTMLElement> | null>>([]);
  const [hiddenItems, setHiddenItems] = useState<Array<React.RefObject<HTMLElement>> | null>([]);

  const rootRef = useRef<HTMLDivElement | null>(null);

  const handleSelectItem = (ref: React.Ref<HTMLElement>) => {
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

  const handleHideItem = (ref: React.RefObject<HTMLElement>) => {
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
  }

  const handleKeyBoardEvent = (event: WindowEventMap['keydown' | 'keyup']) => {
    if (event.key !== 'Control') {
      return;
    }

    if (event.type === 'keydown') {
      setIsMultiSelect(true);

      return;
    }

    if (event.type === 'keyup') {
      setIsMultiSelect(false);
    }
  };

  useMultiSelect(handleKeyBoardEvent);

  const handleContextMenu = (event: React.MouseEvent, ref: React.Ref<HTMLElement>) => {
    event.preventDefault();

    setContextMenuData({
      callerRef: ref,
      style: {
        left: rootRef.current ? event.clientX - rootRef.current.getBoundingClientRect().left : '-999',
        top: rootRef.current ? event.clientY - rootRef.current.getBoundingClientRect().top : '-999',
      },
    });

    setIsOpenContextMenu(true);
  };

  const handleDragStart = (e: React.BaseSyntheticEvent, ref: React.RefObject<HTMLElement>) => {
    e.stopPropagation();

    setCurrentDraggingElement(ref);
  };

  const handleDragOver = (e: React.BaseSyntheticEvent, ref: React.RefObject<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setDropZone(ref)
  };

  const handleDragDrop = (e: React.BaseSyntheticEvent): void => {
    e.stopPropagation();

    if (dropZone && currentDraggingElement && !dropZone?.current?.contains(currentDraggingElement?.current as Node)) {
      dropZone.current?.appendChild(currentDraggingElement.current as Node);
    }
  };

  const handleDragEnd = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();

    setDropZone(null);
    setCurrentDraggingElement(null);
  }

  const renderTree = (t: NodeTreeType[]) => {
    return t.reduce((acc: Array<React.ReactElement>, node: NodeTreeType | LeafType) => {
      if ('nodeList' in node) {
        const element = (
          <TreeNode
            isDraggable={props.isDraggable === false ? props.isDraggable : node.isDraggable}
            nodeList={node.nodeList}
            key={node.name}
            dropZone={dropZone}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDragDrop={handleDragDrop}
            handleDragEnd={handleDragEnd}
            handleContextMenu={handleContextMenu}
            handleSelectItem={handleSelectItem}
            handleHideItem={handleHideItem}
            selectedItems={selectedItems}
            hiddenItems={hiddenItems}
            name={node.name}
          >
            {node.nodeList && renderTree(node.nodeList)}
          </TreeNode>
        );

        acc.push(element);

        return acc;
      }

      if (node?.name) {
        acc.push(
          <Leaf
            isDraggable={props.isDraggable === false ? props.isDraggable : node.isDraggable}
            handleDragStart={handleDragStart}
            key={node.name}
            name={node.name}
            handleContextMenu={handleContextMenu}
            handleSelectItem={handleSelectItem}
            handleHideItem={handleHideItem}
            selectedItems={selectedItems}
            hiddenItems={hiddenItems}
          />,
        );

        return acc;
      }

      return acc;
    }, []);
  };

  return (
      <div
        className={cnTree('RootTreeNode')}
        ref={rootRef}
      >
        <ul
          role="tree"
          tabIndex={0}
          className={cnTree('RootList')}
        >
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
  );
};

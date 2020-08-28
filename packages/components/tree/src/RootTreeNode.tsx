import React, {useState} from 'react';

import TreeContextMenu, {ContextMenuData} from './components/TreeContextMenu';
import cnTree from './cn-tree';
import {useMultiSelect} from './hooks';
import {Leaf} from './Leaf';
import {TreeNode} from './TreeNode';
import {LeafType, NodeTreeType, RootTreeProps} from './types';


export const RootTreeNode: React.FC<RootTreeProps> = (props) => {
  const {name, nodeList} = props;

  const [expanded, setExpanded] = useState<boolean>(false);
  const [currentDraggingElement, setCurrentDraggingElement] = useState<React.RefObject<HTMLElement> | null>(null);
  const [dropZone, setDropZone] = useState<React.RefObject<HTMLElement> | null>(null);
  const [isOpenContextMenu, setIsOpenContextMenu] = useState<boolean>(false);
  const [contextMenuData, setContextMenuData] = useState<ContextMenuData | null>(null);
  const [isMultiSelect, setIsMultiSelect] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<Array<React.Ref<HTMLElement> | null>>([]);

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
        left: event.clientX,
        top: event.clientY,
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

  const handleDragEnd = (e: React.BaseSyntheticEvent): void => {
    e.stopPropagation();

    setDropZone(null);
    setCurrentDraggingElement(null);
  }

  const renderTree = (t: NodeTreeType[]) => {
    return t.reduce((acc: Array<React.ReactElement>, node: NodeTreeType | LeafType) => {
      if ('nodeList' in node) {
        const element = (
          <TreeNode
            isDraggable={props.isDraggable}
            nodeList={node.nodeList}
            onlyDropZone={node.onlyDropZone}
            key={node.name}
            dropZone={dropZone}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDragDrop={handleDragDrop}
            handleDragEnd={handleDragEnd}
            handleContextMenu={handleContextMenu}
            handleSelectItem={handleSelectItem}
            selectedItems={selectedItems}
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
            isDraggable={props.isDraggable}
            handleDragStart={handleDragStart}
            key={node.name}
            name={node.name}
            handleContextMenu={handleContextMenu}
            handleSelectItem={handleSelectItem}
            selectedItems={selectedItems}
          />,
        );

        return acc;
      }

      return acc;
    }, []);
  };

  return (
    <>
      <div className={cnTree('RootTreeNode')}>
        <div
          className={cnTree('NavigationItem')}
          role="tree"
          tabIndex={0}
          onDoubleClick={() => {
            setExpanded(!expanded);
          }}
        >
          <div
            className={cnTree('NavigationArrow', {expanded})}
            onClick={() => {
              setExpanded(!expanded);
            }}
            onKeyDown={() => {
              setExpanded(!expanded);
            }}
            aria-label="List controller"
            role="button"
            tabIndex={0}
          />

          {name}
        </div>

        <ul className={cnTree('NodeList', {expanded})}>{renderTree(nodeList)}</ul>
      </div>

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
    </>
  );
};

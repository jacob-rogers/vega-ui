import React, { useRef, useState } from 'react';

import cnTree from './cn-tree';
import TreeNavigationEye from './TreeNavigationEye';
import { NavigationEyeProps, NodeTree } from './types';

export const TreeNode: React.FC<NodeTree> = (props) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [hidden, setIsHidden] = useState<boolean>(false);

  const targetRef = useRef<HTMLLIElement | null>(null);
  const dropZoneRef = useRef<HTMLUListElement | null>(null);

  const handleExpand = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.stopPropagation();

    setExpanded(!expanded);
  };

  const handleHide = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.stopPropagation();

    if (typeof props.handleHideItem === 'function') {
      props.handleHideItem(targetRef);
    }
  };

  const handleSelect = (): void => {
    if (typeof props.handleSelectItem === 'function') {
      props.handleSelectItem(targetRef);
    }
  };

  const handleContextMenuOpen = (event: React.MouseEvent): void => {
    if (typeof props.handleContextMenu === 'function') {
      handleSelect();

      props.handleContextMenu(event, targetRef);
    }
  };

  const handleDragStart = (event: React.DragEvent): void => {
    if (typeof props.handleDragStart === 'function') {
      props.handleDragStart(event, targetRef);
    }
  };

  const handleDragOver = (event: React.DragEvent): void => {
    if (typeof props.handleDragOver === 'function') {
      props.handleDragOver(event, dropZoneRef);
    }
  };

  const handleDrop = (event: React.DragEvent): void => {
    if (typeof props.handleDragDrop === 'function') {
      props.handleDragDrop(event);
    }
  };

  const renderNavigationIcon = (): React.ReactElement<NavigationEyeProps> => {
    if (props.hiddenItems?.includes(targetRef)) {
      if (!hidden) setIsHidden(true);

      return <TreeNavigationEye hidden={hidden} handleHide={handleHide} />;
    }

    if (
      props.hiddenItems?.some((ref) => {
        return ref.current?.contains(targetRef.current as Node);
      })
    ) {
      if (!hidden) setIsHidden(true);

      return <div className={cnTree('NavigationDot')} />;
    }

    if (hidden) {
      setIsHidden(false);
    }

    return <TreeNavigationEye hidden={hidden} handleHide={handleHide} />;
  };

  return (
    <li
      className={cnTree('TreeNode')}
      draggable={props.isDraggable === false ? 'false' : 'true'}
      ref={targetRef}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragStart={handleDragStart}
      onDragEnd={props.handleDragEnd}
    >
      <div
        className={cnTree('NavigationItem', {
          Selected: props.selectedItems?.includes(targetRef),
          Droppable: props.dropZone === dropZoneRef,
          Hidden: hidden,
        })}
        role="treeitem"
        aria-label="List name"
        tabIndex={0}
        onClick={handleSelect}
        onKeyPress={(): void => {}}
        onDoubleClick={handleExpand}
        onContextMenu={handleContextMenuOpen}
      >
        <div
          className={cnTree('NavigationArrow', { expanded })}
          onClick={handleExpand}
          onKeyPress={handleExpand}
          aria-label="List controller"
          role="button"
          tabIndex={0}
        />

        {props.iconId && props.icons && (
          <div className={cnTree('Icon')}>{props.icons[props.iconId]}</div>
        )}

        <div>{props.name}</div>

        {renderNavigationIcon()}
      </div>

      <ul ref={dropZoneRef} className={cnTree('NodeList', { expanded })}>
        {props.children}
      </ul>
    </li>
  );
};

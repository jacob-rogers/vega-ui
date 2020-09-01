import React, {useRef, useState} from 'react';

import cnTree from './cn-tree';
import { LeafType } from './types';
import NavigationEye from "./NavigationEye";


export const Leaf: React.FC<LeafType> = (props) => {
  const [hidden, setIsHidden] = useState<boolean>(false);
  const ref = useRef<HTMLLIElement | null>(null);

  const handleHide = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.stopPropagation();

    if (typeof props.handleHideItem === 'function') {
      props.handleHideItem(ref);
    }
  }

  const handleDragStart = (event: React.DragEvent): void => {
    if (typeof props.handleDragStart === 'function') {
      props.handleDragStart(event, ref);
    }
  };

  const handleSelect = () => {
    if (typeof props.handleSelectItem === 'function') {
      props.handleSelectItem(ref);
    }
  };

  const handleContextMenuOpen = (event: React.MouseEvent) => {
    if (typeof props.handleContextMenu === 'function') {
      handleSelect();

      props.handleContextMenu(event, ref);
    }
  };

  const renderNavigationIcon = () => {
    if (props.hiddenItems?.includes(ref)) {
      if (!hidden) setIsHidden(true);

      return (<NavigationEye
        hidden={hidden}
        handleHide={handleHide}
      />)
    }

    if (props.hiddenItems?.some((_ref) => {
      return _ref.current?.contains(ref.current as Node)
    })) {
      if (!hidden) setIsHidden(true);

      return (<div className={cnTree('NavigationDot')}/>)
    }

    if (hidden) setIsHidden(false);

    return (<NavigationEye
      hidden={hidden}
      handleHide={handleHide}
    />)
  }

  return (
    <li
      className={cnTree('Leaf', { Selected: props.selectedItems?.includes(ref), Hidden: hidden })}
      draggable={props.isDraggable === false ? "false" : "true"}
      onDragStart={handleDragStart}
      ref={ref}
    >
      <div
        role="treeitem"
        tabIndex={0}
        onKeyDown={() => {}}
        onClick={handleSelect}
        onContextMenu={handleContextMenuOpen}
      >
        <div>{props.name}</div>

        {renderNavigationIcon()}
      </div>
    </li>
  );
};

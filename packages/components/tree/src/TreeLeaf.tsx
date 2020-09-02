import React, { useRef, useState } from 'react';

import cnTree from './cn-tree';
import TreeNavigationEye from './TreeNavigationEye';
import { LeafTree, NavigationEyeProps } from './types';

export const TreeLeaf: React.FC<LeafTree> = (props) => {
  const [hidden, setIsHidden] = useState<boolean>(false);
  const ref = useRef<HTMLLIElement | null>(null);

  const handleHide = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.stopPropagation();

    if (typeof props.handleHideItem === 'function') {
      props.handleHideItem(ref);
    }
  };

  const handleDragStart = (event: React.DragEvent): void => {
    if (typeof props.handleDragStart === 'function') {
      props.handleDragStart(event, ref);
    }
  };

  const handleSelect = (): void => {
    if (typeof props.handleSelectItem === 'function') {
      props.handleSelectItem(ref);
    }
  };

  const handleContextMenuOpen = (event: React.MouseEvent): void => {
    if (typeof props.handleContextMenu === 'function') {
      handleSelect();

      props.handleContextMenu(event, ref);
    }
  };

  const renderNavigationIcon = (): React.ReactElement<NavigationEyeProps> => {
    if (props.hiddenItems?.includes(ref)) {
      if (!hidden) setIsHidden(true);

      return <TreeNavigationEye hidden={hidden} handleHide={handleHide} />;
    }

    if (
      props.hiddenItems?.some((_ref) => {
        return _ref.current?.contains(ref.current as Node);
      })
    ) {
      if (!hidden) setIsHidden(true);

      return <div className={cnTree('NavigationDot')} />;
    }

    if (hidden) setIsHidden(false);

    return <TreeNavigationEye hidden={hidden} handleHide={handleHide} />;
  };

  return (
    <li
      className={cnTree('Leaf', { Hidden: hidden })}
      draggable={props.isDraggable === false ? 'false' : 'true'}
      onDragStart={handleDragStart}
      ref={ref}
    >
      <div
        role="treeitem"
        tabIndex={0}
        className={cnTree('LeafContent', { Selected: props.selectedItems?.includes(ref) })}
        onKeyDown={(): void => {}}
        onClick={handleSelect}
        onContextMenu={handleContextMenuOpen}
      >
        {props.iconId && props.icons && (
          <div className={cnTree('Icon')}>{props.icons[props.iconId]}</div>
        )}

        <div className={cnTree('ItemName')}>{props.name}</div>

        <div
          className={cnTree('Backlight')}
          style={{
            width: props.rootRef?.current?.offsetWidth ?? '100%',
          }}
        />

        {renderNavigationIcon()}
      </div>
    </li>
  );
};

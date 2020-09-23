import React from 'react';

export type TreeItemContainerProps = JSX.IntrinsicElements['li'] & {
  className?: string;
  id?: string;
  draggable?: boolean;
  targetRef: React.RefObject<HTMLLIElement>;
  children?: React.ReactNode;
};

export const TreeItemContainer: React.FC<TreeItemContainerProps> = (props) => {
  const {
    id,
    className,
    children,
    onContextMenu,
    onClick,
    onDragStart,
    targetRef,
    draggable,
    ...liProps
  } = props;

  return (
    <li
      {...liProps}
      id={id}
      className={className}
      draggable={draggable}
      onDragStart={onDragStart}
      ref={targetRef}
      onClick={onClick}
      onContextMenu={onContextMenu}
      role="treeitem"
      tabIndex={0}
      onKeyPress={(): void => {}}
    >
      {children}
    </li>
  );
};

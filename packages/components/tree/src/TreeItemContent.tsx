import React, { useContext } from 'react';

import cnTree from './cn-tree';
import TreeContext from './context';

export type TreeItemContentProps = JSX.IntrinsicElements['div'] & {
  className?: string;
  iconId?: string | number;
  name?: string;
  children?: React.ReactNode;
  renderNavigationIcon?: () => React.ReactElement;
};

export const TreeItemContent = (props: TreeItemContentProps): React.ReactElement => {
  const { onClick, onDoubleClick, className, children, iconId, name, renderNavigationIcon } = props;

  const { treeContainerWidth, withVisibilitySwitcher, icons, functionIcons } = useContext(
    TreeContext,
  );

  return (
    <div
      className={className}
      onClick={onClick}
      role="treeitem"
      onDoubleClick={onDoubleClick}
      tabIndex={0}
      onKeyPress={(): void => {}}
    >
      {children}

      {iconId && icons && <div className={cnTree('Icon')}>{icons[iconId]}</div>}

      <div className={cnTree('ItemName')}>{name}</div>

      <div
        className={cnTree('Backlight')}
        style={{
          width: treeContainerWidth,
        }}
      />

      {functionIcons && functionIcons}

      {withVisibilitySwitcher && renderNavigationIcon && renderNavigationIcon()}
    </div>
  );
};

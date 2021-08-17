import React, { useContext } from 'react';

import cnTree from './cn-tree';
import TreeContext from './context';

export type TreeItemContentProps = JSX.IntrinsicElements['div'] & {
  className?: string;
  iconId?: string | number;
  name?: string;
  children?: React.ReactNode;
  renderVisibilitySwitcher?: () => React.ReactElement;
  renderCheckedSwitcher?: () => React.ReactElement;
};

export const TreeItemContent = (props: TreeItemContentProps): React.ReactElement => {
  const {
    onClick,
    className,
    children,
    iconId,
    name,
    renderVisibilitySwitcher,
    renderCheckedSwitcher,
  } = props;

  const {
    treeContainerWidth,
    withVisibilitySwitcher,
    withCheckElementSwitcher,
    icons,
    actionItemComponents,
  } = useContext(TreeContext);

  return (
    <div
      className={className}
      onClick={onClick}
      role="treeitem"
      tabIndex={0}
      onKeyPress={(): void => {}}
    >
      {children}

      {iconId && icons && <div className={cnTree('Icon')}>{icons[iconId]}</div>}
      <div className={cnTree('checkBox')}>
        {withCheckElementSwitcher && renderCheckedSwitcher && renderCheckedSwitcher()}
      </div>
      <div className={cnTree('ItemName')}>{name}</div>

      <div
        className={cnTree('Backlight')}
        style={{
          width: treeContainerWidth,
        }}
      />

      <div className={cnTree('ActionItems')}>
        {actionItemComponents && actionItemComponents}
        {withVisibilitySwitcher && renderVisibilitySwitcher && renderVisibilitySwitcher()}
      </div>
    </div>
  );
};

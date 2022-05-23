import React, { useContext } from 'react';

import cnTree from './cn-tree';
import TreeContext from './context';

export type TreeItemContentProps = JSX.IntrinsicElements['div'] & {
  className?: string;
  iconId?: string | number;
  name?: string;
  children?: React.ReactNode;
  labelKind?: TreeItemLabelKind;
  renderVisibilitySwitcher?: () => React.ReactElement;
  renderCheckedSwitcher?: () => React.ReactElement;
};

export type TreeItemLabelKind = "normal" | "rich";

type TreeItemLabelProps = JSX.IntrinsicElements['div'] & {
  kind?: TreeItemLabelKind;
  text?: string;
};

export const TreeItemLabel = (props: TreeItemLabelProps): React.ReactElement => {
  const {
    kind = 'normal',
    text,
  } = props;

  return (
    <div className={cnTree('ItemName', { Rich: kind === 'rich' })}>{text}</div>
  );
}

export const TreeItemContent = (props: TreeItemContentProps): React.ReactElement => {
  const {
    onClick,
    className,
    children,
    iconId,
    labelKind,
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

      <TreeItemLabel className={cnTree('ItemName')} kind={labelKind} text={name} />

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

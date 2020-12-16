import React, { useContext } from 'react';
import { Button } from '@gpn-prototypes/vega-button';

import cnTree from '../../cn-tree';
import TreeContext from '../../context';
import { ContextMenuItem } from '../../types';

type ContextMenuListProps = {
  items: ContextMenuItem[];
};

const TreeContextMenuList: React.FC<ContextMenuListProps> = (props) => {
  const { items } = props;
  const { contextMenuTarget, onHideItem, onSelectItem, selectedItems, hiddenItems } = useContext(
    TreeContext,
  );
  return (
    <div className={cnTree('ContextMenuList')}>
      {items.map((item) => {
        const title = contextMenuTarget?.current
          ? item.title(contextMenuTarget, {
              selectedItems,
              hiddenItems,
            })
          : '';
        return (
          <Button
            key={item.key}
            label={title}
            aria-label={title}
            onClick={() => {
              if (contextMenuTarget?.current) {
                item.callback(contextMenuTarget, {
                  onHideItem,
                  onSelectItem,
                });
              }
            }}
            size="l"
            form="default"
            width="full"
            view="clear"
            className={cnTree('ContextMenuItem', { withSeparator: item.withSeparator }).toString()}
          />
        );
      })}
    </div>
  );
};

export default TreeContextMenuList;

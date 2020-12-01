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
  const { selectedItems } = useContext(TreeContext);

  return (
    <div className={cnTree('ContextMenuList')}>
      {items.map((item) => (
        <Button
          key={item.key}
          label={item.title}
          aria-label={item.title}
          onClick={() => {
            item.callback(selectedItems[selectedItems.length - 1].id);
          }}
          size="l"
          form="default"
          width="full"
          view="clear"
          className={cnTree('ContextMenuItem', { withSeparator: item.withSeparator }).toString()}
        />
      ))}
    </div>
  );
};

export default TreeContextMenuList;

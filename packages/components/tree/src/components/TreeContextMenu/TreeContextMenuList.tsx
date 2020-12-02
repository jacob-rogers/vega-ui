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
  const { contextMenuTarget } = useContext(TreeContext);

  return (
    <div className={cnTree('ContextMenuList')}>
      {items.map((item) => (
        <Button
          key={item.key}
          label={item.title}
          aria-label={item.title}
          onClick={() => {
            if (contextMenuTarget?.current) {
              item.callback(contextMenuTarget.current.id);
            }
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

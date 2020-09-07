import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';

import cnTree from '../../cn-tree';
import { ContextMenuListProps } from '../../types';

const TreeContextMenuList: React.FC<ContextMenuListProps> = (props) => {
  const handleRenameAction = (): void => {
    if (typeof props.handleRename === 'function') {
      props.handleRename();
    }
  };

  const handleCopyAction = (): void => {
    if (typeof props.handleCopy === 'function') {
      props.handleCopy();
    }
  };

  // const handlePasteAction = (): void => {
  //   if (typeof props.handlePaste === 'function') {
  //     props.handlePaste();
  //   }
  // };

  const handleDeleteAction = (): void => {
    if (typeof props.handleDelete === 'function') {
      props.handleDelete();
    }
  };

  return (
    <div className={cnTree('ContextMenuList')}>
      <Button
        label="Переименовать"
        aria-label="Переименовать"
        onClick={handleRenameAction}
        size="l"
        form="default"
        width="full"
        view="clear"
        className={cnTree('ContextMenuItem', { withSeparator: true }).toString()}
      />

      <Button
        label="Копировать"
        aria-label="Копировать"
        onClick={handleCopyAction}
        size="l"
        form="default"
        width="full"
        view="clear"
        className={cnTree('ContextMenuItem').toString()}
      />

      <Button
        label="Вставить"
        aria-label="Вставить"
        onClick={(): void => {}}
        size="l"
        form="default"
        width="full"
        view="clear"
        className={cnTree('ContextMenuItem').toString()}
      />

      <Button
        label="Удалить"
        aria-label="Удалить"
        onClick={handleDeleteAction}
        size="l"
        form="default"
        width="full"
        view="clear"
        className={cnTree('ContextMenuItem').toString()}
      />
    </div>
  );
};

export default TreeContextMenuList;

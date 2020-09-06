import React, { useRef } from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { useOnClickOutside } from '@gpn-prototypes/vega-hooks';

import cnTree from '../cn-tree';

export type ContextMenuData = {
  callerRef?: React.Ref<HTMLElement>;
  style?: {
    left: number | string;
    top: number | string;
  };
};

type ContextMenuProps = {
  contextMenuData: ContextMenuData;
  setIsOpenContextMenu: (isOpen: boolean) => void;
  handleRename?: () => void;
  handleCopy?: () => void;
  handleDelete?: () => void;
  handlePaste?: (transferringId: string | number, receivingId: string | number) => void;
};

const TreeContextMenu: React.FC<ContextMenuProps> = (props) => {
  const { contextMenuData, setIsOpenContextMenu } = props;

  const contextMenuRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside({ ref: contextMenuRef, handler: () => setIsOpenContextMenu(false) });

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
    <div
      ref={contextMenuRef}
      className={cnTree('ContextMenu')}
      style={{
        left: contextMenuData.style?.left,
        top: contextMenuData.style?.top,
      }}
    >
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
    </div>
  );
};

export default TreeContextMenu;

import React from 'react';

type UseTreeHandlersProps = {
  ref: React.RefObject<HTMLElement>;
  isDraggable?: boolean;
  onHideItem?: (ref: React.RefObject<HTMLElement | HTMLLIElement>) => void;
  onSelectItem?: (ref: React.RefObject<HTMLElement | HTMLDivElement>) => void;

  onContextMenu?(event: React.MouseEvent, ref: React.RefObject<HTMLElement>): void;

  onDragStart?(event: React.DragEvent, ref: React.Ref<HTMLElement>): void;
};

type treeHandlersApi = {
  handleSelect: (event: React.MouseEvent | React.KeyboardEvent) => void;
  handleHide: (event: React.MouseEvent | React.KeyboardEvent) => void;
  handleContextMenuOpen: (event: React.MouseEvent) => void;
  handleDragStart?: (event: React.DragEvent) => void;
};

export const useTreeHandlers = (props: UseTreeHandlersProps): treeHandlersApi => {
  const { ref, onHideItem, onSelectItem, onContextMenu, onDragStart, isDraggable } = props;

  const handleHide = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.stopPropagation();

    if (onHideItem) {
      onHideItem(ref);
    }
  };

  const handleSelect = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.stopPropagation();

    if (onSelectItem) {
      onSelectItem(ref);
    }
  };

  const handleContextMenuOpen = (event: React.MouseEvent): void => {
    if (onContextMenu) {
      handleSelect(event);

      onContextMenu(event, ref);
    }
  };

  const handleDragStart = (event: React.DragEvent): void => {
    if (!isDraggable) {
      return;
    }

    if (onDragStart) {
      onDragStart(event, ref);
    }
  };

  return {
    handleSelect,
    handleHide,
    handleContextMenuOpen,
    handleDragStart,
  };
};

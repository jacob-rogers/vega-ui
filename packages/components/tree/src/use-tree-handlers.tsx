import React, { useEffect, useState } from 'react';
import { TargetData } from '@gpn-prototypes/vega-ui';

type UseTreeHandlersProps = {
  id: string;
  ref: React.RefObject<HTMLElement>;
  isDraggable?: boolean;
  onHideItem?: (ref: React.RefObject<HTMLElement | HTMLLIElement>) => void;
  onSelectItem?: (selectedItem: TargetData) => void;

  onContextMenu?(event: React.MouseEvent, ref: React.RefObject<HTMLElement>): void;

  onDragStart?(event: React.DragEvent, dragItem: TargetData): void;
};

type TreeHandlersApi = {
  targetData: TargetData;
  handleSelect: (event: React.MouseEvent | React.KeyboardEvent) => void;
  handleHide: (event: React.MouseEvent | React.KeyboardEvent) => void;
  handleContextMenuOpen: (event: React.MouseEvent) => void;
  handleDragStart?: (event: React.DragEvent) => void;
};

export const useTreeHandlers = (props: UseTreeHandlersProps): TreeHandlersApi => {
  const { id, ref, onHideItem, onSelectItem, onContextMenu, onDragStart, isDraggable } = props;
  const [targetData, setTargetData] = useState<TargetData>({ id, ref });

  useEffect(() => {
    setTargetData({
      id,
      ref,
    });
  }, [id, ref]);

  const handleHide = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.stopPropagation();

    if (onHideItem) {
      onHideItem(ref);
    }
  };

  const handleSelect = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.stopPropagation();

    if (onSelectItem) {
      onSelectItem(targetData);
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
      onDragStart(event, targetData);
    }
  };

  return {
    targetData,
    handleSelect,
    handleHide,
    handleContextMenuOpen,
    handleDragStart,
  };
};

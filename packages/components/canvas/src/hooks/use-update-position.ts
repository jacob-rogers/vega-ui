import { useCallback } from 'react';
import Konva from 'konva';

import { Position } from '../types';

type KonvaMouseEvent = Konva.KonvaEventObject<MouseEvent>;

export const useUpdatePosition = (
  onPositionChange?: (pos: Position) => void,
): ((e: KonvaMouseEvent) => void) => {
  const handleDragEnd = useCallback(
    (e: KonvaMouseEvent): void => {
      const position = e.target.position();
      if (onPositionChange) {
        onPositionChange(position);
      }
    },
    [onPositionChange],
  );

  return handleDragEnd;
};

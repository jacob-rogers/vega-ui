import { useCallback } from 'react';
import Konva from 'konva';

import { Position } from '../types';

export const useUpdatePosition = (
  onPositionChange?: (pos: Position) => void,
): ((e: Konva.KonvaEventObject<MouseEvent>) => void) => {
  const handleDragEnd = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>): void => {
      const position = e.target.position();
      if (onPositionChange) {
        onPositionChange(position);
      }
    },
    [onPositionChange],
  );

  return handleDragEnd;
};

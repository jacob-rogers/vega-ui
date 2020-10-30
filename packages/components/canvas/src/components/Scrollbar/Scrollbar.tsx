import React from 'react';
import { Rect } from 'react-konva';
import Konva from 'konva';
import { Vector2d } from 'konva/types/types';

import { metrics } from '../../metrics';
import { Size } from '../../types';
import { ScrollbarData } from '../../utils';

type ScrollbarProps = {
  innerRef: React.RefObject<Konva.Rect>;
  type: 'horizontal' | 'vertical';
  stageSize: Size;
  getInitialPoint: (data: ScrollbarData) => number;
  onDragMove?: (e: Konva.KonvaEventObject<DragEvent>) => void;
};

export const Scrollbar: React.FC<ScrollbarProps> = (props) => {
  const { innerRef, type, stageSize, getInitialPoint, onDragMove } = props;

  const initialPoint = getInitialPoint({ type, scrollbar: innerRef?.current });

  const verticalX =
    stageSize.width - metrics.scrollbar.vertical.width - metrics.scrollbar.vertical.marginRight;
  const horizontalY =
    stageSize.height -
    metrics.scrollbar.horizontal.height -
    metrics.scrollbar.horizontal.marginBottom;

  const rect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  if (type === 'vertical') {
    rect.x = verticalX;
    rect.y = initialPoint;
    rect.width = metrics.scrollbar.vertical.width;
    rect.height = metrics.scrollbar.vertical.height;
  }

  if (type === 'horizontal') {
    rect.x = initialPoint;
    rect.y = horizontalY;
    rect.width = metrics.scrollbar.horizontal.width;
    rect.height = metrics.scrollbar.horizontal.height;
  }

  const dragBoundFunc = (position: Vector2d): Vector2d => {
    if (type === 'vertical') {
      const minY = metrics.scrollbar.vertical.marginTop;
      const maxY =
        stageSize.height -
        metrics.scrollbar.vertical.height -
        metrics.scrollbar.vertical.marginBottom;

      return {
        x: verticalX,
        y: Math.max(Math.min(position.y, maxY), minY),
      };
    }

    if (type === 'horizontal') {
      const minX = metrics.scrollbar.horizontal.marginLeft;
      const maxX =
        stageSize.width -
        metrics.scrollbar.horizontal.width -
        metrics.scrollbar.horizontal.marginRight;

      return {
        x: Math.max(Math.min(position.x, maxX), minX),
        y: horizontalY,
      };
    }

    return { x: 0, y: 0 };
  };

  return (
    <Rect
      ref={innerRef}
      {...rect}
      fill={metrics.scrollbar.fill}
      opacity={metrics.scrollbar.opacity}
      draggable
      onDragMove={onDragMove}
      dragBoundFunc={dragBoundFunc}
    />
  );
};

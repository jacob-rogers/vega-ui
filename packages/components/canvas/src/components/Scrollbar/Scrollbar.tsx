import React from 'react';
import { Rect } from 'react-konva';
import Konva from 'konva';
import { Vector2d } from 'konva/types/types';

import { SCROLL_PADDING } from '../../constants';
import { Size } from '../../types';
import { ScrollbarData } from '../../utils';

type ScrollbarProps = {
  innerRef: React.RefObject<Konva.Rect>;
  type: 'horizontal' | 'vertical';
  getInitialPoint: (data: ScrollbarData) => number;
  stageSize: Size;
  onDragMove?: (e: Konva.KonvaEventObject<DragEvent>) => void;
  dragBoundFunc?: (pos: Vector2d) => Vector2d;
};

export const Scrollbar: React.FC<ScrollbarProps> = (props) => {
  const { innerRef, type, getInitialPoint, stageSize, onDragMove } = props;

  const initialPoint = getInitialPoint({ type, scrollbar: innerRef?.current });

  const initialPadding = type === 'vertical' ? stageSize.width : stageSize.height;

  const x = type === 'vertical' ? initialPadding - SCROLL_PADDING - 10 : initialPoint;
  const y = type === 'vertical' ? initialPoint : initialPadding - SCROLL_PADDING - 10;

  const dragBoundFunc = (position: Vector2d): Vector2d => {
    if (type === 'vertical') {
      return {
        x: stageSize.width - SCROLL_PADDING - 10,
        y: Math.max(Math.min(position.y, stageSize.height - 100 - SCROLL_PADDING), SCROLL_PADDING),
      };
    }

    if (type === 'horizontal') {
      return {
        x: Math.max(Math.min(position.x, stageSize.width - 100 - SCROLL_PADDING), SCROLL_PADDING),
        y: stageSize.height - SCROLL_PADDING - 10,
      };
    }

    return { x: 0, y: 0 };
  };

  return (
    <Rect
      ref={innerRef}
      width={type === 'vertical' ? 10 : 100}
      height={type === 'vertical' ? 100 : 10}
      fill="gray"
      opacity={0.8}
      x={x}
      y={y}
      draggable
      onDragMove={onDragMove}
      dragBoundFunc={dragBoundFunc}
    />
  );
};

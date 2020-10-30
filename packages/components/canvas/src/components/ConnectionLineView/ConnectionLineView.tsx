import React from 'react';
import { Shape } from 'react-konva';
import { Context } from 'konva/types/Context';
import { Shape as ShapeType, ShapeConfig } from 'konva/types/Shape';

import { metrics } from '../../metrics';
import { KonvaMouseEvent, Position } from '../../types';

type ConnectionLineViewProps = {
  parent: Position;
  child: Position;
  isSelected?: boolean;
  listening?: boolean;
  onClick?: (e: KonvaMouseEvent) => void;
  onMouseDown?: (e: KonvaMouseEvent) => void;
  onMouseEnter?: (e: KonvaMouseEvent) => void;
  onMouseLeave?: (e: KonvaMouseEvent) => void;
};

/*

  Для рисования линии компонент ConnectionLineView используется напрямую, без обертки ConnectionLine
  Поэтому параметрам isSelected и listening установлены значения по умолчанию

*/

export const ConnectionLineView: React.FC<ConnectionLineViewProps> = (props) => {
  const {
    parent,
    child,
    isSelected = false,
    listening = false,
    onClick,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const dx = child.x - parent.x;
  const dy = child.y - child.y;

  const angle = Math.atan2(-dy, dx);

  const arrowStart = {
    x: parent.x + -metrics.connector.radius * Math.cos(angle + Math.PI),
    y: parent.y + metrics.connector.radius * Math.sin(angle + Math.PI),
  };

  const arrowEnd = {
    x: child.x + -metrics.connector.radius * Math.cos(angle),
    y: child.y + metrics.connector.radius * Math.sin(angle),
  };

  const bezierPoint1 = { x: parent.x + dx / 4, y: parent.y + dy / 4 };
  const bezierPoint2 = { x: child.x - dx / 4, y: child.y + dy / 4 };

  const sceneFunc = (ctx: Context, shape: ShapeType<ShapeConfig>): void => {
    ctx.beginPath();

    ctx.moveTo(arrowStart.x, arrowStart.y);

    ctx.bezierCurveTo(
      bezierPoint1.x,
      bezierPoint1.y,
      bezierPoint2.x,
      bezierPoint2.y,
      arrowEnd.x,
      arrowEnd.y,
    );

    ctx.fillStrokeShape(shape);
  };

  return (
    <Shape
      stroke={isSelected ? metrics.connectionLine.strokeSelected : metrics.connectionLine.stroke}
      strokeWidth={metrics.connectionLine.strokeWidth}
      onClick={(e): void => {
        e.cancelBubble = true;
        if (onClick) {
          onClick(e);
        }
      }}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sceneFunc={sceneFunc}
      listening={listening}
    />
  );
};

import React from 'react';
import { Shape } from 'react-konva';
import { Context } from 'konva/types/Context';
import { Shape as ShapeType, ShapeConfig } from 'konva/types/Shape';

import { useCanvas } from '../../context';
import { KonvaMouseEvent, Position } from '../../types';
import { RADIUS } from '../Connector';

type ConnectionLineViewProps = {
  parent: Position;
  child: Position;
  onMouseDown?: (e: KonvaMouseEvent) => void;
  onClick?: (e: KonvaMouseEvent) => void;
  fill?: string;
};

export const ConnectionLineView: React.FC<ConnectionLineViewProps> = (props) => {
  const { parent, child, onMouseDown, onClick, fill = '#fff' } = props;

  const { setCursor } = useCanvas();

  const dx = child.x - parent.x;
  const dy = child.y - child.y;

  const angle = Math.atan2(-dy, dx);

  const arrowStart = {
    x: parent.x + -RADIUS * Math.cos(angle + Math.PI),
    y: parent.y + RADIUS * Math.sin(angle + Math.PI),
  };

  const arrowEnd = {
    x: child.x + -RADIUS * Math.cos(angle),
    y: child.y + RADIUS * Math.sin(angle),
  };

  const curve = { x: parent.x + dx / 2, y: child.y - dy / 2 };

  const renderLine = (ctx: Context, shape: ShapeType<ShapeConfig>): void => {
    ctx.beginPath();

    ctx.moveTo(arrowStart.x, arrowStart.y);

    ctx.quadraticCurveTo(curve.x, curve.y, arrowEnd.x, arrowEnd.y);

    ctx.stroke();
    ctx.fillStrokeShape(shape);
  };

  return (
    <Shape
      stroke={fill}
      strokeWidth={3}
      onMouseDown={onMouseDown}
      onClick={(e): void => {
        e.cancelBubble = true;
        if (onClick) {
          onClick(e);
        }
      }}
      onMouseEnter={(): void => {
        setCursor('pointer');
      }}
      onMouseLeave={(): void => {
        setCursor('default');
      }}
      sceneFunc={renderLine}
    />
  );
};

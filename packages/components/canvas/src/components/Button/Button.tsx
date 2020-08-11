import React from 'react';
import Konva from 'konva';

import { Position } from '../../types';
import { ListItem } from '../ListItem';

type ButtonProps = {
  onClick: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  position: Position;
  label: string;
};

const getContainerFromEvent = (
  e: Konva.KonvaEventObject<MouseEvent>,
): HTMLDivElement | undefined => {
  const { target: rect } = e;

  const stage = rect.getStage()?.container();

  return stage;
};

// Добавил самую простую кнопку для того, чтобы просто добавить шаг. В финальном варианте ее не будет
export const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, position, label } = props;

  const handleMouseEnter = (e: Konva.KonvaEventObject<MouseEvent>): void => {
    const stage = getContainerFromEvent(e);
    if (stage) {
      stage.style.cursor = 'pointer';
    }
  };

  const handleMouseLeave = (e: Konva.KonvaEventObject<MouseEvent>): void => {
    const stage = getContainerFromEvent(e);
    if (stage) {
      stage.style.cursor = 'default';
    }
  };

  return (
    <ListItem
      position={position}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      label={label}
      draggable={false}
    />
  );
};

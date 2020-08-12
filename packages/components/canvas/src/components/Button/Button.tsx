import React from 'react';
import Konva from 'konva';

import { useHover } from '../../hooks';
import { Position } from '../../types';
import { ListItem } from '../ListItem';

type ButtonProps = {
  onClick: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  position: Position;
  label: string;
};

// Добавил самую простую кнопку для того, чтобы просто добавить шаг. В финальном варианте ее не будет
export const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, position, label } = props;

  const { handleMouseEnter, handleMouseLeave } = useHover({ cursor: 'pointer' });

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

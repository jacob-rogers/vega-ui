import React from 'react';
import Konva from 'konva';

import { useCanvas } from '../../context';
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

  const { setCursor } = useCanvas();

  return (
    <ListItem
      position={position}
      onMouseEnter={(): void => {
        setCursor('pointer');
      }}
      onMouseLeave={(): void => {
        setCursor('default');
      }}
      onClick={onClick}
      label={label}
      draggable={false}
    />
  );
};

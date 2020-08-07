import React from 'react';
import { Group, Image, Rect } from 'react-konva';

import { useImage, useUpdatePosition } from '../../hooks';
import { BaseProps } from '../../types';
import { ListItem } from '../ListItem';
import { Text } from '../Text';

import arrowIcon from './ArrowDown.svg';

export type ListProps = Omit<BaseProps, 'height'>;

export const List: React.FC<ListProps> = (props) => {
  const { position, label, onPositionChange } = props;
  const [icon] = useImage(arrowIcon);

  const handleDragEnd = useUpdatePosition(onPositionChange);

  return (
    <Group x={position.x} y={position.y} width={250} draggable onDragEnd={handleDragEnd}>
      <Rect
        cornerRadius={2}
        height={100}
        width={250}
        strokeWidth={2}
        stroke="rgba(255, 255, 255, 0.2)"
      />
      {icon && <Image image={icon} x={230} y={12} />}
      <Text
        align="center"
        position={{ x: 12, y: 8 }}
        verticalAlign="middle"
        fill="#fff"
        label={label}
        fontSize={14}
      />
      <ListItem
        label="Сейсмика"
        fill="#22272B"
        centerText={false}
        draggable={false}
        width={230}
        position={{ x: 12, y: 40 }}
      />
    </Group>
  );
};

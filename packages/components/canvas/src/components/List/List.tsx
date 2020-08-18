import React from 'react';
import { Group, Image, Rect } from 'react-konva';

import { LIST_PADDING, STEP_HEIGHT, STEP_WIDTH } from '../../constants';
import { useImage, useUpdatePosition } from '../../hooks';
import { BaseProps } from '../../types';
import { ListItem } from '../ListItem';
import { Text } from '../Text';

import arrowIcon from './ArrowDown.svg';

export type ListProps = Omit<BaseProps, 'height'> & {
  draggable?: boolean;
};

export const List: React.FC<ListProps> = (props) => {
  const { position, label, onPositionChange, draggable = true, children } = props;
  const [icon] = useImage(arrowIcon);

  const handleDragEnd = useUpdatePosition(onPositionChange);

  return (
    <Group
      x={position.x}
      y={position.y}
      width={STEP_WIDTH}
      draggable={draggable}
      onDragMove={handleDragEnd}
    >
      <Rect
        cornerRadius={2}
        height={100}
        width={STEP_WIDTH}
        strokeWidth={2}
        stroke="rgba(255, 255, 255, 0.2)"
      />
      {icon && <Image image={icon} x={STEP_WIDTH - 20} y={LIST_PADDING} />}
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
        position={{ x: LIST_PADDING, y: STEP_HEIGHT }}
      />
      {children}
    </Group>
  );
};

import React, { useEffect, useRef, useState } from 'react';
import { Group, Rect } from 'react-konva';
import Konva from 'konva';

import { BaseProps } from '../../types';
import { Text } from '../Text';

type ListItemProps = BaseProps & {
  centerText?: boolean;
  draggable?: boolean;
};

export const ListItem: React.FC<ListItemProps> = (props) => {
  const {
    position,
    fill = '#0078D2',
    height = 40,
    centerText = true,
    label,
    width: widthProp,
    draggable = true,
    onPositionChange,
  } = props;
  const textRef = useRef<Konva.Text>(null);
  const [width, setWidth] = useState(centerText ? 0 : widthProp);

  useEffect(() => {
    if (textRef.current && centerText) {
      setWidth(textRef.current.getTextWidth() + 25);
    }
  }, [centerText]);

  const handleDragEnd = (evt: Konva.KonvaEventObject<DragEvent>): void => {
    const newPosition = evt.target.position();
    if (onPositionChange) {
      onPositionChange(newPosition);
    }
  };

  return (
    <Group x={position.x} y={position.y} draggable={draggable} onDragEnd={handleDragEnd}>
      <Rect cornerRadius={2} height={height} width={width} fill={fill} />
      <Text
        align="center"
        verticalAlign="middle"
        height={height}
        position={{ x: 12 }}
        label={label}
        fill="#fff"
        fontSize={14}
        innerRef={textRef}
      />
    </Group>
  );
};

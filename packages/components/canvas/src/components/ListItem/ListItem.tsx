import React, { useRef, useState } from 'react';
import { Group, Rect } from 'react-konva';
import { useMount } from '@gpn-prototypes/vega-hooks';
import Konva from 'konva';

import { useUpdatePosition } from '../../hooks';
import { BaseProps } from '../../types';
import { Text } from '../Text';

type ListItemProps = BaseProps &
  Omit<React.ComponentProps<typeof Rect>, 'x' | 'y'> & {
    centerText?: boolean;
    draggable?: boolean;
    onWidthUpdate?: (width: number) => void;
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
    children,
    onWidthUpdate,
    ...rest
  } = props;
  const textRef = useRef<Konva.Text>(null);
  const [width, setWidth] = useState(centerText ? 0 : widthProp);

  useMount(() => {
    if (textRef.current && centerText) {
      const newWidth = textRef.current.getTextWidth() + 26;
      setWidth(newWidth);
      if (onWidthUpdate) {
        onWidthUpdate(newWidth);
      }
    }
  });

  const handleDragEnd = useUpdatePosition(onPositionChange);

  return (
    <Group {...rest} x={position.x} y={position.y} draggable={draggable} onDragMove={handleDragEnd}>
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
      {children}
    </Group>
  );
};

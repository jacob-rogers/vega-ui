import React, { useRef, useState } from 'react';
import { Group, Rect } from 'react-konva';
import { useMount } from '@gpn-prototypes/vega-hooks';
import Konva from 'konva';

import { LIST_PADDING, STEP_HEIGHT, STEP_PADDING } from '../../constants';
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
    height = STEP_HEIGHT,
    centerText = true,
    label,
    width: widthProp,
    draggable = true,
    onPositionChange = (): void => {},
    fontSize = 14,
    children,
    onWidthUpdate,
    ...rest
  } = props;
  const textRef = useRef<Konva.Text>(null);
  const [width, setWidth] = useState(centerText ? 0 : widthProp);

  useMount(() => {
    if (textRef.current && centerText) {
      const newWidth = textRef.current.getTextWidth() + STEP_PADDING;
      setWidth(newWidth);
      if (onWidthUpdate) {
        onWidthUpdate(newWidth);
      }
    }
  });

  return (
    <Group
      {...rest}
      x={position.x}
      y={position.y}
      draggable={draggable}
      onDragMove={(e): void => onPositionChange(e.target.position())}
    >
      <Rect cornerRadius={2} height={height} width={width} fill={fill} />
      <Text
        align="center"
        verticalAlign="middle"
        height={height}
        position={{ x: LIST_PADDING }}
        label={label}
        fill="#fff"
        fontSize={fontSize}
        innerRef={textRef}
      />
      {children}
    </Group>
  );
};

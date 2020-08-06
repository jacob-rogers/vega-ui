import React, { useEffect, useRef, useState } from 'react';
import { Group, Rect, Text } from 'react-konva';
import Konva from 'konva';

import { BaseProps } from '../../types';

type SimpleBlockProps = BaseProps & {
  centerText?: boolean;
  draggable?: boolean;
};

export const SimpleBlock: React.FC<SimpleBlockProps> = (props) => {
  const {
    position,
    fill = '#0078D2',
    height = 40,
    centerText = true,
    label,
    width: widthProp,
    draggable = true,
  } = props;
  const textRef = useRef<Konva.Text>(null);
  const [width, setWidth] = useState(centerText ? 0 : widthProp);

  useEffect(() => {
    if (textRef.current && centerText) {
      setWidth(textRef.current.getTextWidth() + 25);
    }
  }, [centerText]);

  return (
    <Group x={position.x} y={position.y} draggable={draggable}>
      <Rect cornerRadius={2} height={height} width={width} fill={fill} />
      <Text
        align="center"
        height={height}
        x={12}
        verticalAlign="middle"
        fill="#fff"
        text={label}
        fontSize={14}
        ref={textRef}
        fontFamily="Segoe UI"
      />
    </Group>
  );
};

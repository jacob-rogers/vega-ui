import React, { useEffect } from 'react';
import { Group, Image, Rect, Text } from 'react-konva';

import { BaseProps } from '../../types';
import { SimpleBlock } from '../SimpleBlock';

import arrowIcon from './ArrowDown.svg';

export type BaseContainerProps = Omit<BaseProps, 'height'>;

export const BaseContainer: React.FC<BaseContainerProps> = (props) => {
  const { position, label } = props;
  const [icon, setIcon] = React.useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const image = new window.Image();
    image.src = arrowIcon;
    image.addEventListener('load', () => setIcon(image));
    return (): void => {
      image.removeEventListener('load', () => setIcon(image));
    };
  }, []);

  return (
    <Group x={position.x} y={position.y} width={250} draggable>
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
        x={12}
        y={8}
        verticalAlign="middle"
        fill="#fff"
        text={label}
        fontSize={14}
        fontFamily="Segoe UI"
      />
      <SimpleBlock
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

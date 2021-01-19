import React, { RefObject } from 'react';
import { Text as KonvaText } from 'react-konva';
import Konva from 'konva';

import { Position } from '../../types';

export type TextProps = React.ComponentProps<typeof KonvaText> & {
  position: Position;
  label: string;
  innerRef?: RefObject<Konva.Text>;
};

export const Text: React.FC<TextProps> = (props) => {
  const {
    label,
    position: { x, y },
    innerRef,
    ...rest
  } = props;

  return <KonvaText {...rest} x={x} y={y} text={label} ref={innerRef} fontFamily="Segoe UI" />;
};

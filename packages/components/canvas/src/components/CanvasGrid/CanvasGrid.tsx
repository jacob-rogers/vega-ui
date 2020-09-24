import React from 'react';
import { Rect } from 'react-konva';
import Konva from 'konva';

import grid from '../../grid.svg';
import { useImage } from '../../hooks';
import { ContentRect } from '../../types';

type CanvasGridProps = {
  innerRef: React.RefObject<Konva.Rect>;
  size: ContentRect;
};

export const CanvasGrid: React.FC<CanvasGridProps> = (props) => {
  const { innerRef, size } = props;
  const [image] = useImage(grid);

  return <Rect {...size} ref={innerRef} fillPatternImage={image} listening={false} />;
};

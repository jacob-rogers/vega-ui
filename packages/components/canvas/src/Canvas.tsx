import React from 'react';
import { Layer, Stage } from 'react-konva';
import block from 'bem-cn';

import { BaseContainer, SimpleBlock } from './components';

import './Canvas.css';

export const Canvas: React.FC<{}> = () => {
  return (
    <Stage className={block('VegaCanvas')} width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <SimpleBlock width={72} position={{ x: 10, y: 10 }} label="Начало" />
        <SimpleBlock width={72} position={{ x: 1000, y: 10 }} label="Конец" />
        <BaseContainer label="Шаг 1" position={{ x: 200, y: 10 }} />
      </Layer>
    </Stage>
  );
};

import React, { useCallback, useEffect, useMemo } from 'react';
import { useLocalStorage, useMount } from '@gpn-prototypes/vega-hooks';

import { CanvasView } from './CanvasView';
import { Canvas as CanvasEntity, CanvasTree, Context, FlatTree, Tree } from './entities';
import { Position } from './types';

import './Canvas.css';

type CanvasState = FlatTree[];

type CanvasProps = {
  state?: CanvasState;
};

const step = Tree.of<Context>({
  data: {
    type: 'step',
    title: 'Шаг',
    position: { x: window.innerWidth / 3, y: window.innerHeight / 3 },
  },
});

const startNode = Tree.of<Context>({
  data: {
    position: { x: 10, y: 300 },
    title: 'Начало',
    type: 'root',
  },
});
const endNode = Tree.of<Context>({
  data: {
    position: { x: 600, y: 300 },
    title: 'Конец',
    type: 'end',
  },
});

const defaultTreeState: CanvasTree[] = [startNode, endNode];

export const Canvas: React.FC<CanvasProps> = (props) => {
  const { state } = props;

  const [treeStateInStorage, setTreeStateInStorage] = useLocalStorage<FlatTree[]>(
    'treeState',
    state ?? CanvasEntity.flatArray(defaultTreeState).map((tree) => CanvasEntity.flat(tree)),
  );

  const canvas = useMemo(() => CanvasEntity.of(treeStateInStorage), [treeStateInStorage]);

  useMount(() => {
    setTreeStateInStorage(canvas.extract());
  });

  useEffect(() => {
    canvas.addListener(() => {
      setTreeStateInStorage(canvas.extract());
    });
  }, [canvas, setTreeStateInStorage]);

  return <CanvasView canvas={canvas} />;
};

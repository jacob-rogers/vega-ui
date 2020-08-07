import React, { useCallback, useEffect, useMemo } from 'react';
import { useLocalStorage } from '@gpn-prototypes/vega-hooks';

import { CanvasView } from './CanvasView';
import { Canvas as CanvasEntity, Context, Node, Tree } from './entities';
import { Position } from './types';

import './Canvas.css';

type CanvasProps = {
  state?: Tree[];
};

const defaultTreeState: Tree[] = [];

export const Canvas: React.FC<CanvasProps> = (props) => {
  const { state } = props;

  const [treeStateInStorage, setTreeStateInStorage] = useLocalStorage<Tree[]>(
    'treeState',
    state ?? defaultTreeState,
  );

  const canvas = useMemo(() => CanvasEntity.create(treeStateInStorage), [treeStateInStorage]);

  const getNode = useCallback(
    (idx: number): TreeItem => {
      return canvas.get(idx);
    },
    [canvas],
  );

  useEffect(() => {
    canvas.addListener(() => {
      setTreeStateInStorage(canvas.extract());
    });
  }, [canvas, setTreeStateInStorage]);

  const onPositionChange = useCallback(
    (idx: number, pos: Position): void => {
      const node = getNode(idx);
      node.setContext({ ...node.getContext(), x: pos.x, y: pos.y });
    },
    [getNode],
  );

  const handleStepAdding = useCallback(() => {
    canvas.createLeaf({
      context: {
        type: 'step',
        label: 'Шаг',
        x: window.innerWidth / 3,
        y: window.innerHeight / 3,
      },
    });
  }, [canvas]);

  return (
    <CanvasView
      tree={canvas.extract()}
      onPositionChange={onPositionChange}
      onStepAdding={handleStepAdding}
      getNode={getNode}
    />
  );
};

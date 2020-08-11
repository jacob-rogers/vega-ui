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

  const getTree = useCallback(
    (idx: string): Tree<Context> | undefined => {
      return canvas.getTree(idx);
    },
    [canvas],
  );

  useEffect(() => {
    canvas.addListener(() => {
      setTreeStateInStorage(canvas.getTrees());
    });
  }, [canvas, setTreeStateInStorage]);

  const onPositionChange = useCallback(
    (idx: string, pos: Position): void => {
      const tree = getTree(idx);

      if (tree) {
        tree.setData({ ...tree.getData(), position: pos });
      }
    },
    [getTree],
  );

  const handleStepAdding = useCallback(() => {
    const node = new Node<Context>({
      type: 'step',
      title: 'Шаг',
      position: { x: window.innerWidth / 3, y: window.innerHeight / 3 },
    });
    canvas.addTree(Tree.of(node));
  }, [canvas]);

  return (
    <CanvasView
      trees={canvas.getTrees()}
      onPositionChange={onPositionChange}
      onStepAdding={handleStepAdding}
    />
  );
};

import React, { useCallback, useEffect, useMemo } from 'react';
import { useLocalStorage } from '@gpn-prototypes/vega-hooks';

import { CanvasView } from './CanvasView';
import { Canvas as CanvasEntity, Context, Node, Tree } from './entities';
import { Position } from './types';

import './Canvas.css';

type CanvasProps = {
  state?: Tree<Context>[];
};

const startNode = new Node<Context>({
  position: { x: 10, y: 300 },
  title: 'Начало',
  type: 'root',
  canHasConnections: ['children'],
});
const endNode = new Node<Context>({
  position: { x: 600, y: 300 },
  title: 'Конец',
  type: 'end',
  canHasConnections: ['parent'],
});

const defaultTreeState: Tree<Context>[] = [Tree.of(startNode), Tree.of(endNode)];

export const Canvas: React.FC<CanvasProps> = (props) => {
  const { state } = props;

  const [treeStateInStorage, setTreeStateInStorage] = useLocalStorage<Tree<Context>[]>(
    'treeState',
    state ?? defaultTreeState,
  );

  const canvas = useMemo(() => CanvasEntity.of(treeStateInStorage), [treeStateInStorage]);

  useEffect(() => {
    canvas.addListener(() => {
      setTreeStateInStorage(canvas.getTrees());
    });
  }, [canvas, setTreeStateInStorage]);

  const onPositionChange = useCallback(
    (idx: string, pos: Position): void => {
      const tree = canvas.getTree(idx);

      if (tree) {
        canvas.setTreeData(tree, { ...tree.getData(), position: pos });
      }
    },
    [canvas],
  );

  const handleStepAdding = useCallback(() => {
    const node = new Node<Context>({
      type: 'step',
      title: 'Шаг',
      position: { x: window.innerWidth / 3, y: window.innerHeight / 3 },
      canHasConnections: ['children', 'parent'],
    });
    canvas.addTree(Tree.of(node));
  }, [canvas]);

  return (
    <CanvasView
      trees={canvas.getTrees()}
      onPositionChange={onPositionChange}
      onStepAdding={handleStepAdding}
      clearSteps={(): void => {
        canvas.removeTrees();
      }}
    />
  );
};

import React, { useCallback, useEffect, useMemo } from 'react';
import { useLocalStorage, useMount } from '@gpn-prototypes/vega-hooks';

import { CanvasView } from './CanvasView';
import { Canvas as CanvasEntity, CanvasTree, Context, FlatTree, Node, Tree } from './entities';
import { Position } from './types';

import './Canvas.css';

type CanvasState = FlatTree[];

type CanvasProps = {
  state?: CanvasState;
};

const step = Tree.of(
  new Node<Context>({
    data: {
      type: 'step',
      title: 'Шаг',
      position: { x: window.innerWidth / 3, y: window.innerHeight / 3 },
      canHasConnections: ['children', 'parent'],
    },
  }),
);

const startNode = Tree.of(
  new Node<Context>({
    data: {
      position: { x: 10, y: 300 },
      title: 'Начало',
      type: 'root',
      canHasConnections: ['children'],
    },
  }),
);
const endNode = Tree.of(
  new Node<Context>({
    data: {
      position: { x: 600, y: 300 },
      title: 'Конец',
      type: 'end',
      canHasConnections: ['parent'],
    },
  }),
);

step.setParent(startNode);

const childStep = Tree.of(
  new Node<Context>({
    data: step.getData(),
  }),
);

childStep.setParent(step);

const defaultTreeState: CanvasTree[] = [startNode, endNode];

export const Canvas: React.FC<CanvasProps> = (props) => {
  const { state } = props;

  const [treeStateInStorage, setTreeStateInStorage] = useLocalStorage<FlatTree[]>(
    'treeState',
    state ?? CanvasEntity.toFlatArray(defaultTreeState),
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

  const onPositionChange = useCallback(
    (tree: Tree<Context>, pos: Position): void => {
      canvas.setTreeData(tree, { ...tree.getData(), position: pos });
    },
    [canvas],
  );

  const handleStepAdding = useCallback(() => {
    const node = new Node<Context>({
      data: {
        type: 'step',
        title: 'Шаг',
        position: { x: window.innerWidth / 3, y: window.innerHeight / 3 },
        canHasConnections: ['children', 'parent'],
      },
    });
    const tree = Tree.of(node);
    canvas.addTree(tree);
  }, [canvas]);

  return (
    <CanvasView
      trees={canvas.getTrees()}
      onStepAdding={handleStepAdding}
      onPositionChange={onPositionChange}
      clearSteps={(): void => {
        canvas.removeTrees();
      }}
    />
  );
};

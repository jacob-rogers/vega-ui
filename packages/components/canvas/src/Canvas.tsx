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

step.setParent(startNode);

const childStep = Tree.of<Context>({
  data: step.getData(),
});

childStep.setParent(step);
endNode.setParent(startNode);

const defaultTreeState: CanvasTree[] = [startNode];

export const Canvas: React.FC<CanvasProps> = (props) => {
  const { state } = props;

  const [treeStateInStorage, setTreeStateInStorage] = useLocalStorage<FlatTree[]>(
    'treeState',
    state ?? CanvasEntity.flatArray(defaultTreeState),
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
      canvas.setData(tree, { ...tree.getData(), position: pos });
    },
    [canvas],
  );

  const handleStepAdding = useCallback(() => {
    const data: Context = {
      type: 'step',
      title: 'Шаг',
      position: { x: window.innerWidth / 3, y: window.innerHeight / 3 },
    };
    const tree = Tree.of({ data });
    const canvasSet = canvas.get();
    const firstNode = canvasSet.values().next();
    canvas.connect(firstNode.value, tree);
  }, [canvas]);

  return (
    <CanvasView
      trees={canvas.extractTrees()}
      onStepAdding={handleStepAdding}
      onPositionChange={onPositionChange}
      clearSteps={(): void => {}}
    />
  );
};

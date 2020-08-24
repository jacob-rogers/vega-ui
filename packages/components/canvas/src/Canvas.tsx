import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useInterval, useUnmount } from '@gpn-prototypes/vega-hooks';

import { CanvasView } from './CanvasView';
import { Canvas as CanvasEntity, CanvasTree, CanvasUpdate, Context, Tree } from './entities';

import './Canvas.css';

type CanvasProps = {
  state?: CanvasTree[];
  onChange?: (change: { update: CanvasUpdate[]; state: CanvasTree[] }) => void;
};

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
  const { state, onChange } = props;

  const [treeState, setState] = useState(state ?? defaultTreeState);
  const [changes, setChanges] = useState<CanvasUpdate[]>([]);

  const canvas = useMemo(() => CanvasEntity.of(treeState), [treeState]);

  const onChangeRef = useRef(onChange);

  useInterval(500, () => {
    if (changes.length && typeof onChangeRef.current === 'function') {
      onChangeRef.current({ update: changes, state: treeState });
      setChanges([]);
    }
  });

  useEffect(() => {
    canvas.addListener((newChanges) => {
      setState(canvas.extract());
      setChanges([...changes, newChanges]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas]);

  useUnmount(() => {
    canvas.removeAllListeners();
  });

  return <CanvasView canvas={canvas} />;
};

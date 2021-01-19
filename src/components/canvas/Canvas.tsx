import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import { useUnmount } from '../../hooks';

import { CanvasView } from './CanvasView';
import { Canvas as CanvasEntity, CanvasView as CanvasViewEntity } from './entities';
import { CanvasTree, CanvasUpdate } from './types';

import './Canvas.css';

export type Change = {
  update: CanvasUpdate;
  state: CanvasTree[];
};

type CanvasProps = {
  state?: CanvasTree[];
  onChange?: (change: Change) => void;
  canvasViewAccessor?: (view: CanvasViewEntity) => void;
};

export const Canvas: React.FC<CanvasProps> = (props) => {
  const { state = [], onChange, canvasViewAccessor } = props;

  const canvas = useMemo(() => CanvasEntity.of(state), [state]);

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const handleChange = useCallback(
    (changes: CanvasUpdate): void => {
      if (typeof onChangeRef.current === 'function') {
        onChangeRef.current({ update: changes, state: canvas.extract() });
      }
    },
    [canvas],
  );

  useEffect(() => {
    canvas.addListener(handleChange);

    // TODO: добавить функцию для обработки нескольких действий удаления/перемещения одновременно
    // const unsub = canvas.addListener(handleChange);
    // return (): void => {
    //   unsub();
    // };
  }, [canvas, handleChange]);

  useUnmount(() => {
    canvas.removeAllListeners();
  });

  return <CanvasView canvasViewAccessor={canvasViewAccessor} canvas={canvas} />;
};

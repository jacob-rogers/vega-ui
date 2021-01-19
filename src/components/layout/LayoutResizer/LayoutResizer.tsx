import React, { useLayoutEffect, useReducer, useRef } from 'react';

import { cnLayout } from '../cn-layout';
import { SplitOrientation } from '../grid';

import { useActiveCursorStyles, useAfterResize, useGlobalMovementHandlers } from './hooks';
import { movementReducer } from './movement-reducer';

type DivProps = JSX.IntrinsicElements['div'];

export interface LayoutResizerProps extends DivProps {
  split: SplitOrientation;
  breakpoint: number;
  containerRef: React.RefObject<HTMLElement>;
  onAfterResize: (breakpoint: number) => void;
}

type Container = HTMLElement | null;

const round = (num: number): number => Math.round((num + Number.EPSILON) * 100) / 100;
const toPercent = (part: number, whole: number): number => round((part / whole) * 100);
const fromPercent = (percent: number, value: number): number => round((value / 100) * percent);

function getContainerWidth(container: Container, split: SplitOrientation): number {
  if (container === null) {
    return 0;
  }

  return split === 'horizontal' ? container.offsetWidth : container.offsetHeight;
}

function getPointerPosition(split: SplitOrientation, event: React.MouseEvent | MouseEvent): number {
  return split === 'horizontal' ? event.clientX : event.clientY;
}

export const LayoutResizer: React.FC<LayoutResizerProps> = (props) => {
  const { split, containerRef, breakpoint, onAfterResize, ...rest } = props;
  const [movement, dispatch] = useReducer(movementReducer, {
    isActive: false,
    position: 50,
    width: 0,
    pointer: 0,
  });

  // обновляем ширину контейнера сразу после первого рендера
  // нужно делать в LayoutEffect, иначе будет промаргивание
  const isWidthAvailable = useRef<boolean>(false);
  useLayoutEffect(() => {
    if (isWidthAvailable.current) {
      return;
    }

    const container = containerRef.current;
    const width = getContainerWidth(container, split);

    if (movement.width !== width) {
      dispatch({ type: 'set-width', width });
      isWidthAvailable.current = true;
    }
  });

  // устанавливаем стили для курсора глобально, когда начинаем перетаскивать
  useActiveCursorStyles(movement.isActive, split);

  // слушаем глобальные события перемещения,
  // так как курсор может выходить за границы контейнера
  useGlobalMovementHandlers(movement.isActive, {
    onMove(event) {
      dispatch({ type: 'move', pointer: getPointerPosition(split, event) });
    },
    onEnd(event) {
      dispatch({ type: 'end', pointer: getPointerPosition(split, event) });
    },
  });

  useLayoutEffect(() => {
    const position = fromPercent(breakpoint, movement.width);
    dispatch({ type: 'set-position', position });
  }, [movement.width, breakpoint]);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (container !== null) {
      const percent = toPercent(movement.position, movement.width);

      container.style.setProperty('--first-view-size', `${percent}fr`);
      container.style.setProperty('--second-view-size', `${100 - percent}fr`);
    }
  }, [containerRef, movement.position, movement.width]);

  useAfterResize(movement.isActive, () => {
    const bp = toPercent(movement.position, movement.width);
    onAfterResize(bp);
  });

  return (
    <div
      tabIndex={-1}
      role="button"
      aria-label="Потянуть"
      title="Потянуть"
      {...rest}
      className={cnLayout('Resizer', { split }).is({ active: movement.isActive }).toString()}
      onMouseDown={(event): void => {
        dispatch({
          type: 'start',
          pointer: getPointerPosition(split, event),
          width: getContainerWidth(containerRef.current, split),
        });
      }}
    />
  );
};

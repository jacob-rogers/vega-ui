import React, { useRef } from 'react';

import { cnSplitPanes } from './cn-split-panes';
import { useSplitPanes } from './SplitPanesContext';

function isLeftMouseButton(event: React.MouseEvent): boolean {
  return event.button === 0;
}

interface ResizerProps {
  onStart(event: React.MouseEvent): void;
}

export const Resizer: React.FC<ResizerProps> = (props) => {
  const { onStart } = props;
  const { split, isResizerActive } = useSplitPanes();
  const ref = useRef<HTMLDivElement | null>(null);

  const active = ref.current !== null ? isResizerActive(ref.current) : false;

  return (
    <div
      ref={ref}
      role="presentation"
      aria-label="Изменить размер"
      aria-current={active}
      tabIndex={-1}
      onMouseDown={(event) => {
        if (isLeftMouseButton(event)) {
          onStart(event);
        }
      }}
      className={cnSplitPanes('Resizer', { split }).is({ active }).toString()}
    />
  );
};

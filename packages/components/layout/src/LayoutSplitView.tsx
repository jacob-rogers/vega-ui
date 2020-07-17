import React from 'react';

import { SplitView } from './grid';
import { LayoutResizer } from './LayoutResizer';
import { LayoutWindow } from './LayoutWindow';

interface LayoutSplitViewProps {
  view: SplitView;
  children: [React.ReactNode, React.ReactNode];
}

export const LayoutSplitView: React.FC<LayoutSplitViewProps> = (props) => {
  const { view, children } = props;
  const breakpoint = view.getBreakpoint();
  const orientation = view.split.getOrientation();
  const [first, second] = children;
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <LayoutWindow ref={containerRef} split={orientation}>
      {first}
      <LayoutResizer
        containerRef={containerRef}
        split={orientation}
        breakpoint={breakpoint}
        onAfterResize={(bp): void => {
          view.setBreakpoint(bp);
        }}
      />
      {second}
    </LayoutWindow>
  );
};

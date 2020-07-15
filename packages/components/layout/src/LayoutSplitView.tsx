import React from 'react';

import { SplitView } from './grid';
import { LayoutWindow } from './LayoutWindow';

interface LayoutSplitViewProps {
  view: SplitView;
  children: [React.ReactNode, React.ReactNode];
}

export const LayoutSplitView: React.FC<LayoutSplitViewProps> = (props) => {
  const { view, children } = props;
  const breakpoint = view.getBreakpoint();
  const orientation = view.split.getOrientation();

  const resizerStyle: React.CSSProperties = {
    display: 'grid',
    [orientation === 'horizontal' ? 'gridTemplateRows' : 'gridTemplateColumns']: '1fr 1fr',
  };

  return (
    <LayoutWindow split={orientation}>
      {children[0]}
      <div style={resizerStyle}>
        <button type="button" onClick={(): void => view.setBreakpoint(breakpoint + 1)}>
          +
        </button>
        <button type="button" onClick={(): void => view.setBreakpoint(breakpoint - 1)}>
          -
        </button>
      </div>
      {children[1]}
    </LayoutWindow>
  );
};

import React from 'react';

import { SplitView } from './grid';

interface LayoutSplitViewProps {
  view: SplitView;
  children: [React.ReactNode, React.ReactNode];
}

function createHEX(): string {
  return Math.random().toString(16).substr(2, 8);
}

export const LayoutSplitView: React.FC<LayoutSplitViewProps> = (props) => {
  const { view, children } = props;
  const breakpoint = view.getBreakpoint();
  const orientation = view.split.getOrientation();

  const color = React.useMemo(createHEX, []);

  const template = `${breakpoint}fr 20px ${100 - breakpoint}fr`;

  const style: React.CSSProperties = {
    display: 'grid',
    border: `10px solid #${color}`,
    [orientation === 'vertical' ? 'gridTemplateRows' : 'gridTemplateColumns']: template,
  };

  const resizerStyle: React.CSSProperties = {
    display: 'grid',
    [orientation === 'horizontal' ? 'gridTemplateRows' : 'gridTemplateColumns']: '1fr 1fr',
  };

  return (
    <div style={style}>
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
    </div>
  );
};

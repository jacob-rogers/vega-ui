import React from 'react';

import { cnLayout } from './cn-layout';
import { Grid, GridState, GridUpdate, Node } from './grid';
import { GridContext } from './hooks';
import { LayoutWidget } from './LayoutDataView';
import { LayoutView } from './LayoutView';

import './Layout.css';

export interface LayoutProps {
  className?: string;
  widgets: LayoutWidget[];
  state?: GridState;
  onChange?: (change: { update: GridUpdate; state: GridState }) => void;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const { state, widgets, onChange, ...rest } = props;

  const grid = React.useMemo(() => {
    const [widget] = widgets;
    return Grid.create(
      state ?? {
        0: Node.createLeaf({ widget: widget?.name }),
      },
    );
  }, [state, widgets]);

  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  React.useEffect(
    () =>
      grid.addListener((update) => {
        if (typeof onChangeRef.current === 'function') {
          onChangeRef.current({ update, state: grid.extract() });
        }
      }),
    [grid, onChangeRef],
  );

  return (
    <GridContext.Provider value={grid}>
      <div {...rest} role="tree" className={cnLayout.mix(rest.className)}>
        <LayoutView widgets={widgets} />
      </div>
    </GridContext.Provider>
  );
};

import React from 'react';

import { Cursor, Grid, GridView } from './grid';

export const GridContext = React.createContext(Grid.create());

function useGrid(): Grid {
  return React.useContext(GridContext);
}

function useForceUpdate(): VoidFunction {
  const [, setState] = React.useState({});

  return React.useMemo(
    (): VoidFunction => (): void => {
      setState({});
    },
    [],
  );
}

export function useGridView(idx: number): GridView {
  const forceUpdate = useForceUpdate();
  const grid = useGrid();
  const view = grid.get(idx);
  const cursor = React.useMemo(() => Cursor.of(idx), [idx]);

  React.useEffect(() => {
    return grid.addListener((update) => {
      if (update.type === 'change' && idx === update.idx) {
        forceUpdate();
        return;
      }

      if (
        update.type === 'close' &&
        (idx === update.idx || update.idx === cursor.left() || update.idx === cursor.right())
      ) {
        forceUpdate();
        return;
      }

      if (update.type === 'split' && idx === update.idx) {
        forceUpdate();
      }
    });
  }, [grid, forceUpdate, idx, cursor]);

  return view;
}

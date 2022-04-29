import React from 'react';
import { HeaderRendererProps } from 'react-data-grid';

import { GridCollection, GridColumn, GridRow, UniColumn } from '../types';
import { DefaultHeader } from '../vega-header';

import { columnsFactory } from './columnsFactory';

export const renderColumns = (
  grid: GridCollection,
  isReadOnly = false,
): GridColumn[] => {
  const HeaderRenderer = (props: HeaderRendererProps<GridRow>) => {
    const { column }: { column: UniColumn } = props;

    return (
      <DefaultHeader
        {...props}
        column={column}
      />
    );
  };

  return grid?.columns
    .filter(
      (column: GridColumn) =>
        column?.visible?.table && grid.filteredDataKeys.columnsKeys.includes(column.key),
    )
    .map((column: GridColumn) =>
      columnsFactory(
        {
          ...column,
        },
        HeaderRenderer,
        isReadOnly,
      ),
    );
};

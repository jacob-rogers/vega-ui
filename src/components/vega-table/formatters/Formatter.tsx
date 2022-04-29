import React from 'react';
import { FormatterProps } from 'react-data-grid';

import { ColumnTypes } from '../enums';
import { GridColumn, GridRow } from '../types';

export default React.memo<FormatterProps<GridRow>>(function Formatter({
  row,
  column,
}: FormatterProps<GridRow>) {
  const col = column as GridColumn;
  const gridRow = row[column.key];

  if (gridRow === undefined) return null;
  if (col.type === ColumnTypes.WithClickEditor) {
    const option = gridRow as string | number;

    return <div>{option}</div>;
  }

  return <div>{gridRow}</div>;
});

import React from 'react';
import { FormatterProps } from 'react-data-grid';
import { defaultTo, eq, isFinite, toNumber } from 'lodash/fp';

import { GridColumn, GridRow } from '../types';
import { limitDecimalPlace } from '../utils/limitDecimalPlace';

export default React.memo<FormatterProps<GridRow>>(function NumberFormatter({
  row,
  column,
}: FormatterProps<GridRow>) {
  const value = defaultTo('', row[column.key]);
  const result =
    !eq(value, '') && isFinite(toNumber(value))
      ? limitDecimalPlace(
          String(value),
          (column as GridColumn).decimalPlace ?? 3,
        )
      : value;

  return <div>{result}</div>;
});

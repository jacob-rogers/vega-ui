import { curry } from 'lodash/fp';

import { BaseTableProps, GridColumn } from '../types';

const getBaseColumn = curry<
  BaseTableProps,
  GridColumn,
  // eslint-disable-next-line @typescript-eslint/ban-types
  Object,
  GridColumn
>((baseProps, column, extraProps) => {
  return {
    ...column,
    ...baseProps,
    ...extraProps,
  };
});

export default getBaseColumn;

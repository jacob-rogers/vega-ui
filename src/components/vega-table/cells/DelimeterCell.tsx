import React, { PropsWithChildren } from 'react';
import { CellRendererProps } from 'react-data-grid';
import { Text } from '@consta/uikit/Text';
import cn from 'classnames';

import { cnCellDelimeter } from '../cn-vega-table';
import { GridRow, UniColumn } from '../types';

type Props = PropsWithChildren<CellRendererProps<GridRow>>;

const DelimeterCell = (props: Props) => {
  const { row } = props;
  const column = props.column as UniColumn;

  return (
    <div
      aria-colindex={column.idx + 1}
      data-test-id="delimeter-cell"
      className={cn(cnCellDelimeter)}
      style={{ gridColumnStart: column.idx + 1 }}
    >
      <Text size="xs" view="ghost" lineHeight="2xs" >
        {row[column.key]}
      </Text>
    </div>
  );
};

export default DelimeterCell;

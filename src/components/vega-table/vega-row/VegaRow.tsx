import React, { useRef } from 'react';
import { CellRendererProps, Row, RowRendererProps } from 'react-data-grid';
import { classnames } from '@bem-react/classnames';

import { CellWithError, DelimeterCell, DropDownCell, SplitterCell } from '../cells';
import { ColumnTypes, RowTypes } from '../enums';
import { GridRow, UniColumn } from '../types';

import { cnRow } from './cn-row';

import './VegaRow.css';

const CellRenderer: React.FC<CellRendererProps<GridRow>> = (
  props,
): JSX.Element => {
  const column = props.column as UniColumn;
  const { row } = props;
  const ref = useRef<HTMLDivElement>(null);
  const isDelimeterCell: boolean = row.type === RowTypes.Delimeter &&
    column.type !== ColumnTypes.Splitter &&
    column.type !== ColumnTypes.Id;

  if (isDelimeterCell)
    return <DelimeterCell {...props} />;

  if (column.type === ColumnTypes.WithClickEditor) {
    return <DropDownCell {...props} />;
  }

  if (column.type === ColumnTypes.Splitter)
    return <SplitterCell {...props} />;

  return <CellWithError {...props} ref={ref} />;
};

export const VegaRow = (props: RowRendererProps<GridRow>) => {
  return (
    <Row
      {...props}
      cellRenderer={CellRenderer}
      className={classnames(
        cnRow(),
        cnRow.state({
          'selected': props.isRowSelected,
          'selected-cell': !!props.selectedCellProps,
        }),
        cnRow(props?.row.style || 'Even'),
        props.rowIdx === 0 ? cnRow('First') : undefined,
      )}
    />
  );
};

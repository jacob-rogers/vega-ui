import { ComponentType } from 'react';
import { HeaderRendererProps } from 'react-data-grid';

import {
  cnCell,
  cnCellId,
  cnCellSplitter,
  cnHeader,
} from '../cn-vega-table';
import { ColumnTypes } from '../enums';
import { Formatter, NumberFormatter } from '../formatters/index';
import { GridColumn, GridRow } from '../types';

import getBaseColumn from './getBaseColumn';
import getBaseProps from './getBaseProps';

export function columnsFactory(
  column: GridColumn,
  HeaderRenderer: ComponentType<HeaderRendererProps<GridRow>>,
  isReadOnly: boolean,
): GridColumn {
  const COMMON_COLUMN_PROPS = {
    editable: !isReadOnly,
    resizable: true,
    sortable: true,
    minWidth: 140,
    dataTestId: 'text-cell',
  };

  const SUPPORT_COLUMN_PROPS = {
    editable: false,
    resizable: false,
    sortable: false,
  };

  const getColumn = getBaseColumn(
    getBaseProps(Formatter, HeaderRenderer),
    column,
  );
  const defaultStyles = {
    headerCellClass: cnHeader
      .state({ renaming: !!column.isRenaming })
      .toString(),
    cellClass: cnCell.toString(),
  };

  switch (column.type) {
    case ColumnTypes.Id:
      return getColumn({
        ...defaultStyles,
        ...SUPPORT_COLUMN_PROPS,
        frozen: true,
        minWidth: 40,
        maxWidth: 55,
        headerCellClass: cnCellId.mix(cnHeader).toString(),
        cellClass: cnCellId.mix(cnCell).toString(),
      });

    case ColumnTypes.Number:
      return getColumn({
        ...defaultStyles,
        ...COMMON_COLUMN_PROPS,
        formatter: NumberFormatter,
        decimalPlace: column.decimalPlace,
        editable: false,
      });

    case ColumnTypes.NotRemovableWithEditor:
      return getColumn({
        ...defaultStyles,
        ...COMMON_COLUMN_PROPS,
        editor: column.columnEditor,
        notRemovable: true,
        resizable: false,
        sortable: false,
      });

    case ColumnTypes.RemovableWithEditor:
      return getColumn({
        ...defaultStyles,
        ...COMMON_COLUMN_PROPS,
        editor: isReadOnly ? null : column.columnEditor,
        notRemovable: false,
      });

    case ColumnTypes.WithClickEditor:
      return getColumn({
        ...defaultStyles,
        editor: isReadOnly ? null : column.columnEditor,
        editorOptions: {
          editOnClick: true,
        },
        minWidth: 125,
      });

    case ColumnTypes.Splitter:
      return getColumn({
        ...SUPPORT_COLUMN_PROPS,
        maxWidth: column.name ? 32 : 12,
        headerCellClass: cnCellSplitter.mix(cnHeader).toString(),
        cellClass: cnCellSplitter.mix(cnCell).toString(),
      });

    default:
      return getColumn({ ...defaultStyles, ...COMMON_COLUMN_PROPS, editor: column.columnEditor });
  }
}

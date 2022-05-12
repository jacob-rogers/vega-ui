import React, { createContext, useContext } from 'react';
import {
  CalculatedColumn,
  DataGridHandle,
  FillEvent,
  PasteEvent,
  RowHeightArgs,
  RowsChangeData,
} from 'react-data-grid';

import { SortDirection } from '../enums';
import {
  CellError,
  CellPosition,
  FilterState,
  GridCell,
  GridCollection,
  GridColumn,
  GridRow,
  SortState,
} from '../types';

export type VegaTableAPI = {
  gridRef: React.RefObject<DataGridHandle> | null;
  grid: GridCollection;
  rowHeight: number | ((args: RowHeightArgs<GridRow>) => number);
  isReadOnly?: boolean,
  handleFill?: (event: FillEvent<GridRow>) => GridRow[];
  handlePaste?: (event: PasteEvent<GridRow>) => GridRow;
  handleRowClick?: (rowIdx: number, row: GridRow, column: CalculatedColumn<GridRow, unknown>) => void;
  handleHeaderClick?: (event: React.MouseEvent) => void;
  handleRowsChange?: (rows: GridRow[], data: RowsChangeData<GridRow, unknown>) => void;
  handleSelectedCellChange?: (position: CellPosition) => void;
  handleColumnsReorder?: (sourceIndex: string, targetIndex: string) => void;
  enableVirtualization?: boolean;
  sorting?: SortState;
  setSorting?: (sort: SortState) => void;
  filtering?: FilterState,
  setFiltering?: (filter: FilterState) => void,
  cellState?: {
    getIsDisabled(cell: GridCell): boolean | null;
    getError(cell: GridCell): CellError | null;
    isAvailableTextEllipsis(cell: GridCell): boolean;
    hasBottomTriangleMark?: (column?: GridColumn, row?: GridRow) => boolean,
    hasTopTriangleMark?: (column?: GridColumn, row?: GridRow) => boolean,
  };
};

export const VegaTableContext = createContext<VegaTableAPI>({
  gridRef: null,
  grid: {
    columns: [],
    rows: [],
    filteredDataKeys: {
      columnsKeys: [],
      rowsKeys: [],
    },
  },
  rowHeight: 32,
  isReadOnly: false,
  handleFill: undefined,
  handlePaste: undefined,
  handleRowClick: () => {},
  handleHeaderClick: () => {},
  handleRowsChange: () => {},
  handleSelectedCellChange: () => {},
  handleColumnsReorder: () => {},
  sorting: {
    columnKey: null,
    direction: SortDirection.UNSET,
  },
  setSorting: () => {},
  filtering: {
    columnKey: null,
    filterValue: [],
  },
  setFiltering: () => {},
  enableVirtualization: false,
  cellState: {
    getIsDisabled: () => false,
    getError: () => null,
    isAvailableTextEllipsis: () => true,
    hasBottomTriangleMark: () => false,
    hasTopTriangleMark: () => false,
  },
});

export const useVegaTable = (): VegaTableAPI => useContext(VegaTableContext);

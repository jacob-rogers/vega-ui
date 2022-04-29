import { ComponentType } from "react";
import {
  CalculatedColumn,
  CellRendererProps,
  Column,
  EditorProps as CommonEditorProps,
  FormatterProps,
  HeaderRendererProps as BaseHeaderRendererProps,
} from "react-data-grid";

import { ColumnTypes, RowTypes, SortDirection, VisibleKeys } from "./enums";

export interface HeaderRendererProps extends BaseHeaderRendererProps<GridRow> {
  column: UniColumn;
}

export type SortState = {
  columnKey: string | null;
  direction: SortDirection;
};

export type FilterNumberRange = {
  start: string;
  end: string;
};

export type FilterState = {
  columnKey: string | null;
  filterValue: string[] | FilterNumberRange;
};

export type VisibilityProperties = {
  [key in VisibleKeys]: boolean;
};

export type SelectedCell = {
  rowIdx: number;
  row: GridRow;
  column: GridColumn;
};

export interface CellError {
  code: string;
  message?: string;
}

export interface GridCell {
  selectedCell: SelectedCell;
  cellData: string;
}

export type UniColumn = CalculatedColumn<GridRow> & GridColumn;

export interface GridRow {
  [columnKey: string]: string | number | undefined;
  style?: 'Odd' | 'Even',
  type: RowTypes,
}

export interface GridColumn extends Column<GridRow> {
  type?: ColumnTypes;
  code?: string;
  decimalPlace?: number;
  isRenaming?: boolean;
  headerId?: string;
  notRemovable?: boolean;
  visible?: VisibilityProperties;
  cellRenderer?: React.ComponentType<CellRendererProps<GridRow>>;
  error?: CellError;
  columnEditor?: ComponentType<EditorProps>;
}

export interface FilteredGridDataKeys {
  columnsKeys: string[];
  rowsKeys: string[];
}

export interface GridCollection {
  columns: GridColumn[];
  rows: GridRow[];
  rowsToDisplay: GridRow[];
  filteredDataKeys: FilteredGridDataKeys;
  isLoading?: boolean;
  tempColumnIndex?: number | null;
}

export interface CellPosition {
  idx: number;
  rowIdx: number;
}

export type BaseProps = {
  formatter: ComponentType<FormatterProps<GridRow>>;
  headerRenderer: ComponentType<BaseHeaderRendererProps<GridRow>>;
};

export type OptionItem = {
  displayName: string;
  value: boolean;
  text?: string;
};

export interface DropdownOption {
  id: string;
  value: string;
  text: string;
}

export interface DropDownEditorProps
  extends CommonEditorProps<GridRow | undefined> {
  options: { [index: string]: DropdownOption };
}

export type EditorProps = CommonEditorProps<GridRow | undefined> | DropDownEditorProps;

export type EditorResult = {
  editor?: ComponentType<EditorProps>;
};

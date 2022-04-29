import React, { forwardRef, PropsWithChildren } from 'react';
import { CellRendererProps } from 'react-data-grid';
import classNames from 'classnames';

import { useVegaTable } from '../../context';
import { GridRow } from '../../types';

import { cnDropDownCell } from './cn-dropdown-cell';

import './DropDownCell.css';

type Props = PropsWithChildren<CellRendererProps<GridRow>>;

const DropDownCell = (
  props: Props,
  ref: React.Ref<HTMLDivElement>,
): JSX.Element => {
  const {
    className,
    column,
    isRowSelected,
    isCellSelected,
    row,
    rowIdx,
    onClick,
    onRowChange,
    onContextMenu,
    selectRow,
    selectCell,
    onDragOver,
    isCopied,
    isDraggedOver,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dragHandleProps,
    ...rest
  } = props;

  const { isReadOnly, handleRowClick } = useVegaTable();
  const { cellClass } = column;
  const position = { rowIdx, idx: column.idx };
  const style = {
    width: column.width,
  };

  const cellClassName = classNames(
    'rdg-cell',
    {
      'rdg-cell-frozen': column.frozen,
      'rdg-cell-selected': isCellSelected && !isReadOnly,
      'rdg-cell-dragged-over': isDraggedOver,
      'rdg-cell-copied': isCopied,
    },
    typeof cellClass === 'function' ? cellClass(row) : cellClass,
    cnDropDownCell.toString(),
    className,
  );
  const selectCellWrapper = (openEditor?: boolean) => {
    selectCell(position, openEditor);
  };

  const handleCellClick = () => {
    selectCellWrapper(column.editorOptions?.editOnClick);
    selectRow({
      rowIdx,
      checked: true,
      isShiftClick: false,
    });
    handleRowClick?.(rowIdx, row, column);
  };

  const handleRowChange = (newRow: GridRow) => {
    onRowChange(rowIdx, newRow);
  };

  const onRowSelectionChange = (checked: boolean, isShiftClick: boolean) => {
    selectRow({
      rowIdx,
      checked,
      isShiftClick,
    });
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      aria-colindex={column.idx + 1}
      aria-selected={isCellSelected}
      ref={ref}
      className={classNames(cellClassName)}
      onClick={(e) => {
        onClick?.(e);
        handleCellClick();
      }}
      onContextMenu={onContextMenu}
      onDragOver={onDragOver}
      style={style}
      {...rest}
    >
      <column.formatter
        row={row}
        rowIdx={rowIdx}
        column={column}
        isRowSelected={isRowSelected}
        onRowSelectionChange={onRowSelectionChange}
        isCellSelected
        onRowChange={handleRowChange}
      />
    </div>
  );
};

export default React.memo(forwardRef<HTMLDivElement, Props>(DropDownCell));

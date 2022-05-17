import React, {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CalculatedColumn, CellRendererProps } from 'react-data-grid';
import { Tooltip } from '@consta/uikit/Tooltip';
import cn from 'classnames';

import { cnCellTooltip, cnCellValueError } from '../cn-vega-table';
import { useVegaTable } from '../context';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { GridRow, UniColumn } from '../types';

type Props = PropsWithChildren<CellRendererProps<GridRow>>;

function getCellStyle<R, SR>(
  column: CalculatedColumn<R, SR>,
): React.CSSProperties {
  return column.frozen
    ? { left: `var(--frozen-left-${column.key})` }
    : { gridColumnStart: column.idx + 1 };
}

const CellWithError = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    rowIdx: currentRowIdx,
    row,
    selectCell,
    selectRow,
    onContextMenu,
    onDragOver,
    onKeyDown,
    isCopied,
    isDraggedOver,
    dragHandleProps,
    onRowChange,
    isRowSelected,
    isCellSelected,
  } = props;
  const { cellState, isReadOnly, handleRowClick, handleRowContextClick } = useVegaTable();
  const column = props.column as UniColumn;
  const innerRef = useRef<HTMLDivElement>(null);
  const combinedRef = useCombinedRefs(ref, innerRef);
  const [isShowError, setIsShowError] = useState(false);
  const position = {
    idx: column.idx,
    rowIdx: currentRowIdx,
  };
  const selectedCell = JSON.parse(
    localStorage.getItem('selectedCell') || '{}',
  );
  const cellError = useMemo(() => {
    return cellState?.getError(selectedCell);
  }, [cellState, selectedCell]);

  /** Effects */
  useEffect(() => {
    const cell = combinedRef.current;

    // добавление '...' автоматически рисуемому библиотекой ребенку div'а
    if (cell && cellState?.isAvailableTextEllipsis(selectedCell)) {
      if (cell.firstChild) {
        const reactDataGridNode = cell.firstChild as HTMLDivElement;

        reactDataGridNode.classList.add('rdg-cell__clippedText');
      }
    }
  }, [cellState, column.type, combinedRef, selectedCell]);

  const isCellDisabled = useMemo(
    () => cellState?.getIsDisabled(selectedCell),
    [cellState, selectedCell],
  );

  const selectCellWrapper = (shouldOpenEditor?: boolean) => {
    selectCell(position, shouldOpenEditor);
  };

  const handleCellClick = () => {
    if (!isCellDisabled) {
      selectCellWrapper(column.editorOptions?.editOnClick);
      handleRowClick?.(currentRowIdx, row, column);
    }
  };

  function handleDoubleClick() {
    if (!isCellDisabled) {
      selectCellWrapper(true);
    }
  }

  const handleRowChange = (newRow: GridRow) => {
    onRowChange(currentRowIdx, newRow);
  };

  const onRowSelectionChange = (checked: boolean, isShiftClick: boolean) => {
    if (!isCellDisabled) {
      selectRow({
        rowIdx: currentRowIdx,
        checked,
        isShiftClick,
      });
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      aria-colindex={column.idx + 1}
      aria-selected={isCellSelected}
      data-test-id="text-cell"
      className={cn('rdg-cell', column.cellClass, {
        'rdg-cell-frozen': column.frozen,
        'rdg-cell-selected': isCellSelected && !isReadOnly,
        'rdg-cell-dragged-over': isDraggedOver,
        'rdg-cell-copied': isCopied,
        'rdg-cell-have-triangle-mark': cellState?.hasBottomTriangleMark?.(props.column, props.row),
        'rdg-cell-selected-mark': cellState?.hasTopTriangleMark?.(props.column, props.row),
        'rdg-cell-disabled': isCellDisabled,
        [cnCellValueError]: !!cellError,
      })}
      style={getCellStyle(column)}
      onClick={handleCellClick}
      onDoubleClick={ handleDoubleClick}
      onContextMenu={(e) => {
        onContextMenu?.(e);
        handleRowContextClick?.(e, combinedRef, row);
      }}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setIsShowError(true)}
      onMouseLeave={() => setIsShowError(false)}
      onDragOver={onDragOver}
      ref={combinedRef}
    >
      <column.formatter
        column={column}
        rowIdx={currentRowIdx}
        row={row}
        isRowSelected={isRowSelected}
        isCellSelected={isCellSelected}
        onRowChange={handleRowChange}
        onRowSelectionChange={onRowSelectionChange}
      />
      {dragHandleProps && (
        <div className="rdg-cell-drag-handle" {...dragHandleProps} />
      )}
      {isShowError && cellError && (
        <Tooltip
          size="s"
          anchorRef={combinedRef}
          direction="rightCenter"
          className={cnCellTooltip.toString()}
        >
          {cellError.message}
        </Tooltip>
      )}
    </div>
  );
};

export default React.memo(forwardRef<HTMLDivElement, Props>(CellWithError));

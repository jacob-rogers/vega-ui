import React, {
  ComponentType,
  ReactElement,
  useRef,
  useState,
} from 'react';
import { HeaderRendererProps } from 'react-data-grid';
import { DragObjectWithType, useDrag, useDrop } from 'react-dnd';
import { Tooltip } from '@consta/uikit/Tooltip';
import { block } from 'bem-cn';
import classNames from 'classnames';

import {
  cnCellIcons,
  cnCellTooltip,
} from '../../cn-vega-table';
import { useVegaTable } from '../../context';
import { ColumnTypes } from '../../enums';
import { TableFilterPopover } from '../../filter-popover/TableFilterPopover';
import useCombinedRefs from '../../hooks/useCombinedRefs';
import { Sorting } from '../../sorting/Sorting';
import { GridColumn, GridRow } from '../../types';

import '../Header.css';

interface ColumnDragObject extends DragObjectWithType {
  key: string;
}

interface IProps {
  column: GridColumn;
  className?: string;
  precedingContent?: ComponentType | ReactElement;
}

export type DraggableHeaderProps = IProps & HeaderRendererProps<GridRow>;
export const geoCategory = 'geoCategory';
const headerBlock = block('Header');

export const DraggableHeader = ({
  className = '',
  precedingContent,
  ...props
}: DraggableHeaderProps): JSX.Element => {
  const {
    sorting,
    filtering,
    isReadOnly,
    handleHeaderClick,
    handleColumnsReorder,
  } = useVegaTable();

  const {
    name,
    key: columnKey,
    type,
    isRenaming,
  } = props.column;
  const columnType = type || ColumnTypes.None;

  const [isColumnRenaming, setRenaming] = useState(isRenaming);

  const [{ isDragging }, drag] = useDrag({
    item: { key: props.column.key, type: columnType, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: [
      ColumnTypes.Number,
      ColumnTypes.RemovableWithEditor,
      ColumnTypes.NotRemovableWithEditor,
      ColumnTypes.None,
    ],
    canDrop: (item) => item.type === columnType,
    drop: ({ key }: ColumnDragObject) => {
      if (!isReadOnly)
        handleColumnsReorder?.(key, props.column.key);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const innerRef = useRef<HTMLDivElement>(null);
  const combinedRef = useCombinedRefs<HTMLDivElement>(innerRef, drag, drop);

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const hasError = !!props.column.error;
  const errorMessage = props.column.error?.message;

  const openEditor = () => {
    if (!isColumnRenaming) {
      return (
        <>
          <span>{name}</span>
          {columnKey !== 'id' && (
            <div className={cnCellIcons.toString()}>
              {sorting && <Sorting columnKey={columnKey} />}
              {filtering && <TableFilterPopover column={props.column} />}
            </div>
          )}
        </>
      );
    }

    return props.column.columnEditor;
  };

  const handleDoubleClick = (event: React.MouseEvent) => {
    if (!isReadOnly) {
      handleHeaderClick!(event);
      setRenaming(true);
    }
  };

  const handleContextMenuClick = (event: React.MouseEvent) => {
    if (isReadOnly) return;
    if (isColumnRenaming) event.stopPropagation();
  };

  return (
    <>
      {isTooltipVisible && (
        <Tooltip
          anchorRef={combinedRef}
          size="s"
          className={cnCellTooltip.toString()}
        >
          {errorMessage}
        </Tooltip>
      )}
      <div
        ref={combinedRef}
        className={classNames(
          className,
          headerBlock('Root'),
          isDragging && headerBlock('IsDragging'),
          isOver && headerBlock('IsOver'),
          hasError && headerBlock('Error'),
        )}
        onMouseEnter={() => {
          if (hasError) setIsTooltipVisible(true);
        }}
        onMouseLeave={() => setIsTooltipVisible(false)}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenuClick}
      >
        {precedingContent}
        <div className={headerBlock('WrapperText')}>{openEditor()}</div>
      </div>
    </>
  );
};

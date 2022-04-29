import React, { forwardRef, PropsWithChildren, useRef, useState } from 'react';
import { CellRendererProps } from 'react-data-grid';
import { Tooltip } from '@consta/uikit/Tooltip';
import cn from 'classnames';

import { ColumnTypes } from '../enums';
import useCombinedRefs from '../hooks/useCombinedRefs';
import { GridRow, UniColumn } from '../types';

type Props = PropsWithChildren<CellRendererProps<GridRow>>;

const SplitterCell = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { rowIdx } = props;
  const column = props.column as UniColumn;
  const innerRef = useRef<HTMLDivElement>(null);
  const combinedRef = useCombinedRefs(ref, innerRef);
  const nameRef = useRef<HTMLDivElement>(null);
  const [splitterNameHovered, setSplitterNameHovered] = useState(false);
  const isSplitterFirstCell =
    rowIdx === 0 && column.type === ColumnTypes.Splitter;

  const handleMouseEnter = (): void => {
    if (column.name) setSplitterNameHovered(true);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      aria-colindex={column.idx + 1}
      data-test-id="splitter-cell"
      className={cn('rdg-cell-splitter', column.cellClass)}
      style={{ gridColumnStart: column.idx + 1 }}
      ref={combinedRef}
    >
      {isSplitterFirstCell ? (
        <div className={cn('splitter-name-wrapper')} ref={nameRef}>
          <div
            className={cn('splitter-name')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setSplitterNameHovered(false)}
          >
            {column.name}
          </div>
          {splitterNameHovered && (
            <Tooltip
              anchorRef={nameRef}
              size="m"
              direction="rightCenter"
              className={cn('splitter-name-tooltip')}
            >
              {column.name}
            </Tooltip>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(forwardRef<HTMLDivElement, Props>(SplitterCell));

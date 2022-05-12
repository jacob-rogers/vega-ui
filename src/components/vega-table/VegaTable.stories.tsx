import React, { useEffect, useRef, useState } from 'react';
import { DataGridHandle } from 'react-data-grid';
import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';

import { TABLE_DATA } from './__mocks__/tableData';
import { ColumnTypes, RowTypes, SortDirection } from './enums';
import { FilterState, GridCell, SortState } from './types';
import { VegaTable } from './VegaTable';


const Container = styled.div`
  display: flex;
  height: 100vh;
  top: 50px;
`;

storiesOf('ui/VegaTable', module)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Draft' } })
  .add('not-read-only', () => {
    const [sortState, setSortState] = useState<SortState>({
      columnKey: null,
      direction: SortDirection.UNSET,
    });
    const [filterState, setFilterState] = useState<FilterState>({
      columnKey: null,
      filterValue: [],
    });
    const gridRef = useRef<DataGridHandle>(null);

    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.gridRef = gridRef.current;
    });

    return (
      <Container>
        <VegaTable
          gridRef={gridRef}
          grid={{
            columns: TABLE_DATA.columns,
            rows: TABLE_DATA.rows,
            filteredDataKeys: TABLE_DATA.filteredDataKeys,
          }}
          rowHeight={(args) => {
            if (args.type === 'ROW') {
              return args.row.type === RowTypes.Default ? 32 : 24;
            }
            return 32;
          }}
          cellState={{
            getIsDisabled: () => false,
            getError: () => null,
            isAvailableTextEllipsis: (cell: GridCell) => {
              return cell.selectedCell?.column?.type === ColumnTypes.WithClickEditor || false;
            },
            hasBottomTriangleMark: (column, row) =>
              !!((column?.key === 'MINE' && row?.MINE === 'залежь 2')),
            hasTopTriangleMark: (column) =>
              !!((column?.key === '2544f6ae-5950-45f5-b81e-197ae6f1765d')),
          }}
          handleHeaderClick={(event) => {
            // eslint-disable-next-line no-console
            console.log('event', event)
          }}
          sorting={sortState}
          setSorting={(sort) => {
            // eslint-disable-next-line no-console
            console.log('sort to save', sort);
            setSortState(sort);
          }}
          filtering={filterState}
          setFiltering={(filter) => {
            setFilterState(filter);
            // eslint-disable-next-line no-console
            console.log('filter', filter);
          }}
          handleColumnsReorder={(sourceIndex, targetIndex) => {
            // eslint-disable-next-line no-console
            console.log('handle reorder columns: move from ', sourceIndex,' to ', targetIndex);
          }}
        />
      </Container>
    );
  })
  .add('read-only', () => {
    const gridRef = useRef<DataGridHandle>(null);

    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.gridRef = gridRef.current;
    });

    return (
      <Container>
        <VegaTable
          gridRef={gridRef}
          grid={{
            columns: TABLE_DATA.columns,
            rows: TABLE_DATA.rows,
            filteredDataKeys: TABLE_DATA.filteredDataKeys,
          }}
          isReadOnly
          rowHeight={(args) => {
            if (args.type === 'ROW') {
              return args.row.type === RowTypes.Default ? 32 : 24;
            }
            return 32;
          }}
          cellState={{
            getIsDisabled: () => false,
            getError: () => null,
            isAvailableTextEllipsis: (cell: GridCell) => {
              return cell.selectedCell?.column?.type === ColumnTypes.WithClickEditor || false;
            }
          }}
        />
      </Container>
    );
  });

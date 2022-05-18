import React, { useMemo } from 'react';
import ReactDataGrid from 'react-data-grid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { renderColumns } from './columns/renderColumns';
import { VegaTableAPI } from './context/VegaTableContext';
import { cnVegaTable } from './cn-vega-table';
import { VegaTableContext } from './context';
import VegaRow from './vega-row';

import './VegaTable.css';

export const VegaTable: React.FC<VegaTableAPI> = (props) => {
  const {
    gridRef,
    grid,
    rowHeight,
    isReadOnly,
    handleFill,
    handlePaste,
    handleRowClick,
    handleHeaderClick,
    handleRowsChange,
    handleSelectedCellChange,
    handleColumnsReorder,
    sorting,
    setSorting,
    filtering,
    setFiltering,
    enableVirtualization,
    cellState,
    handleHeaderContextClick,
    handleRowContextClick,
  } = props;

  const columnsList = useMemo(() => {
    return renderColumns(
      grid,
      isReadOnly,
    );
  }, [grid, isReadOnly]);

  const contextValue: VegaTableAPI = useMemo(() => {
    return {
      gridRef,
      grid,
      rowHeight,
      isReadOnly,
      handleFill,
      handlePaste,
      handleRowClick,
      handleHeaderClick,
      handleRowsChange,
      handleSelectedCellChange,
      handleColumnsReorder,
      sorting,
      setSorting,
      filtering,
      setFiltering,
      enableVirtualization,
      cellState,
      handleHeaderContextClick,
      handleRowContextClick,
    };
  }, [
    cellState,
    enableVirtualization,
    filtering,
    grid,
    gridRef,
    handleColumnsReorder,
    handleFill,
    handleHeaderClick,
    handlePaste,
    handleRowClick,
    handleRowsChange,
    handleSelectedCellChange,
    isReadOnly,
    rowHeight,
    setFiltering,
    setSorting,
    sorting,
    handleHeaderContextClick,
    handleRowContextClick,
  ]);

  return (
    <VegaTableContext.Provider
      value={contextValue}
    >
      <DndProvider backend={HTML5Backend}>
        <ReactDataGrid
          className={cnVegaTable()}
          ref={gridRef}
          columns={columnsList}
          rows={grid.rows}
          rowHeight={rowHeight}
          onFill={handleFill}
          onPaste={handlePaste}
          onRowClick={handleRowClick}
          onRowsChange={handleRowsChange}
          onSelectedCellChange={handleSelectedCellChange}
          rowRenderer={VegaRow}
          enableVirtualization={enableVirtualization}
          // TODO: подумать, как это улучшить
          style={{
            height: `calc(var(--header-row-height) * ${grid.rows.length + 1})`,
          }}
        />
      </DndProvider>
    </ VegaTableContext.Provider>
  );
};

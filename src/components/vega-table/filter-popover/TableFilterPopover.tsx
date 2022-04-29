import React, { useMemo, useState } from 'react';
import { Button } from '@consta/uikit/Button';
import { IconFunnel } from '@consta/uikit/IconFunnel';
import { Popover } from '@consta/uikit/Popover';
import { block } from 'bem-cn';

import { useVegaTable } from '../context';
import { ColumnTypes } from '../enums';
import { TableNumberFilter } from '../number-filter/NumberFilter';
import { TableTextFilter } from '../text-filter/TextFilter';
import { FilterNumberRange, FilterState, GridColumn, GridRow, OptionItem } from '../types';
import { getUniqueColumnTexts } from '../utils/getUniqueColumnTexts';

import './TableFilterPopover.css';

const cnTableFilterPopover = block('TableFilterPopover');

type Props = {
  column: GridColumn;
};

export const TableFilterPopover: React.FC<Props> = ({ column }) => {
  const { grid, filtering, setFiltering } = useVegaTable();
  const rowsToFilter: GridRow[] = grid?.rows || [];

  /** State */
  const [isFilterOpened, setIsFilterOpened] = useState<boolean>(false);

  const currentFilterValue: FilterState = filtering || {
    columnKey: null,
    filterValue: [],
  };

  const columnTextOptions: OptionItem[] = useMemo(() => {
    return getUniqueColumnTexts(column.key, rowsToFilter);
  }, [column.key, rowsToFilter]);

  const isColumnNumeric: boolean = useMemo(() => {
    return (
      column.type === ColumnTypes.Number ||
      column.type === ColumnTypes.RemovableWithEditor
    );
  }, [column]);

  const isSearchable: boolean = useMemo(() => {
    return (column.type !== ColumnTypes.WithClickEditor);
  }, [column]);

  const handleFilterTogglerClick = () => (): void => {
    setIsFilterOpened(!isFilterOpened);
  };

  const onToggle = handleFilterTogglerClick();

  const getFilterToSet = (
    filterValue: OptionItem[] | FilterNumberRange,
  ): FilterNumberRange | string[] => {
    if ((filterValue as OptionItem[]).length) {
      return (filterValue as OptionItem[]).map((option) => option.displayName);
    }

    return filterValue as FilterNumberRange;
  };

  const handleFilterSave = (filterValue: OptionItem[] | FilterNumberRange) => {
    setFiltering?.({
      columnKey: column.key,
      filterValue: getFilterToSet(filterValue),
    });

    onToggle();
  };

  const handleCancel = (): void => {
    setFiltering?.({
      columnKey: null,
      filterValue: [],
    });
    setIsFilterOpened(false);
  };

  const mapSelectedFiltersToOption = useMemo((): OptionItem[] => {
    if (!Array.isArray(currentFilterValue.filterValue)) {
      return [];
    }

    const mappedResult: OptionItem[] = columnTextOptions.filter((option) =>
      (currentFilterValue.filterValue as string[]).includes(option.displayName),
    );

    return mappedResult;
  }, [columnTextOptions, currentFilterValue]);

  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return column.key ? (
    <div
      className={cnTableFilterPopover({
        isActive: currentFilterValue.columnKey === column.key && !isFilterOpened,
        isOpened: isFilterOpened,
      })}
    >
      <Button
        ref={buttonRef}
        size="xs"
        iconSize="s"
        view="clear"
        onlyIcon
        onClick={onToggle}
        className={cnTableFilterPopover()}
        iconLeft={IconFunnel}
      />
      {isFilterOpened && buttonRef.current && (
        <Popover
          anchorRef={buttonRef}
          possibleDirections={['downRight', 'downLeft']}
          direction="downRight"
          offset={4}
          arrowOffset={12}
          onClickOutside={onToggle}
        >
          {isColumnNumeric ? (
            <TableNumberFilter
              onConfirm={handleFilterSave}
              filterValue={currentFilterValue.filterValue as FilterNumberRange}
              onCancel={handleCancel}
            />
          ) : (
            <TableTextFilter
              items={columnTextOptions}
              onConfirm={handleFilterSave}
              filterValue={mapSelectedFiltersToOption}
              onCancel={handleCancel}
              searchable={isSearchable}
            />
          )}
        </Popover>
      )}
    </div>
  ) : null;
};

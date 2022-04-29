import React, { useCallback } from 'react';
import { Button } from '@consta/uikit/Button';
import { IconSortDown } from '@consta/uikit/IconSortDown';
import { IconSortUp } from '@consta/uikit/IconSortUp';
import { IconUnsort } from '@consta/uikit/IconUnsort';
import { block } from 'bem-cn';

import { useVegaTable } from '../context';
import { SortDirection } from '../enums';

import './Sorting.css';

export const cn = block('SortingIcons');

interface Props {
  columnKey: string;
}

export const Sorting: React.FC<Props> = ({ columnKey }) => {
  const { sorting, setSorting } = useVegaTable();
  const currentColumnKey: string | null = sorting?.columnKey || null;
  const currentDirection: SortDirection = sorting?.direction || SortDirection.UNSET;

  const getSortingIcon = useCallback((): React.FC => {
    if (
      columnKey !== currentColumnKey ||
      currentDirection === SortDirection.UNSET
    ) {
      return IconUnsort;
    }

    return currentDirection === SortDirection.DESC
      ? IconSortDown
      : IconSortUp;
  }, [columnKey, currentColumnKey, currentDirection]);

  const getDirection = useCallback(
    (): SortDirection => {
      if (columnKey !== currentColumnKey) {
        return SortDirection.ASC;
      }

      switch (currentDirection) {
        case SortDirection.UNSET:
          return SortDirection.ASC;
        case SortDirection.ASC:
          return SortDirection.DESC;
        case SortDirection.DESC:
          return SortDirection.ASC;
        default:
          return SortDirection.UNSET;
      }
    },
    [columnKey, currentColumnKey, currentDirection],
  );

  const handleSort = useCallback(() => {
    setSorting?.({
      columnKey,
      direction: getDirection(),
    })
  }, [columnKey,getDirection, setSorting]);

  return (
    <div
      className={cn({
        isActive: sorting?.columnKey === columnKey,
      })}
    >
      <Button
        size="xs"
        iconSize="s"
        view="clear"
        onlyIcon
        onClick={handleSort}
        iconLeft={getSortingIcon()}
        className={cn()}
      />
    </div>
  );
};

import { GridRow, OptionItem } from '../types';

export function getUniqueColumnTexts(
  columnKey: string,
  rows: GridRow[],
): OptionItem[] {
  if (rows.length && columnKey) {
    let uniqueOptions: OptionItem[] | [] = [];
    const allOptions: OptionItem[] = rows
      .filter((row: GridRow) => !!row[columnKey])
      .map((row: GridRow): OptionItem => {
        return {
          displayName: (row[columnKey]! || '').toLocaleString(),
          value: true,
        };
      });

    uniqueOptions = [
      ...new Map(
        allOptions.map((option) => [option.displayName, option]),
      ).values(),
    ];

    return uniqueOptions;
  }

  return [];
}

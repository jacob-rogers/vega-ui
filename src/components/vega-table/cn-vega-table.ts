import { block } from 'bem-cn';

export const cnVegaTable = block('VegaTable');
export const cnHeader = cnVegaTable('Header');
export const cnCell = cnVegaTable('Cell');
export const cnCellTooltip = cnVegaTable('Cell', 'Tooltip');
export const cnCellValue = cnVegaTable('Cell', 'Value');
export const cnCellId = cnVegaTable('Cell', 'Id');
export const cnCellSplitter = cnVegaTable('Cell', 'Splitter');
export const cnCellDelimeter = cnVegaTable('Cell', 'Delimeter');
export const cnCellIcons = cnVegaTable('Cell', 'Icons');

export const cnCellRenaming = cnCell.state({ renaming: true });
export const cnCellValueError = cnCellValue.state({
  error: true,
});


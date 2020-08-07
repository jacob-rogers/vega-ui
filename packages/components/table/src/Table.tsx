import React from 'react';
import { Table as BaseTable } from '@gpn-design/uikit/Table';

export type TableProps = React.ComponentProps<typeof BaseTable>;

export const Table: React.FC<TableProps> = (props) => {
  return <BaseTable {...props} />;
};

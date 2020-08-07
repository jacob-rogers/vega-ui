import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Table, TableProps } from './Table';

class ResizeObserver {
  // eslint-disable-next-line class-methods-use-this
  observe(): void {}

  // eslint-disable-next-line class-methods-use-this
  unobserve(): void {}

  // eslint-disable-next-line class-methods-use-this
  disconnect(): void {}
}
// @ts-expect-error
window.ResizeObserver = ResizeObserver;

const columns: TableProps['columns'] = [
  {
    title: '№',
    accessor: 'id',
    align: 'center',
    width: 100,
    sortable: true,
  },
  {
    title: 'Имя',
    accessor: 'name',
    sortable: true,
  },
];

const rows: TableProps['rows'] = [
  {
    id: '1',
    name: 'Антон',
  },
  {
    id: '2',
    name: 'Василий',
  },
  {
    id: '3',
    name: 'Аркадий',
  },
];

function renderComponent(props: TableProps): RenderResult {
  return render(<Table {...props} />);
}

describe('Table', () => {
  test('рендерится без ошибок', () => {
    renderComponent({ columns, rows });
  });
});

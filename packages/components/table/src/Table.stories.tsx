import React from 'react';
import { storiesOf } from '@storybook/react';

import { Table, TableProps } from './Table';

storiesOf('ui/Table', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href: 'https://ui-kit.gpn.vercel.app/?path=/story/components-table--interactive',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
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

    return <Table columns={columns} rows={rows} />;
  });

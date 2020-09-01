import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react';

import {Tree} from './Tree';
import {RootProps} from './types';

const rootProps: RootProps = [{
  name: 'Усть-Енисей',
  isDraggable: false,
  nodeList: [
    {
      name: 'Поднятие 44-23',
      isDraggable: false,
      nodeList: [
        {
          name: 'Залежь - 78',
          nodeList: [
            {
              name: 'Ловушка 100',
              nodeList: [
                {
                  name: 'Еще что нибудь',
                },
              ],
            },
          ],
        },
        {
          name: 'Залежь - 79',
          nodeList: [
            {
              name: 'Ловушка 101',
            },
          ],
        },
        {
          name: 'Залежь - 56',
        },
        {
          name: 'Залежь - 11',
        },
        {
          name: 'Залежь - 1',
        },
      ],
    },
    {
      name: 'Поднятие 55-100',
      isDraggable: false,
      nodeList: [
        {
          name: 'Залежь - 78',
        },
        {
          name: 'Залежь - 79',
        },
        {
          name: 'Залежь - 56',
        },
        {
          name: 'Залежь - 11',
        },
        {
          name: 'Залежь - 1',
        },
      ],
    },
    {
      name: 'Поднятие 23-32',
      isDraggable: false,
      nodeList: [
        {
          name: 'Залежь - 44',
        },
        {
          name: 'Залежь - 79',
        },
        {
          name: 'Залежь - 45',
        },
        {
          name: 'Залежь - 46',
          nodeList: [
            {
              name: 'Ловушка - 1',
              nodeList: [
                {
                  name: 'Данные по Ловушка - 1',
                },
              ],
            },
            {
              name: 'Ловушка - 2',
            },
            {
              name: 'Ловушка - 3',
            },
            {
              name: 'Ловушка - 4',
            },
            {
              name: 'Ловушка - 5',
            },
          ],
        },
        {
          name: 'Залежь - 1',
        },
      ],
    },
  ],
}];

storiesOf('ui/Tree', module)
  .addDecorator(withKnobs)
  .addParameters({metadata: {author: 'CSSSR', status: 'Approved'}})
  .add('по умолчанию', () =>
    <Tree
      nodeList={rootProps}
      handleRename={() => alert('Renamed')}
      handleCopy={() => alert('Copied')}
      handleDelete={() => alert('Deleted')}
      handlePaste={() => alert('Inserted')}
    />);

import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Tree } from './Tree';
import { NodeItem, RootProps } from './types';

const items: RootProps = [
  {
    name: 'Усть-Енисей',
    isDraggable: false,
    iconId: 'blue-line',
    id: 1,
    nodeList: [
      {
        name: 'Поднятие 44-23',
        iconId: 'orange-line',
        id: 2,
        isDraggable: false,
        nodeList: [
          {
            name: 'Залежь - 78',
            iconId: 'blue-line',
            id: 10,
            nodeList: [
              {
                name: 'Ловушка 100',
                iconId: 'red-line',
                id: 21,
                nodeList: [
                  {
                    name: 'Еще что нибудь',
                    id: 12,
                  },
                ],
              },
            ],
          },
          {
            name: 'Залежь - 79',
            iconId: 'blue-line',
            id: 30,
            nodeList: [
              {
                name: 'Ловушка 101',
                iconId: 'red-line',
                id: 17,
              },
            ],
          },
          {
            name: 'Залежь - 56',
            iconId: 'blue-line',
            id: 11,
          },
          {
            name: 'Залежь - 11',
            iconId: 'blue-line',
            id: 20,
          },
          {
            name: 'Залежь - 1',
            iconId: 'blue-line',
            id: 9,
          },
        ],
      },
      {
        name: 'Поднятие 55-100',
        iconId: 'orange-line',
        id: 3,
        isDraggable: false,
        nodeList: [
          {
            name: 'Залежь - 78',
            iconId: 'blue-line',
            id: 7,
          },
          {
            name: 'Залежь - 79',
            iconId: 'blue-line',
            id: 17,
          },
          {
            name: 'Залежь - 56',
            iconId: 'blue-line',
            id: 24,
          },
          {
            name: 'Залежь - 11',
            iconId: 'blue-line',
            id: 25,
          },
          {
            name: 'Залежь - 1',
            iconId: 'blue-line',
            id: 26,
          },
        ],
      },
      {
        name: 'Поднятие 23-32',
        iconId: 'orange-line',
        isDraggable: false,
        id: 4,
        nodeList: [
          {
            name: 'Залежь - 44',
            iconId: 'blue-line',
            id: 27,
          },
          {
            name: 'Залежь - 79',
            iconId: 'blue-line',
            id: 31,
          },
          {
            name: 'Залежь - 45',
            iconId: 'blue-line',
            id: 32,
          },
          {
            name: 'Залежь - 46',
            iconId: 'blue-line',
            id: 33,
            nodeList: [
              {
                name: 'Ловушка - 1',
                iconId: 'red-line',
                id: 41,
                nodeList: [
                  {
                    name: 'Данные по Ловушка - 1',
                    id: 34,
                  },
                ],
              },
              {
                name: 'Ловушка - 2',
                iconId: 'red-line',
                id: 43,
              },
              {
                name: 'Ловушка - 3',
                iconId: 'red-line',
                id: 44,
              },
              {
                name: 'Ловушка - 4',
                iconId: 'red-line',
                id: 45,
              },
              {
                name: 'Ловушка - 5',
                iconId: 'red-line',
                id: 46,
              },
            ],
          },
          {
            name: 'Залежь - 1',
            iconId: 'blue-line',
            id: 47,
          },
        ],
      },
    ],
  },
];

function renderComponent(props: NodeItem): RenderResult {
  return render(<Tree nodeList={props.nodeList} />);
}

describe('Tree', () => {
  test('рендерится без ошибок', () => {
    renderComponent({ nodeList: items });
  });
});

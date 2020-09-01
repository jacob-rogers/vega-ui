import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { Tree } from './Tree';
import { RootProps } from './types';

const items: RootProps = [{
  name: 'Усть-Енисей',
  nodeList: [
    {
      name: 'Поднятие 44-23',
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
  ],
}];

function renderComponent(props?: RootProps): RenderResult {
  return render(<Tree nodeList={items} />);
}

describe('Tree', () => {
  test('рендерится без ошибок', () => {
    renderComponent({ ...items });
  });
});

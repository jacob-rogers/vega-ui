import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react';
import { RootTreeProps } from './types';
import {Tree} from './Tree';

const items: RootTreeProps = {
  name: 'Усть-Енисей',
  nodeList: [
    {
      name: 'Поднятие 44-23',
      nodeList: [{
        name: "Залежь - 78",
        nodeList: [
          {
            name: "Ловушка 100",
            nodeList: [
              {
                name: "Еще что нибудь",
              },
            ]
          },
        ]
      }, {
        name: "Залежь - 79",
        nodeList: [
          {
            name: "Ловушка 101",
          },
        ]
      }, {
        name: "Залежь - 56",
      }, {
        name: "Залежь - 11",
      }, {
        name: "Залежь - 1",
      },
      ]
    },
    {
      name: 'Поднятие 55-100',
      nodeList: [{
        name: "Залежь - 78",
      }, {
        name: "Залежь - 79",
      }, {
        name: "Залежь - 56",
      }, {
        name: "Залежь - 11",
      }, {
        name: "Залежь - 1",
      },
      ]
    },
  ]
};

storiesOf('ui/Tree', module)
  .addDecorator(withKnobs)
  .addParameters({metadata: {author: 'CSSSR', status: 'Approved'}})
  .add('по умолчанию', () => <Tree {...items} />);

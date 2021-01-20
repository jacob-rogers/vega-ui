import React from 'react';
import { storiesOf } from '@storybook/react';

import { RadioList } from './RadioList';

const scenarioList = {
  name: 'Сценарии',
  array: [
    {
      id: 'id1',
      text: 'Сценарий 1',
    },
    {
      id: 'id2',
      text: 'Сценарий 2',
    },
    {
      id: 'id3',
      text: 'Сценарий 3',
    },
    {
      id: 'id4',
      text: 'Сценарий 4',
    },
  ],
};

storiesOf('ui/RadioList', module)
  .addParameters({
    metadata: {
      author: 'GPN',
      status: 'Draft',
      link: {
        href:
          'https://github.com/gpn-prototypes/vega-ui/blob/master/src/components/radio-list/README.md',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    const [activeItem, setActiveItem] = React.useState(scenarioList.array[0].id);

    return (
      <RadioList name={scenarioList.name} value={activeItem} onChange={setActiveItem}>
        {scenarioList.array.map((item) => (
          <RadioList.Item value={item.id} key={item.id}>
            {item.text}
          </RadioList.Item>
        ))}
      </RadioList>
    );
  });

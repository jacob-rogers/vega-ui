import React, { useState } from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Select } from './Select';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getCommonKnobs = () => ({
  placeholder: text('placeholder', 'Выберите номер'),
});

storiesOf('ui/Select', module)
  .addDecorator(withKnobs)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-select--playground',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    type Item = {
      label: string;
      id: number;
    };

    const items: Item[] = [
      {
        label: 'Первый',
        id: 1,
      },
      {
        label: 'Второй',
        id: 2,
      },
      {
        label: 'Третий',
        id: 3,
      },
    ];

    const [selected, setSelected] = useState<Item | null>();
    return (
      <>
        <div>
          <Select
            {...getCommonKnobs()}
            items={items}
            value={selected}
            onChange={({ value }) => setSelected(value)}
          />
        </div>
      </>
    );
  });

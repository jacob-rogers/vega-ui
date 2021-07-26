import React, { useState } from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Combobox } from './Combobox';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getCommonKnobs = () => ({
  placeholder: text('placeholder', 'Выберите город'),
});

storiesOf('ui/Combobox', module)
  .addDecorator(withKnobs)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-combobox--default-story',
        text: 'Документация',
      },
    },
  })
  .add('Single select', () => {
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
          <Combobox
            {...getCommonKnobs()}
            items={items}
            value={selected}
            onChange={({ value }) => setSelected(value)}
          />
        </div>
      </>
    );
  });

storiesOf('ui/Combobox ', module)
  .addDecorator(withKnobs)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-combobox--default-story',
        text: 'Документация',
      },
    },
  })
  .add('Multiple select', () => {
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

    const [selected, setSelected] = useState<Item[] | null>();

    return (
      <>
        <div>
          <Combobox
            {...getCommonKnobs()}
            items={items}
            value={selected}
            onChange={({ value }) => setSelected(value)}
            multiple
          />
        </div>
      </>
    );
  });

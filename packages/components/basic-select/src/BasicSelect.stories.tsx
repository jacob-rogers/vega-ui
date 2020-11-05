import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { BasicSelect } from './BasicSelect';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getCommonKnobs = () => ({
  placeholder: text('placeholder', 'Выберите город'),
});

storiesOf('ui/BasicSelect', module)
  .addDecorator(withKnobs)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href: 'https://consta-uikit.vercel.app/?path=/docs/components-basicselect--default-story',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    type Option = {
      label: string;
      value: string;
    };

    const items = [
      { label: 'Москва', value: 'moscow' },
      { label: 'Санкт-Петербург', value: 'spb' },
      { label: 'Томск', value: 'tomsk' },
      { label: 'Омск', value: 'omsk' },
      { label: 'Орск', value: 'orsk' },
      { label: 'Тверь', value: 'tver' },
      { label: 'Тула', value: 'tula' },
      { label: 'Тамбов', value: 'tambov' },
      { label: 'Краснодар', value: 'krasnodar' },
      { label: 'Белгород', value: 'belgorod' },
    ];

    const getItemLabel = (option: Option): string => option.label;

    return (
      <>
        <div>
          <BasicSelect
            {...getCommonKnobs()}
            id="city"
            options={items}
            getOptionLabel={getItemLabel}
          />
        </div>
      </>
    );
  });

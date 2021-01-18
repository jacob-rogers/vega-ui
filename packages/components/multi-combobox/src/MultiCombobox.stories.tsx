import React, { useState } from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { MultiCombobox } from './MultiCombobox';

type Option = {
  label: string;
  value: string;
};

const defaultKnobs = () => ({
  placeholder: text('placeholder', 'Выберите город'),
});

const items: Option[] = [
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

storiesOf('ui/MultiCombobox', module)
  .addDecorator(withKnobs)
  .addParameters({
    metadata: {
      author: 'Consta',
      status: 'Approved',
      link: {
        href:
          'https://consta-uikit.vercel.app/?path=/story/components-multicombobox--default-story',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    const [options, setOptions] = useState<Option[]>(items);
    const [value, setValue] = useState<Option[] | null | undefined>();

    const getItemLabel = (option: Option): string => option.label;

    const handleCreate = (label: string): void => {
      const newVal: Option = { label, value: label };
      setValue([...value, newVal]);
      setOptions([newVal, ...options]);
    };

    return (
      <MultiCombobox
        {...defaultKnobs()}
        id="city-multicombobox"
        options={options}
        value={value}
        getOptionLabel={getItemLabel}
        onChange={setValue}
        onCreate={handleCreate}
      />
    );
  });

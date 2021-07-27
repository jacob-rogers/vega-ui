import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { MultiCombobox, MultiComboboxProps } from './MultiCombobox';

type Option = {
  label: string;
  value: string;
};

const getOptionLabel = (option: Option): string => option.label;

const options: Option[] = [
  { label: 'Москва', value: 'moscow' },
  { label: 'Санкт-Петербург', value: 'spb' },
];

function renderComponent(props: MultiComboboxProps): RenderResult {
  return render(<MultiCombobox {...props} />);
}

describe('MultiCombobox', () => {
  test('рендерится без ошибок', () => {
    renderComponent({ options, getOptionLabel, id: 'multi' });
  });
});

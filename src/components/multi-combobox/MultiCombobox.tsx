import * as React from 'react';
import { MultiCombobox as BaseMultiCombobox } from '@consta/uikit/MultiCombobox';

export type MultiComboboxProps = React.ComponentProps<typeof BaseMultiCombobox>;

export const MultiCombobox: React.FC<MultiComboboxProps> = (props) => {
  return <BaseMultiCombobox {...props} />;
};

import * as React from 'react';
import { Combobox as BaseСombobox } from '@consta/uikit/Combobox';

export type СomboboxProps = React.ComponentProps<typeof BaseСombobox>;

export const Combobox: React.FC<СomboboxProps> = (props) => {
  return <BaseСombobox {...props} />;
};

import * as React from 'react';
import { Combobox as BaseСombobox } from '@consta/uikit/Combobox';

export type СomboboxType = typeof BaseСombobox;

export const Combobox: СomboboxType = (props) => {
  return <BaseСombobox {...props} />;
};

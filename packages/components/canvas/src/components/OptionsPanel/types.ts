import React from 'react';
import { IconProps } from '@gpn-prototypes/vega-icons';

import { ItemType } from '../../types';

export type ActiveOption = 'selection' | 'dragging';

export type Option = ActiveOption | 'remove' | 'grouping' | 'create' | 'ordering';

export type Changes = { type: Omit<Option, 'create'> } | { type: 'create'; itemType: ItemType };

export type OptionView<T = Option> = {
  type: T;
  icon: React.FC<IconProps>;
};

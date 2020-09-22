import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';

import { cnCanvas } from '../../../cn-canvas';
import { ItemType } from '../../../types';
import { Option as OptionType, OptionView } from '../types';

export type OptionProps = {
  option: OptionView<OptionType | ItemType>;
  onClick: (e: React.MouseEvent) => void;
  isActive?: boolean;
  disabled?: boolean;
  innerRef?: (ref: HTMLElement | null) => void;
};

export const Option: React.FC<OptionProps> = (props) => {
  const { option, onClick, isActive, innerRef, disabled } = props;

  return (
    <Button
      size="s"
      ref={innerRef}
      disabled={disabled}
      iconLeft={option.icon}
      iconSize="m"
      onClick={onClick}
      className={cnCanvas('Option', { active: isActive }).toString()}
      view="clear"
    />
  );
};

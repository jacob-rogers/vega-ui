import React from 'react';
import { Button } from '@consta/uikit/Button';

import { cnCanvas } from '../../../cn-canvas';
import { ItemType } from '../../../types';
import { Option as OptionType, OptionView } from '../types';

export type OptionProps = {
  option: OptionView<OptionType | Exclude<ItemType, 'event'>>;
  onClick: (e: React.MouseEvent) => void;
  isActive?: boolean;
  disabled?: boolean;
  innerRef?: (ref: HTMLElement | null) => void;
} & React.ComponentProps<typeof Button>;

export const Option: React.FC<OptionProps> = (props) => {
  const { option, onClick, isActive, innerRef, disabled, ...rest } = props;

  return (
    <Button
      size="s"
      form="brick"
      ref={innerRef}
      disabled={disabled}
      iconLeft={option.icon}
      aria-label={option.label}
      iconSize="m"
      onClick={onClick}
      className={cnCanvas('Option', { active: isActive }).toString()}
      view="clear"
      {...rest}
    />
  );
};

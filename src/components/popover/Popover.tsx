import React from 'react';
import { Popover as BasePopover } from '@consta/uikit/Popover';

export type PopoverProps = React.ComponentProps<typeof BasePopover>;

export const Popover: React.FC<PopoverProps> = (props) => {
  return <BasePopover {...props} />;
};

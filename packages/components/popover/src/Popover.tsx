import React from 'react';
import { Popover as BasePopover } from '@gpn-design/uikit/Popover';

export type PopoverProps = React.ComponentProps<typeof BasePopover>;

export const Popover: React.FC<PopoverProps> = (props) => {
  return <BasePopover {...props} />;
};

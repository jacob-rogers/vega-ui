import React from 'react';
import { Tooltip as BaseTooltip } from '@gpn-design/uikit/Tooltip';

export type TooltipProps = React.ComponentProps<typeof BaseTooltip>;

export const Tooltip: React.FC<TooltipProps> = (props) => {
  return <BaseTooltip {...props} />;
};

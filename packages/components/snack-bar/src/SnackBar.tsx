import React from 'react';
import { SnackBar as BaseSnackBar } from '@gpn-design/uikit/SnackBar';

export type SnackBarProps = React.ComponentProps<typeof BaseSnackBar>;

export const SnackBar = React.forwardRef<HTMLDivElement, SnackBarProps>((props, ref) => {
  return <BaseSnackBar ref={ref} {...props} />;
});

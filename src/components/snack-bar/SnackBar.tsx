import React from 'react';
import { SnackBar as BaseSnackBar } from '@consta/uikit/SnackBar';

export type SnackBarProps = React.ComponentProps<typeof BaseSnackBar>;

export const SnackBar: React.FC<SnackBarProps> = (props) => {
  return <BaseSnackBar {...props} />;
};

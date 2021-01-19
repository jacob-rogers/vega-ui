import React from 'react';
import { ProgressSpin as BaseProgressSpin } from '@consta/uikit/ProgressSpin';

export type ProgressSpinProps = React.ComponentProps<typeof BaseProgressSpin>;

export const ProgressSpin: React.FC<ProgressSpinProps> = (props) => {
  return <BaseProgressSpin {...props} />;
};

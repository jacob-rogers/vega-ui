import React from 'react';

import { cnLayout } from '../cn-layout';

type div = JSX.IntrinsicElements['div'];
export interface LayoutBodyProps extends div {
  className?: string;
  children?: React.ReactNode;
}

export const LayoutBody: React.FC<LayoutBodyProps> = ({ className, children, ...rest }) => {
  const cn = cnLayout('Body').mix(className);

  return (
    <div className={cn} {...rest}>
      {children}
    </div>
  );
};

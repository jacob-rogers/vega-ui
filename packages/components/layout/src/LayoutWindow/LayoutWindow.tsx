import React from 'react';

import { cnLayout } from '../cn-layout';

type div = JSX.IntrinsicElements['div'];
export interface LayoutWindowProps extends div {
  className?: string;
  children?: React.ReactNode;
}

export const LayoutWindow: React.FC<LayoutWindowProps> = ({ className, children, ...rest }) => {
  const cn = cnLayout('Window').mix(className);

  return (
    <div className={cn} {...rest}>
      {children}
    </div>
  );
};

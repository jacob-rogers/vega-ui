import React from 'react';

import { cnLayout } from '../cn-layout';

type DivProps = JSX.IntrinsicElements['div'];
export interface LayoutBodyProps extends DivProps {
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

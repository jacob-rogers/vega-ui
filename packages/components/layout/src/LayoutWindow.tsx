import React from 'react';

import { cnLayout } from './cn-layout';

export type SplitDirection = 'vertical' | 'horizontal';

type DivProps = JSX.IntrinsicElements['div'];
export interface LayoutWindowProps extends DivProps {
  className?: string;
  children?: React.ReactNode;
  split?: SplitDirection;
}

export const LayoutWindow: React.FC<LayoutWindowProps> = ({
  className,
  children,
  split,
  ...rest
}) => {
  const cn = cnLayout('Window', { split }).mix(className);

  return (
    <div className={cn} {...rest}>
      {children}
    </div>
  );
};

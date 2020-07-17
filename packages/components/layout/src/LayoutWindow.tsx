import React from 'react';

import { cnLayout } from './cn-layout';

export type SplitOrientation = 'vertical' | 'horizontal';

type DivProps = JSX.IntrinsicElements['div'];

export interface LayoutWindowProps extends DivProps {
  className?: string;
  children?: React.ReactNode;
  split?: SplitOrientation;
}

export const LayoutWindow = React.forwardRef<HTMLDivElement, LayoutWindowProps>((props, ref) => {
  const { className, split, children, ...rest } = props;
  const cn = cnLayout('Window', { split }).mix(className);

  return (
    <div className={cn} {...rest} ref={ref}>
      {children}
    </div>
  );
});

import React from 'react';

import { cnLayout } from '../cn-layout';

export type ResizeDirection = 'vertical' | 'horizontal';

type ButtonProps = JSX.IntrinsicElements['button'];

export interface LayoutResizerProps extends ButtonProps {
  direction?: ResizeDirection;
}

type DivProps = JSX.IntrinsicElements['div'];
export interface LayoutWindowProps extends DivProps {
  className?: string;
  children?: React.ReactNode;
  resizeDirection?: ResizeDirection;
}

export const BaseLayoutWindow: React.FC<LayoutWindowProps> = ({
  className,
  children,
  resizeDirection,
  ...rest
}) => {
  const cn = cnLayout('Window', { direction: resizeDirection }).mix(className);

  return (
    <div className={cn} {...rest}>
      {children}
    </div>
  );
};

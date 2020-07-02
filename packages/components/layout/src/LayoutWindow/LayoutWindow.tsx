import React from 'react';

import { cnLayout } from '../cn-layout';

export type ResizeDirection = 'vertical' | 'horizontal';

type ButtonProps = JSX.IntrinsicElements['button'];
export interface LayoutResizerProps extends ButtonProps {
  direction?: ResizeDirection;
}

const LayoutResizer: React.FC<LayoutResizerProps> = ({ direction }) => (
  <button
    type="button"
    aria-label="Потянуть"
    title="Потянуть"
    className={cnLayout('Resizer', { direction }).toString()}
  />
);

type DivProps = JSX.IntrinsicElements['div'];
export interface LayoutWindowProps extends DivProps {
  className?: string;
  children?: React.ReactNode;
  resizeDirection?: ResizeDirection;
}

export const LayoutWindow: React.FC<LayoutWindowProps> = ({
  className,
  children,
  resizeDirection,
  ...rest
}) => {
  const cn = cnLayout('Window', { direction: resizeDirection }).mix(className);

  return (
    <div className={cn} {...rest}>
      {children}
      <LayoutResizer direction={resizeDirection} />
    </div>
  );
};

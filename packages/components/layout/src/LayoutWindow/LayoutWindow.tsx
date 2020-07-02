import React from 'react';

import { cnLayout } from '../cn-layout';

export type ResizeDirection = 'vertical' | 'horizontal';

type button = JSX.IntrinsicElements['button'];
export interface LayoutResizerProps extends button {
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

type div = JSX.IntrinsicElements['div'];
export interface LayoutWindowProps extends div {
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
  const cn = cnLayout('Window').mix(className);

  return (
    <div className={cn} {...rest}>
      {children}
      <LayoutResizer direction={resizeDirection} />
    </div>
  );
};

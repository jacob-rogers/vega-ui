import React from 'react';

import { cnLayout } from '../cn-layout';

type div = JSX.IntrinsicElements['div'];
export interface LayoutWindowProps extends div {
  className?: string;
  children?: React.ReactNode;
  resize?: 'vertical' | 'horizontal';
}

export const LayoutWindow: React.FC<LayoutWindowProps> = ({
  className,
  children,
  resize,
  ...rest
}) => {
  const cn = cnLayout('Window').mix(className);

  return (
    <div className={cn} {...rest}>
      {children}
      <button
        type="button"
        aria-label="Потянуть"
        title="Потянуть"
        className={cnLayout('Resizer', { resize }).toString()}
      />
    </div>
  );
};

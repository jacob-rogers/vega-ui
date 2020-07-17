import React from 'react';

import { cnLayout } from './cn-layout';

type HeaderProps = JSX.IntrinsicElements['header'];
export interface LayoutHeaderProps extends HeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export const LayoutHeader = React.forwardRef<HTMLHeadingElement, LayoutHeaderProps>(
  ({ className, children, ...rest }, ref) => {
    const cn = cnLayout('Header').mix(className);

    return (
      <header ref={ref} className={cn} {...rest}>
        {children}
      </header>
    );
  },
);

import React from 'react';

import { cnLayout } from '../cn-layout';

type HeaderProps = JSX.IntrinsicElements['header'];
export interface LayoutHeaderProps extends HeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export const LayoutHeader: React.FC<LayoutHeaderProps> = ({ className, children, ...rest }) => {
  const cn = cnLayout('Header').mix(className);

  return (
    <header className={cn} {...rest}>
      {children}
    </header>
  );
};

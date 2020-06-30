import React from 'react';

import { cnLayout } from './cn-layout';
import { LayoutBody } from './LayoutBody';
import { LayoutHeader } from './LayoutHeader';
import { LayoutWindow } from './LayoutWindow';

import './Layout.css';

type div = JSX.IntrinsicElements['div'];
export interface LayoutProps extends div {
  children?: React.ReactNode;
  className?: string;
}

interface LayoutComponent<P> extends React.FC<P> {
  Header: typeof LayoutHeader;
  Window: typeof LayoutWindow;
  Body: typeof LayoutBody;
}

export const Layout: LayoutComponent<LayoutProps> = ({ children, className, ...rest }) => {
  return (
    <div className={cnLayout.mix(className)} {...rest}>
      {children}
    </div>
  );
};

Layout.Header = LayoutHeader;
Layout.Window = LayoutWindow;
Layout.Body = LayoutBody;

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
  rows?: [number, number];
  columns?: [number, number];
}

interface LayoutComponent<P> extends React.FC<P> {
  Header: typeof LayoutHeader;
  Window: typeof LayoutWindow;
  Body: typeof LayoutBody;
}

const getChildTypeName = (el: any): string => el.type.name;

export const Layout: LayoutComponent<LayoutProps> = (props) => {
  const { className, columns, rows, ...rest } = props;
  const style = {
    gridTemplateColumns: columns ? `${columns[0]}% ${columns[1]}%` : undefined,
    gridTemplateRows: rows ? `${rows[0]}% ${rows[1]}%` : undefined,
  };

  const children = React.Children.map(props.children, (child) => {
    const isLayoutWindow = React.isValidElement(child)
      ? getChildTypeName(child) === LayoutWindow.name
      : false;

    return React.isValidElement(child) && isLayoutWindow
      ? React.cloneElement(child, { resizeDirection: columns ? 'vertical' : 'horizontal' })
      : child;
  });

  return (
    <div className={cnLayout.mix(className)} style={style} {...rest}>
      {children}
    </div>
  );
};

Layout.Header = LayoutHeader;
Layout.Window = LayoutWindow;
Layout.Body = LayoutBody;

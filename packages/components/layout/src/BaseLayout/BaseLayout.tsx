import React from 'react';

import { cnLayout } from '../cn-layout';

import { BaseLayoutBody } from './BaseLayoutBody';
import { BaseLayoutHeader } from './BaseLayoutHeader';
import { BaseLayoutWindow } from './BaseLayoutWindow';

import '../Layout.css';

type DivProps = JSX.IntrinsicElements['div'];

export interface BaseLayoutProps extends DivProps {
  children?: React.ReactNode;
  className?: string;
  splitDirection?: 'vertical' | 'horizontal';
  sizes?: [number, number];
}

interface BaseLayoutComponent<P> extends React.FC<P> {
  Header: typeof BaseLayoutHeader;
  Window: typeof BaseLayoutWindow;
  Body: typeof BaseLayoutBody;
}

export const BaseLayout: BaseLayoutComponent<BaseLayoutProps> = (props) => {
  const { className, splitDirection = 'vertical', sizes = [50, 50], children, ...rest } = props;
  const gridsSizes = `${sizes[0]}% ${sizes[1]}%`;
  const style = {
    gridTemplateColumns: splitDirection === 'vertical' ? gridsSizes : undefined,
    gridTemplateRows: splitDirection === 'horizontal' ? gridsSizes : undefined,
  };

  return (
    <div className={cnLayout.mix(className)} style={style} {...rest}>
      {children}
    </div>
  );
};

BaseLayout.Header = BaseLayoutHeader;
BaseLayout.Window = BaseLayoutWindow;
BaseLayout.Body = BaseLayoutBody;

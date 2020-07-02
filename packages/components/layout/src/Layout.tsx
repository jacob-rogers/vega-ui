import React from 'react';
import { useMount } from '@gpn-prototypes/vega-hooks';
import { usePortals } from '@gpn-prototypes/vega-root';

import { cnLayout } from './cn-layout';
import { LayoutBody } from './LayoutBody';
import { LayoutHeader } from './LayoutHeader';
import { LayoutOptions } from './LayoutOptions';
import { LayoutWindow } from './LayoutWindow';

import './Layout.css';

type DivProps = JSX.IntrinsicElements['div'];
export interface LayoutProps extends DivProps {
  children?: React.ReactNode;
  className?: string;
  splitDirection?: 'vertical' | 'horizontal';
  sizes?: [number, number];
}

interface LayoutComponent<P> extends React.FC<P> {
  Header: typeof LayoutHeader;
  Window: typeof LayoutWindow;
  Options: typeof LayoutOptions;
  Body: typeof LayoutBody;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getChildTypeName = (el: any): string => el.type.name;
const PORTAL_LAYOUT_ID = 'portalLayout';

export const Layout: LayoutComponent<LayoutProps> = (props) => {
  const { className, splitDirection = 'vertical', sizes = [50, 50], ...rest } = props;
  const gridsSizes = `${sizes[0]}% ${sizes[1]}%`;
  const { portalsState, updatePortals } = usePortals();

  useMount(() => {
    const portalLayout = portalsState.portals.find((p) => p.id === PORTAL_LAYOUT_ID);
    if (portalLayout === undefined) {
      updatePortals({ type: 'add', params: { id: PORTAL_LAYOUT_ID } });
    }
  });

  const style = {
    gridTemplateColumns: splitDirection === 'vertical' ? gridsSizes : undefined,
    gridTemplateRows: splitDirection === 'horizontal' ? gridsSizes : undefined,
  };

  const children = React.Children.map(props.children, (child) => {
    const isLayoutWindow = React.isValidElement(child)
      ? getChildTypeName(child) === LayoutWindow.name
      : false;

    return React.isValidElement(child) && isLayoutWindow
      ? React.cloneElement(child, { resizeDirection: splitDirection })
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
Layout.Options = LayoutOptions;

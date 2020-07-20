import { ReactPortal, RefObject } from 'react';
import { PortalsMap } from '@gpn-prototypes/vega-hooks';

export type PortalRef = RefObject<PortalsMap>;

export type RenderPortalWithTheme = (children: React.ReactNode, container: Element) => ReactPortal;

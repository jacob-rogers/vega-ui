import { createContext } from 'react';
import { PortalsAPI } from '@gpn-prototypes/vega-hooks';

type PortalContextProps = PortalsAPI;

export const PortalsContext = createContext<PortalContextProps>({
  ref: { current: {} },
  append: () => {},
  remove: () => {},
  createContainer: () => {},
});

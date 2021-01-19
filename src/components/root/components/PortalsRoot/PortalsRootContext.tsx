import { createContext } from 'react';

import { PortalsAPI } from '../../../../hooks';

type PortalContextProps = PortalsAPI;

export const PortalsContext = createContext<PortalContextProps>({
  ref: { current: {} },
  append: () => {},
  remove: () => {},
  createContainer: () => {},
});

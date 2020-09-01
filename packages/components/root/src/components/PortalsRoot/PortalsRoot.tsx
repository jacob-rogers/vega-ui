import React from 'react';
import { PortalParams, usePortals } from '@gpn-prototypes/vega-hooks';

import { PortalsContext } from './PortalsRootContext';

type PortalsRootProps = {
  initialPortals: PortalParams[];
};

export const PortalsRoot: React.FC<PortalsRootProps> = (props) => {
  const { initialPortals, children } = props;

  const { ref, append, createContainer, remove } = usePortals(initialPortals);

  return (
    <PortalsContext.Provider value={{ ref, append, createContainer, remove }}>
      {children}
    </PortalsContext.Provider>
  );
};

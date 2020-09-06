import React from 'react';

type TreeApi = {
  withVisibilitySwitcher?: boolean;
  isShownLeftLines?: boolean;
  icons?: {
    [iconId: string]: React.ReactElement;
  };
};

const TreeContext = React.createContext<TreeApi>({});

export default TreeContext;

import React from 'react';

type TreeApi = {
  withVisibilitySwitcher?: boolean;
  treeContainerWidth?: number | string;
  isShownLeftLines?: boolean;
  icons?: {
    [iconId: string]: React.ReactElement;
  };
  functionIcons?: React.ReactElement[];
};

const TreeContext = React.createContext<TreeApi>({});

export default TreeContext;

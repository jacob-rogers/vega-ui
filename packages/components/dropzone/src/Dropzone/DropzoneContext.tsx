import React from 'react';

type DropzoneContextProps = {
  portalSelector?: string;
};

export const DropzoneContext = React.createContext<DropzoneContextProps>({
  portalSelector: 'body',
});

export const useDropzoneContext = (): DropzoneContextProps => React.useContext(DropzoneContext);

import React from 'react';

type DropzoneContextProps = {
  portal?: HTMLDivElement | null;
};

export const DropzoneContext = React.createContext<DropzoneContextProps>({
  portal: undefined,
});

export const useDropzoneContext = (): DropzoneContextProps => React.useContext(DropzoneContext);

import React from 'react';

import { FileDropzoneAPI } from '../types';

type FileDropzoneProviderProps = {
  api: FileDropzoneAPI;
};

export const FileDropzoneContext = React.createContext<FileDropzoneAPI>({} as FileDropzoneAPI);

export const FileDropzoneProvider: React.FC<FileDropzoneProviderProps> = ({ api, children }) => (
  <FileDropzoneContext.Provider value={api}>{children}</FileDropzoneContext.Provider>
);

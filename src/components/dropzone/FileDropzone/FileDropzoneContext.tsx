import React from 'react';

import { FileDropzoneAPI } from '../types';

export const FileDropzoneContext = React.createContext<FileDropzoneAPI | null>(null);

export const useFileDropzoneProvider = (): FileDropzoneAPI => {
  const fileDropzone = React.useContext(FileDropzoneContext);
  if (fileDropzone === null) {
    throw new Error('useFileDropzone called outside from ShellProvider');
  }
  return fileDropzone;
};

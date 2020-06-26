import React from 'react';

import { FileDropzoneAPI } from '../types';

export const FileDropzoneContext = React.createContext<FileDropzoneAPI>({} as FileDropzoneAPI);

export const useFileDropzoneProvider = (): FileDropzoneAPI => React.useContext(FileDropzoneContext);

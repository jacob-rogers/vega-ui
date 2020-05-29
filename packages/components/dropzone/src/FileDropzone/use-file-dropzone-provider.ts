import { useContext } from 'react';

import { FileDropzoneAPI } from '../types';

import { FileDropzoneContext } from './FileDropzoneProvider';

export const useFileDropzoneProvider = (): FileDropzoneAPI => useContext(FileDropzoneContext);

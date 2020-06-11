import { DropzoneDragEvent, ReactDragEventHandler } from './DragHandlers';

type ReactInputChangeEvent = React.ChangeEvent<HTMLInputElement>;
type LoadEvent = DropzoneDragEvent | ReactInputChangeEvent;

export type FileDropzoneAPI = {
  fullscreenVisible: boolean;
  handleDragEnter: ReactDragEventHandler;
  handleDragLeave: ReactDragEventHandler;
  handleDragOver: ReactDragEventHandler;
  handleLoad: (e: LoadEvent) => void;
};

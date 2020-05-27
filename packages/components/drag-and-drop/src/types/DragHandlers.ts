export type DragHandlers = {
  onDragStart?: (e: DragEvent) => void;
  onDragEnd?: (e: DragEvent) => void;
  onDragOver?: (e: DragEvent) => void;
  onDragEnter?: (e: DragEvent) => void;
  onDragLeave?: (e: DragEvent) => void;
  onDragExit?: (e: DragEvent) => void;
  onDrop?: (e: DragEvent) => void;
};

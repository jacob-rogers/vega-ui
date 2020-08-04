import React from 'react';

type StepProps = {
  onDragEnter(e: React.DragEvent): void;
  onDragLeave(e: React.DragEvent): void;
  onDrop(e: React.DragEvent): void;
};

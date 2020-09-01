import React from 'react';

import { useCanvas } from '../../context';
import { CanvasTree } from '../../entities';
import { KonvaMouseEvent, Position } from '../../types';
import { ConnectionLineView } from '../ConnectionLineView';

type ConnectionLineProps = {
  parent: { connector: Position; tree: CanvasTree };
  child: { connector: Position; tree: CanvasTree };
  onMouseDown?: (e: KonvaMouseEvent) => void;
};

export const ConnectionLine: React.FC<ConnectionLineProps> = (props) => {
  const {
    parent: { tree: parentTree, connector: parentConnector },
    child: { tree: childTree, connector: childConnector },
    onMouseDown,
  } = props;

  const { selectedData, handleSelectedDataChange } = useCanvas();

  const isSelectedLine =
    selectedData?.type === 'line' &&
    selectedData.parentId === parentTree.getId() &&
    selectedData.childId === childTree.getId();

  return (
    <ConnectionLineView
      fill={isSelectedLine ? '#0078D2' : '#fff'}
      parent={parentConnector}
      child={childConnector}
      onClick={(): void => {
        handleSelectedDataChange({
          type: 'line',
          parentId: parentTree.getId(),
          childId: childTree.getId(),
        });
      }}
      onMouseDown={(e): void => {
        if (isSelectedLine) {
          if (onMouseDown) {
            onMouseDown(e);
          }
          handleSelectedDataChange(null);
        }
      }}
    />
  );
};

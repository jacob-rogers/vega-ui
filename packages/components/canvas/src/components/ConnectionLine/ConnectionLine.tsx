import React, { useCallback, useMemo } from 'react';

import { DEFAULT_LINE_COLOR, SELECTED_COLOR } from '../../constants';
import { useCanvas } from '../../context';
import { CanvasTree, KonvaMouseEvent, Position } from '../../types';
import { ConnectionLineView } from '../ConnectionLineView';

type ConnectionLineProps = {
  parent: { connector: Position; tree: CanvasTree };
  child: { connector: Position; tree: CanvasTree };
  onMouseDown?: (e: KonvaMouseEvent) => void;
  onClick?: (e: KonvaMouseEvent) => void;
};

export const ConnectionLine: React.FC<ConnectionLineProps> = (props) => {
  const {
    parent: { tree: parentTree, connector: parentConnector },
    child: { tree: childTree, connector: childConnector },
    onMouseDown,
    onClick,
  } = props;

  const { selectedData, setSelectedData } = useCanvas();

  const isSelectedLine = useMemo(() => {
    return (
      selectedData?.type === 'line' &&
      selectedData.parentId === parentTree.getId() &&
      selectedData.childId === childTree.getId()
    );
  }, [childTree, parentTree, selectedData]);

  const handleClick = useCallback(
    (e) => {
      if (onClick) {
        onClick(e);
      }
      setSelectedData({
        type: 'line',
        parentId: parentTree.getId(),
        childId: childTree.getId(),
      });
    },
    [childTree, parentTree, setSelectedData, onClick],
  );

  const handleMouseDown = useCallback(
    (e) => {
      if (isSelectedLine) {
        if (onMouseDown) {
          onMouseDown(e);
        }
        setSelectedData(null);
      }
    },
    [isSelectedLine, onMouseDown, setSelectedData],
  );

  return (
    <ConnectionLineView
      fill={isSelectedLine ? SELECTED_COLOR : DEFAULT_LINE_COLOR}
      parent={parentConnector}
      child={childConnector}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    />
  );
};

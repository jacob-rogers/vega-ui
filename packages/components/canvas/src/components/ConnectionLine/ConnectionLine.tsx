import React, { useCallback, useMemo } from 'react';

import { useCanvas } from '../../context';
import { CanvasTree, KonvaMouseEvent, Position } from '../../types';
import { ConnectionLineView } from '../ConnectionLineView';

type ConnectionLineProps = {
  parent: { connector: Position; tree: CanvasTree };
  child: { connector: Position; tree: CanvasTree };
  onClick?: (e: KonvaMouseEvent) => void;
  onMouseDown?: (e: KonvaMouseEvent) => void;
};

export const ConnectionLine: React.FC<ConnectionLineProps> = (props) => {
  const {
    parent: { tree: parentTree, connector: parentConnector },
    child: { tree: childTree, connector: childConnector },
    onClick,
    onMouseDown,
  } = props;

  const { setCursor, selectedData, setSelectedData } = useCanvas();

  const isSelected = useMemo(() => {
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
      if (isSelected) {
        if (onMouseDown) {
          onMouseDown(e);
        }
        setSelectedData(null);
      }
    },
    [isSelected, onMouseDown, setSelectedData],
  );

  const handleMouseEnter = useCallback(() => {
    setCursor('pointer');
  }, [setCursor]);

  const handleMouseLeave = useCallback(() => {
    /*
      При быстром движении курсором события handleMouseEnter и handleMouseLeave
      срабатывают почти одновременно и setCursor('pointer') перебивает setCursor('default')
      setTimeout(() => {}, 0) помогает бороться с этой проблемой
    */

    setTimeout(() => {
      setCursor('default');
    }, 0);
  }, [setCursor]);

  return (
    <ConnectionLineView
      parent={parentConnector}
      child={childConnector}
      isSelected={isSelected}
      listening
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

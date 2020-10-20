import React from 'react';

import { TreeLeaf } from './TreeLeaf';
import { TreeNode } from './TreeNode';
import { TreeItem } from './types';

const renderTree = (t: TreeItem[]): React.ReactElement[] => {
  return t.reduce((acc: Array<React.ReactElement>, node: TreeItem) => {
    if (node.nodeList.length > 0) {
      const element = (
        <TreeNode
          id={node.id}
          name={node.name}
          nodeList={node.nodeList}
          key={node.id}
          iconId={node.iconId}
          isDraggable={node.isDraggable}
          isDropZone={node.isDropZone}
          isExpanded={node.isExpanded}
        >
          {node.nodeList && renderTree(node.nodeList)}
        </TreeNode>
      );

      acc.push(element);

      return acc;
    }

    acc.push(
      <TreeLeaf
        id={node.id}
        name={node.name}
        key={node.id}
        iconId={node.iconId}
        isDraggable={node.isDraggable}
        isDropZone={node.isDropZone}
        nodeList={[]}
      />,
    );

    return acc;
  }, []);
};

export default renderTree;

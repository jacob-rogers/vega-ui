import React, {useEffect, useState} from "react";
import {LeafType, NodeTreeType, RootTreeProps} from './types'
import { TreeNode } from "./TreeNode";
import cnTree from "./cn-tree";
import {Leaf} from "./Leaf";


export const RootTreeNode: React.FC<RootTreeProps> = (props) => {
  const rootTreeData = props;

  const [expanded, setExpanded] = useState<boolean>(false);
  const [currentDraggingElement, setCurrentDraggingElement] = useState<HTMLElement | null>(null);

  const handleDragStart = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();

    setCurrentDraggingElement(e.currentTarget);
  };

  const handleDragOver = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();

    e.preventDefault();
  };

  const handleDragDrop = (e: React.BaseSyntheticEvent) => {
    e.stopPropagation();

    e.currentTarget.appendChild(currentDraggingElement);
  }

  useEffect(() => {
    console.log(currentDraggingElement);
  }, [currentDraggingElement])

  const renderTree = (t: NodeTreeType[]) => {
    return t.reduce((acc: Array<React.ReactElement>, node: NodeTreeType | LeafType, index: number) => {
      if ('nodeList' in node) {
        const element = <TreeNode
          nodeList={node.nodeList}
          key={node.name}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDragDrop={handleDragDrop}
          name={node.name}>
            {node.nodeList && renderTree(node.nodeList)}
        </TreeNode>

        acc.push(element)

        return acc;
      }

      if (node?.name) {
        acc.push(<Leaf
          handleDragStart={handleDragStart}
          key={node.name}
          name={node.name}
        />);

        return acc;
      }

      return acc;
    }, [])
  }

  return (
    <div className={cnTree('RootTreeNode')}>
      <div
        className={cnTree('NavigationItem')}
        role="navigation"
      >
        <div
          className={cnTree('NavigationArrow', { expanded })}
          onClick={() => {setExpanded(!expanded)}}
          onKeyDown={() => {setExpanded(!expanded)}}
          role="navigation"
        />
        {rootTreeData.name}
      </div>
      <ul className={cnTree('NodeList', { expanded })}>{renderTree(rootTreeData.nodeList)}</ul>
    </div>)
}

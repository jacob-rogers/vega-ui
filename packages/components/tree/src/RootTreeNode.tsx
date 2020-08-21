import React from "react";
import {LeafType, NodeTreeType, RootTreeProps} from './types'
import cnTree from "./cn-tree";
import {Leaf} from "./Leaf";


const cnTreeNode = cnTree('RootTreeNode')

export const RootTreeNode: React.FC<RootTreeProps> = (props) => {
  const rootTreeData = props;

  const renderTree = (t: NodeTreeType[]) => {
    // @ts-ignore
    return t.reduce((acc: Array<React.ReactElement>, node:NodeTreeType | LeafType, index: number) => {
      if ('nodeList' in node) {
        const el = <li className={cnTreeNode} key={index}>
          <span className={cnTree('NavigationItem')}>{node.name}</span>
          <ul>
            {node.nodeList && renderTree(node.nodeList)}
          </ul>
        </li>

        acc.push(el)

        return acc;
      }

      if (node?.name) {
        acc.push(<Leaf key={index} name={node.name}/>);

        return acc;
      }
    }, [])
  }

  return (
    <div className={cnTreeNode}>
      <span className={cnTree('NavigationItem__expanded')}>{rootTreeData.name}</span>
      <ul>{renderTree(rootTreeData.nodeList)}</ul>
    </div>)
}

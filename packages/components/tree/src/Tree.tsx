import React from 'react';
import {TreeRootNode} from "./TreeRootNode";
import cnTree from "./cn-tree";
import './Tree.css';
import {NodeTreeType} from "./types";


export const Tree: React.FC<NodeTreeType> = (props) => {
  return <div className={cnTree()}>
    <TreeRootNode {...props}/>
  </div>;
};

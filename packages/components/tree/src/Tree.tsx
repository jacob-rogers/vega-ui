import React from 'react';
import {RootTreeNode} from "./RootTreeNode";
import cnTree from "./cn-tree";
import './Tree.css';
import {NodeTreeType} from "./types";


export const Tree: React.FC<NodeTreeType> = (props) => {
  return <div className={cnTree()}>
    <RootTreeNode {...props}/>
  </div>;
};

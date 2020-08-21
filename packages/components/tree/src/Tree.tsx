import React from 'react';
import {RootTreeNode} from "./RootTreeNode";
import cnTree from "./cn-tree";
import './Tree.css';
import {RootTreeProps} from "./types";


export const Tree: React.FC<RootTreeProps> = (props) => {
  return <div className={cnTree()}>
    <RootTreeNode {...props}/>
  </div>;
};

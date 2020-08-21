import React from "react";
import {LeafType} from "./types";
import cnTree from "./cn-tree";

const cnLeaf = cnTree('Leaf')

export const Leaf: React.FC<LeafType> = (props) => {
  return (<li
    className={cnLeaf}
    draggable="true"
    onDragStart={props.handleDragStart}
  >
    <span>{props.name}</span>
  </li>);
};

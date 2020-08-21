import React, {useState} from "react";
import cnTree from "./cn-tree";
import {NodeTreeType} from "./types";

export const TreeNode = (props: NodeTreeType) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <li
      className={cnTree('TreeNode')}
      draggable="true"
      onDragStart={props.handleDragStart}
      role="navigation"
    >
      <span
        onClick={() => {setExpanded(!expanded)}}
        role="navigation"
        className={cnTree('NavigationItem', { expanded })}>
        {props.name}
      </span>
      <ul
        role="navigation"
        className={cnTree('NodeList', { expanded })}
        onDragOver={props.handleDragOver}
        onDrop={props.handleDragDrop}
      >
        {props.children}
      </ul>
    </li>
  )
}

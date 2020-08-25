import React, { useState} from "react";
import cnTree from "./cn-tree";
import {NodeTreeType} from "./types";

export const TreeNode = (props: NodeTreeType) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [backLighted, setBackLighted] = useState<boolean>(false);

  return (
    <li
      className={cnTree('TreeNode')}
      draggable="true"
      onDragStart={props.handleDragStart}
      role="navigation"
    >
      <div
        role="navigation"
        onMouseOver={() => {
          setBackLighted(true)
        }}
        onMouseLeave={() => {
          if (backLighted) {
            setBackLighted(false)
          }
        }}
        className={cnTree('NavigationItem')}>
          <div
            className={cnTree('NavigationArrow', { expanded })}
            onClick={() => {setExpanded(!expanded)}}
            onKeyDown={() => {setExpanded(!expanded)}}
            role="navigation"
          />
          {backLighted && <div className={cnTree('Backlight')}/>}
          {props.name}
      </div>
      <ul
        className={cnTree('NodeList', { expanded })}
        onDragOver={props.handleDragOver}
        onDrop={props.handleDragDrop}
      >
        {props.children}
      </ul>
    </li>
  )
}

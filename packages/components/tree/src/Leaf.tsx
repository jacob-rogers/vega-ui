import React, {useState} from "react";
import {LeafType} from "./types";
import cnTree from "./cn-tree";

const cnLeaf = cnTree('Leaf')

export const Leaf: React.FC<LeafType> = (props) => {
  const [backLighted, setBackLighted] = useState<boolean>(false);

  return (<li
    className={cnLeaf}
    draggable="true"
    onDragStart={props.handleDragStart}
  >
    <span
      onMouseOver={() => {
        setBackLighted(true)
      }}
      onMouseLeave={() => {
        if (backLighted) {
          setBackLighted(false)
        }
      }}
    >
      {backLighted && <div className={cnTree('Backlight')}/>}
      {props.name}
    </span>
  </li>);
};

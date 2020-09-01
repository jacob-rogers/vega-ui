import React from 'react';
import cnTree from "./cn-tree";
import {NavigationEyeProps} from './types';


const NavigationEye: React.FC<NavigationEyeProps> = (props) => {
  return (
    <div
      className={cnTree('NavigationEye', {hidden: props.hidden})}
      onClick={props.handleHide}
      onKeyPress={props.handleHide}
      aria-label='Скрыть ветвь'
      role='button'
      tabIndex={0}
    />
  )
}

export default NavigationEye;

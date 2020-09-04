import React from 'react';

import cnTree from './cn-tree';
import { NavigationEyeProps } from './types';

const Eye: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 2C3.27273 2 0.943636 3.65867 0 6C0.943636 8.34133 3.27273 10 6 10C8.72727 10 11.0564 8.34133 12 6C11.0564 3.65867 8.72727 2 6 2ZM6 8.66667C4.49455 8.66667 3.27273 7.472 3.27273 6C3.27273 4.528 4.49455 3.33333 6 3.33333C7.50545 3.33333 8.72727 4.528 8.72727 6C8.72727 7.472 7.50545 8.66667 6 8.66667ZM6 4.4C5.09455 4.4 4.36364 5.11467 4.36364 6C4.36364 6.88533 5.09455 7.6 6 7.6C6.90545 7.6 7.63636 6.88533 7.63636 6C7.63636 5.11467 6.90545 4.4 6 4.4Z"
      fill="white"
      fillOpacity="0.3"
    />
  </svg>
);

const CloseEye: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 9.48528L1.70711 10.1924L10.1924 1.70711L9.48528 1L8.13179 2.35349C7.46462 2.12453 6.74726 2.00001 6 2.00001C3.27273 2.00001 0.943636 3.65867 0 6.00001C0.407006 7.00986 1.07175 7.89272 1.91502 8.57026L1 9.48528ZM3.47534 7.00994L6.97592 3.50936C6.67286 3.39565 6.34383 3.33334 6 3.33334C4.49455 3.33334 3.27273 4.52801 3.27273 6.00001C3.27273 6.35737 3.34474 6.69839 3.47534 7.00994ZM8.46189 4.85174L9.97234 3.34129C10.8691 4.02965 11.575 4.9456 12 6.00001C11.0564 8.34134 8.72727 10 6 10C5.19709 10 4.42869 9.85625 3.72 9.59363L4.88121 8.43242C5.22264 8.58291 5.60138 8.66667 6 8.66667C7.50545 8.66667 8.72727 7.47201 8.72727 6.00001C8.72727 5.58897 8.632 5.19956 8.46189 4.85174Z"
      fill="white"
      fillOpacity="0.3"
    />
  </svg>
);

const TreeNavigationEye: React.FC<NavigationEyeProps> = ({ onHide, hidden }) => {
  return (
    <button
      type="button"
      className={cnTree('NavigationEye', { hidden })}
      onClick={onHide}
      aria-label="Скрыть ветвь"
      tabIndex={0}
    >
      {hidden ? <CloseEye /> : <Eye />}
    </button>
  );
};

export default TreeNavigationEye;

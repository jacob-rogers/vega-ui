import React, { useEffect, useRef, useState } from 'react';
import { Text } from '@gpn-prototypes/vega-text';
import { Tooltip } from '@gpn-prototypes/vega-tooltip';

import cnTree from './cn-tree';
import { NavigationEyeProps } from './types';

const Eye: React.FC = () => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 0C3.27273 0 0.943636 1.65867 0 4C0.943636 6.34133 3.27273 8 6 8C8.72727 8 11.0564 6.34133 12 4C11.0564 1.65867 8.72727 0 6 0ZM6 6.66667C4.49455 6.66667 3.27273 5.472 3.27273 4C3.27273 2.528 4.49455 1.33333 6 1.33333C7.50545 1.33333 8.72727 2.528 8.72727 4C8.72727 5.472 7.50545 6.66667 6 6.66667ZM6 2.4C5.09455 2.4 4.36364 3.11467 4.36364 4C4.36364 4.88533 5.09455 5.6 6 5.6C6.90545 5.6 7.63636 4.88533 7.63636 4C7.63636 3.11467 6.90545 2.4 6 2.4Z"
      fill="white"
      fillOpacity="0.3"
    />
  </svg>
);

const CloseEye: React.FC = () => (
  <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 8.48528L1.70711 9.19239L10.1924 0.707106L9.48528 0L8.13179 1.35349C7.46462 1.12453 6.74726 1.00001 6 1.00001C3.27273 1.00001 0.943636 2.65867 0 5.00001C0.407006 6.00986 1.07175 6.89272 1.91502 7.57026L1 8.48528ZM3.47534 6.00994L6.97592 2.50936C6.67286 2.39565 6.34383 2.33334 6 2.33334C4.49455 2.33334 3.27273 3.52801 3.27273 5.00001C3.27273 5.35737 3.34474 5.69839 3.47534 6.00994ZM8.46189 3.85174L9.97234 2.34129C10.8691 3.02965 11.575 3.9456 12 5.00001C11.0564 7.34134 8.72727 9.00001 6 9.00001C5.19709 9.00001 4.42869 8.85625 3.72 8.59363L4.88121 7.43242C5.22264 7.58291 5.60138 7.66667 6 7.66667C7.50545 7.66667 8.72727 6.47201 8.72727 5.00001C8.72727 4.58897 8.632 4.19956 8.46189 3.85174Z"
      fill="white"
      fillOpacity="0.3"
    />
  </svg>
);

const TreeNavigationEye: React.FC<NavigationEyeProps> = ({ onHide, hidden }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setIsTooltipVisible(false), [buttonRef]);

  const handleMouseOver = () => {
    const boundingClientRect = buttonRef.current?.getBoundingClientRect();

    if (boundingClientRect) {
      const { x, y, width } = boundingClientRect;

      if (!x || !y || !width) {
        return;
      }

      setPosition({
        x: x + width / 2,
        y,
      });

      if (!isTooltipVisible) setIsTooltipVisible(true);
    }
  };

  const handleMouseLeave = () => setIsTooltipVisible(false);

  return (
    <button
      type="button"
      className={cnTree('NavigationEye', { hidden })}
      onClick={onHide}
      ref={buttonRef}
      aria-label="Скрыть ветвь"
      tabIndex={0}
      onFocus={() => {}}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      role="switch"
      aria-checked={hidden}
    >
      {isTooltipVisible && (
        <Tooltip
          isInteractive={false}
          position={position}
          size="s"
          direction="upCenter"
          possibleDirections={['upCenter']}
        >
          <Text size="xs">{hidden ? 'Показать' : 'Скрыть'}</Text>
        </Tooltip>
      )}

      {hidden ? <CloseEye /> : <Eye />}
    </button>
  );
};

export default TreeNavigationEye;

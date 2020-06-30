import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { IconAdd, IconDrag, IconExpand, IconRemove } from '@gpn-prototypes/vega-icons';
import { Text } from '@gpn-prototypes/vega-text';
import { TextField } from '@gpn-prototypes/vega-text-field';

import { cnScalePanel } from './cn-scale-panel';

import './ScalePanel.css';

export type OrientationProps = {
  orientation: 'horizontal' | 'vertical';
};

interface ScalePanelInnerProps extends OrientationProps {
  scale: number;
  step: number;
  className?: string;
  onZoomIn(): void;
  onZoomOut(): void;
  onExpand?: () => void;
  onWidthMove?: () => void;
  onInputValueChange(value: number): void;
}

export const ScalePanelInner: React.FC<ScalePanelInnerProps> = (props) => {
  const {
    className,
    scale,
    orientation,
    onZoomIn,
    onZoomOut,
    onExpand,
    onWidthMove,
    onInputValueChange,
  } = props;
  const buttonSize = 'xs';

  const handleChange = ({ value }: { value: string | null }): void => {
    if (Number(value)) {
      onInputValueChange(Number(value));
    }
  };

  const buttons = [
    {
      title: 'Во весь экран',
      label: 'Увеличить контент во весь экран',
      className: 'Expand',
      icon: IconExpand,
      onClick: onExpand,
    },
    {
      title: 'Во всю ширину',
      label: 'Увеличить контент во всю ширину',
      className: 'Drag',
      icon: IconDrag,
      onClick: onWidthMove,
    },
    {
      title: 'Уменьшить',
      label: 'Уменьшить масштаб',
      className: 'ZoomOut',
      icon: IconRemove,
      onClick: onZoomOut,
    },
    {
      title: 'Увеличить',
      label: 'Увеличить масштаб',
      className: 'ZoomIn',
      icon: IconAdd,
      onClick: onZoomIn,
    },
  ];

  return (
    <div className={cnScalePanel({ orientation }).mix(className).toString()}>
      {buttons.map((button) => (
        <Button
          type="button"
          title={button.title}
          aria-label={button.label}
          onlyIcon
          iconLeft={button.icon}
          className={cnScalePanel(button.className).toString()}
          size={buttonSize}
          view="clear"
          onClick={button.onClick}
        />
      ))}
      <div>
        {/* TODO в ТextField в gpn глубоко, глубоко зарыта пропса которая не используется(TextPropAlign) - возможно она нужна для позиционирования текста внутри компоненты */}
        <TextField
          title="Текущий масштаб"
          className={cnScalePanel('CurrentScale').toString()}
          size={buttonSize}
          max={3}
          view="clear"
          value={scale.toString()}
          onChange={handleChange}
        />
        <Text display="inline" size={buttonSize}>
          %
        </Text>
      </div>
    </div>
  );
};

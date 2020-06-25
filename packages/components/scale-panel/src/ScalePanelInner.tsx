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
  currentScale: number;
  stepScale: number;
  className?: string;
  onZoomIn(): void;
  onZoomOut(): void;
  onExpand(): void;
  onWidthMove(): void;
  inputChange(value: number): void;
}

export const ScalePanelInner: React.FC<ScalePanelInnerProps> = (props) => {
  const {
    className,
    currentScale,
    orientation,
    onZoomIn,
    onZoomOut,
    onExpand,
    onWidthMove,
    inputChange,
  } = props;
  const buttonSize = 'xs';

  const handleChange = ({ value }: { value: string | null }): void => {
    return Number(value) ? inputChange(Number(value)) : inputChange(Number(currentScale));
  };

  return (
    <div {...props} className={cnScalePanel({ orientation }).mix(className).toString()}>
      <Button
        type="button"
        title="Во весь экран"
        aria-label="Увеличить контент во весь экран"
        onlyIcon
        iconLeft={IconExpand}
        className={cnScalePanel('Expand').toString()}
        size={buttonSize}
        view="clear"
        onClick={onExpand}
      />
      <Button
        type="button"
        title="Во всю ширину"
        aria-label="Увеличить контент во всю ширину"
        /* TODO иконку заменить */
        onlyIcon
        iconLeft={IconDrag}
        className={cnScalePanel('Drag').toString()}
        size={buttonSize}
        view="clear"
        onClick={onWidthMove}
      />
      <Button
        type="button"
        title="Уменьшить"
        aria-label="Уменьшить масштаб"
        onlyIcon
        iconLeft={IconRemove}
        className={cnScalePanel('ZoomOut').toString()}
        size={buttonSize}
        view="clear"
        onClick={onZoomOut}
      />
      <Button
        type="button"
        title="Увеличить"
        aria-label="Увеличить масштаб"
        onlyIcon
        iconLeft={IconAdd}
        className={cnScalePanel('ZoomIn').toString()}
        size={buttonSize}
        view="clear"
        onClick={onZoomIn}
      />
      <div>
        {/* TODO в ТextField в gpn глубоко, глубоко зарыта пропса которая не используется(TextPropAlign) - возможно она нужна для позиционирования текста внутри компоненты */}
        <TextField
          title="Текущий масштаб"
          className={cnScalePanel('CurrentScale').mix('cssExtraClass1').toString()}
          size={buttonSize}
          max={3}
          view="clear"
          value={currentScale.toString()}
          onChange={handleChange}
        />
        <Text display="inline" size={buttonSize}>
          %
        </Text>
      </div>
    </div>
  );
};

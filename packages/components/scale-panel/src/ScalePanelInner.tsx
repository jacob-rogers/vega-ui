import React from 'react';
import { IconAdd, IconDrag, IconExpand, IconRemove } from '@gpn-prototypes/vega-icons';
import { Button, Text, TextField } from '@gpn-prototypes/vega-ui';

import { b, useScalePanel } from './context';

import './ScalePanel.css';

export type OrientationProps = {
  orientation: 'horizontal' | 'vertical';
};

interface ScalePanelInnerProps extends OrientationProps {
  currentScale: number;
  stepScale: number;
  className?: string;
}

interface ScalePanelViewProps extends ScalePanelInnerProps {
  onZoomIn(): void;
  onZoomOut(): void;
  inputChange(value: number): void;
}

export const ScalePanelView: React.FC<ScalePanelViewProps> = (props) => {
  const { className, currentScale, orientation, onZoomIn, onZoomOut, inputChange } = props;
  const buttonSize = 'xs';

  const handleChange = ({ value }: { value: string | null }): void => {
    return Number(value) ? inputChange(Number(value)) : inputChange(Number(currentScale));
  };

  return (
    <div
      className={b.mix(className).toString()}
      style={{ flexDirection: orientation === 'vertical' ? 'column' : 'row' }}
    >
      <Button
        title="Во весь экран"
        aria-label="Кнопка для увеличения контента во весь экран"
        onlyIcon
        iconLeft={IconExpand}
        className={b('Expand').toString()}
        size={buttonSize}
        view="clear"
        // onClick={}
      />
      <Button
        title="Во всю ширину"
        aria-label="Кнопка для увеличения контента во всю ширину"
        /* TODO иконку заменить */
        onlyIcon
        iconLeft={IconDrag}
        className={b('Drag').toString()}
        size={buttonSize}
        view="clear"
        // onClick={}
      />
      <Button
        title="Уменьшить"
        aria-label="Кнопка для уменьшения контента"
        onlyIcon
        iconLeft={IconRemove}
        className={b('ZoomOut').toString()}
        size={buttonSize}
        view="clear"
        onClick={onZoomOut}
      />
      <Button
        title="Увеличить"
        aria-label="Кнопка для увеличения контента"
        onlyIcon
        iconLeft={IconAdd}
        className={b('ZoomIn').toString()}
        size={buttonSize}
        view="clear"
        onClick={onZoomIn}
      />
      {/* TODO второй вариант CurrentScale */}
      {/* <Button */}
      {/* label={`${currentScale.toString()}%`} */}
      {/* title="Текущий масштаб" */}
      {/* className={b('CurrentScale').toString()} */}
      {/* size={buttonSize} */}
      {/* view="clear" */}
      {/* // onClick={} */}
      {/* /> */}
      <div>
        {/* TODO в ТextField в gpn глубоко, глубоко зарыта пропса которая не используется(TextPropAlign) - возможно она нужна для позиционирования текста внутри компоненты */}
        <TextField
          title="Текущий масштаб"
          className={b('CurrentScale').toString()}
          size={buttonSize}
          max={3}
          view="clear"
          value={currentScale.toString()}
          onChange={handleChange}
          style={{ maxWidth: '20px', justifyContent: 'center' }}
        />
        <Text display="inline" size={buttonSize}>
          %
        </Text>
      </div>
    </div>
  );
};

export const ScalePanelInner: React.FC<ScalePanelInnerProps> = (props) => {
  const { zoomIn, zoomOut, inputChange } = useScalePanel();
  return (
    <ScalePanelView {...props} onZoomIn={zoomIn} onZoomOut={zoomOut} inputChange={inputChange} />
  );
};

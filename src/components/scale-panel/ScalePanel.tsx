import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@consta/uikit/Button';
import { TextField } from '@consta/uikit/TextField';

import { useOnClickOutside } from '../../hooks';
import { IconAdd, IconMaxWidth, IconRemove } from '../icons';

import { cnScalePanel } from './cn-scale-panel';

import './ScalePanel.css';

type DivProps = JSX.IntrinsicElements['div'];

interface ScalePanelProps extends Omit<DivProps, 'onChange'> {
  /**
   * Размер шага масштабирования, используется при нажатии на кнопки "-" и "+"
   */
  step: number;
  /**
   * Текущее значение масштаба
   */
  scale: number;
  /**
   * Минимальное значение масштаба
   */
  minScale: number;
  /**
   * Максмальное значение масштаба
   */
  maxScale: number;
  /**
   * Имя класса для переопределения стилей
   */
  className?: string;
  /**
   * Обработчик изменения значения масштаба
   */
  onChange: (scale: number) => void;
  /**
   * Обработчик нажатия на кнопку "выровнить содержимое"
   */
  onAlign?: () => void;
}

const getClamp =
  (min: number, max: number) =>
  (number: number): number =>
    Math.min(max, Math.max(min, number));

// Деструктуризация для того чтобы дока уловила дефолтное значение пропа
export const ScalePanel: React.FC<ScalePanelProps> = ({ onAlign = () => {}, ...props }) => {
  const { step, scale, minScale, maxScale, className, onChange, ...rest } = props;

  const clamp = getClamp(minScale, maxScale);

  const [value, setValue] = useState<string>(scale.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(scale.toString());
  }, [scale]);

  const handleZoomOut = (): void => {
    const newScale = scale - step;

    onChange(clamp(newScale));
  };

  const handleZoomIn = (): void => {
    const newScale = scale + step;

    onChange(clamp(newScale));
  };

  const handleChange = ({ value: inputValue }: { value: string | null }) => {
    /* istanbul ignore if */
    if (inputValue === null) {
      setValue('');
    } else {
      const clearValue = inputValue.replace(/\D/g, '');

      setValue(clearValue);
    }
  };

  const handleSubmit = () => {
    if (value === scale.toString()) {
      return;
    }

    const number = parseInt(value, 10);

    if (Number.isNaN(number)) {
      setValue(scale.toString());
      return;
    }

    const clampedNumber = clamp(number);

    onChange(clampedNumber);
    handleChange({ value: clampedNumber.toString() });
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    /* istanbul ignore else */
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  useOnClickOutside({ ref: inputRef, handler: handleSubmit });

  const buttons = [
    {
      title: 'Выровнить содержимое',
      icon: IconMaxWidth,
      onClick: onAlign,
    },
    {
      title: 'Уменьшить масштаб',
      icon: IconRemove,
      onClick: handleZoomOut,
    },
    {
      title: 'Увеличить масштаб',
      icon: IconAdd,
      onClick: handleZoomIn,
    },
  ];

  return (
    <div className={cnScalePanel.mix(className)} {...rest}>
      {buttons.map((button) => (
        <Button
          key={button.title}
          title={button.title}
          type="button"
          view="clear"
          size="s"
          onlyIcon
          iconLeft={button.icon}
          iconSize="s"
          onClick={button.onClick}
        />
      ))}
      <div className={cnScalePanel('InputWrapper')}>
        <TextField
          inputRef={inputRef}
          title="Масштаб"
          className={cnScalePanel('Input').toString()}
          type="text"
          view="clear"
          size="s"
          width="full"
          maxLength={3}
          value={value}
          rightSide="%"
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
      </div>
    </div>
  );
};

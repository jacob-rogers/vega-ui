import React, { ChangeEvent } from 'react';
import { IconCheck } from '@gpn-design/uikit/IconCheck';
import { Text } from '@gpn-design/uikit/Text';

import { cnRadioList } from './cn-radio-list';
import { useRadioList } from './context';

import './RadioList.css';

export type RadioListItemProps = {
  className?: string;
  value: string;
};

export const RadioListItem: React.FC<RadioListItemProps> = (props) => {
  const { className, value, ...rest } = props;

  const { currentValue, change, name } = useRadioList();

  const onItemClick = (event: ChangeEvent<HTMLInputElement>): void => {
    if (change) {
      change(event.target.value);
    }
  };

  const active: boolean = value === currentValue;

  return (
    <div role="radio" aria-checked={active}>
      <label {...rest} htmlFor={value} className={cnRadioList('Item').mix(className).toString()}>
        <Text
          as="span"
          role="textbox"
          size="xs"
          className={cnRadioList('Text', { active }).mix(className).toString()}
        >
          {props.children}
        </Text>
        {active && (
          <IconCheck
            size="xs"
            view="primary"
            className={cnRadioList('CheckIcon').mix(className).toString()}
          />
        )}
      </label>
      <input
        title="radioInput"
        type="radio"
        name={name}
        id={value}
        className={cnRadioList('Input').mix('visuallyhidden').mix(className).toString()}
        value={value}
        checked={active}
        onChange={onItemClick}
      />
    </div>
  );
};

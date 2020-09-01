import React from 'react';

import { cnRadioList } from './cn-radio-list';
import { RadioListAPI, RadioListContext } from './context';
import { RadioListItem } from './RadioListItem';

import './RadioList.css';

export type RadioListProps = {
  className?: string;
  name: string;
  children?: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
};

type RadioList<T> = React.FC<T> & {
  Item: typeof RadioListItem;
};

export const RadioList: RadioList<RadioListProps> = (props) => {
  const { children, onChange, name, value, className, ...rest } = props;

  function change(val: string): void {
    if (onChange) onChange(val);
  }

  const valueItem: RadioListAPI = {
    name,
    currentValue: value ?? '',
    change,
  };

  return (
    <RadioListContext.Provider value={valueItem}>
      <div {...rest} role="radiogroup" className={cnRadioList('RadioList').mix(className)}>
        {children}
      </div>
    </RadioListContext.Provider>
  );
};

RadioList.Item = RadioListItem;

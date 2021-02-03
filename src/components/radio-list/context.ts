import React, { useContext } from 'react';

export interface RadioListAPI {
  currentValue: string;
  name: string;
  change: (value: string) => void;
}

/* istanbul ignore next */
const noop = (): void => {};

export const RadioListContext = React.createContext<RadioListAPI>({
  currentValue: '',
  change: noop,
  name: '',
});

export function useRadioList(): RadioListAPI {
  return useContext(RadioListContext);
}

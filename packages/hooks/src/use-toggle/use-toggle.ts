import React from 'react';

type API = {
  state: boolean;
  toggle(newValue?: boolean): void;
};

export const useToggle = (initialValue = false): API => {
  const [state, setState] = React.useState(initialValue);

  const toggle = (newValue?: boolean): void => {
    setState(newValue === undefined ? !state : newValue);
  };

  return { state, toggle };
};

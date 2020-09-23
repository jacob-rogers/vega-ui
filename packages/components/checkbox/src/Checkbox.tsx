import * as React from 'react';
import { Checkbox as BaseCheckbox } from '@consta/uikit/Checkbox';

type CheckboxProps = React.ComponentProps<typeof BaseCheckbox>;

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <BaseCheckbox {...props} />;
};

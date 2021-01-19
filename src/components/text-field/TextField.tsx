import * as React from 'react';
import { TextField as BaseTextField } from '@consta/uikit/TextField';

export type TextFieldProps = React.ComponentProps<typeof BaseTextField>;

export const TextField: React.FC<TextFieldProps> = (props) => {
  return <BaseTextField {...props} />;
};

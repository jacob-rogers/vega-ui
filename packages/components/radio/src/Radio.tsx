import * as React from 'react';
import { Radio as BaseRadio } from '@consta/uikit/Radio';

type RadioProps = React.ComponentProps<typeof BaseRadio>;

export const Radio: React.FC<RadioProps> = (props) => {
  return <BaseRadio {...props} />;
};

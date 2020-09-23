import * as React from 'react';
import { Switch as BaseSwitch } from '@consta/uikit/Switch';

type SwitchProps = React.ComponentProps<typeof BaseSwitch>;

export const Switch: React.FC<SwitchProps> = (props) => {
  return <BaseSwitch {...props} />;
};

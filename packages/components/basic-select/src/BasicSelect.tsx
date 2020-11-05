import * as React from 'react';
import { BasicSelect as BaseBasicSelect } from '@consta/uikit/BasicSelect';

export type BasicSelectProps = React.ComponentProps<typeof BaseBasicSelect>;

export const BasicSelect: React.FC<BasicSelectProps> = (props) => {
  return <BaseBasicSelect {...props} />;
};

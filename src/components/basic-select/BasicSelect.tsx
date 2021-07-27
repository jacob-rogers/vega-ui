import * as React from 'react';
import { BasicSelect as BaseBasicSelect } from '@consta/uikit/BasicSelect';

export type BasicSelectProps = React.ComponentProps<typeof BaseBasicSelect>;
export type BasicSelectType = typeof BaseBasicSelect;

export const BasicSelect: BasicSelectType = (props) => {
  return <BaseBasicSelect {...props} />;
};

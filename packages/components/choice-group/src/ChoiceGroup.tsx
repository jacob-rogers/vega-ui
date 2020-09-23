import * as React from 'react';
import { ChoiceGroup as BaseChoiceGroup } from '@consta/uikit/ChoiceGroup';

type BaseChoiceGroupComponent = typeof BaseChoiceGroup;

export const ChoiceGroup: BaseChoiceGroupComponent = ({ size = 'm', ...restProps }) => {
  return <BaseChoiceGroup size={size} {...restProps} />;
};

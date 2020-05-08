import React from 'react';

import { cnHeader } from './helpers/cn-header';
import { HeaderMenu } from './HeaderMenu';
import { HeaderView } from './HeaderView';

export const Header = (): React.ReactElement => {
  return <HeaderView className={cnHeader().toString()} leftSide={HeaderMenu} />;
};

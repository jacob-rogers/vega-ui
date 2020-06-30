import React from 'react';

import { cnHeader } from '../cn-header';

export const HeaderMenuDelimiter = (): React.ReactElement => (
  <li className={cnHeader('MenuDelimiter').toString()} />
);

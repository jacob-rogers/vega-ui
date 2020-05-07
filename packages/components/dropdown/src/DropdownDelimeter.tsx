import React from 'react';

import { cnDropdown } from './helpers/cnDropdown';

export const DropdownDelimeter: React.ElementType = () => (
  <div className={cnDropdown('DelimeterRoot')}>
    <div className={cnDropdown('Delimeter')} />
  </div>
);

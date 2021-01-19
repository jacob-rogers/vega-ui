import React from 'react';

import { cnLogo } from './cn-logo';
import { VegaLogo } from './VegaLogo';

import './Logo.css';

export type LogoProps = {
  className?: string;
  size?: 'm';
};

export const Logo: React.FC<LogoProps> = ({ className, size = 'm', ...rest }) => {
  const cn = cnLogo({ size }).mix(className);

  return (
    <div className={cn} {...rest}>
      <VegaLogo />
    </div>
  );
};

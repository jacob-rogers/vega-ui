import React from 'react';

import { cnForm } from '../cn-form';

type LegendProps = JSX.IntrinsicElements['legend'];
export interface FormLegendProps extends LegendProps {
  space?: '2xs' | 'xs' | 's' | 'none';
  size?: 's' | 'l';
  className?: string;
}

export const FormLegend: React.FC<FormLegendProps> = ({
  space = 's',
  size = 's',
  className,
  children,
  ...props
}) => {
  const cn = cnForm('Legend', { space, size }).mix(className);

  return (
    <legend className={cn} {...props}>
      {children}
    </legend>
  );
};

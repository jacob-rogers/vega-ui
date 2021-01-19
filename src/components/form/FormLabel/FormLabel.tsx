import React from 'react';

import { cnForm } from '../cn-form';

type LabelProps = JSX.IntrinsicElements['label'];
export interface FormLabelProps extends LabelProps {
  space?: '2xs' | 'xs' | 's' | 'none';
  size?: 's' | 'l';
  htmlFor?: string;
  className?: string;
}

export const FormLabel: React.FC<FormLabelProps> = ({
  space = 's',
  size = 's',
  htmlFor,
  className,
  children,
  ...props
}) => {
  const cn = cnForm('Label', { space, size }).mix(className);

  return (
    <label htmlFor={htmlFor} className={cn} {...props}>
      {children}
    </label>
  );
};

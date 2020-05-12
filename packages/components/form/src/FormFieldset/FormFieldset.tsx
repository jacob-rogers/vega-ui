import React from 'react';

import { cnForm } from '../cn-form';

type FormFieldsetProps = {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
} & JSX.IntrinsicElements['fieldset'];

export const FormFieldset: React.FC<FormFieldsetProps> = ({
  className,
  children,
  disabled,
  ...props
}) => {
  const cn = cnForm('Fieldset').mix(className);

  return (
    <fieldset className={cn} disabled={disabled} {...props}>
      {children}
    </fieldset>
  );
};

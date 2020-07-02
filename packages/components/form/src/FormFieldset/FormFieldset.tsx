import React from 'react';

import { cnForm } from '../cn-form';

type FieldsetProps = JSX.IntrinsicElements['fieldset'];
export interface FormFieldsetProps extends FieldsetProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

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

import React from 'react';

import { cnForm } from '../cn-form';

type FieldsetProps = JSX.IntrinsicElements['fieldset'];
export interface FormFieldsetProps extends FieldsetProps {
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const FormFieldset: React.FC<FormFieldsetProps> = ({
  disabled,
  className,
  children,
  ...props
}) => {
  const cn = cnForm('Fieldset').mix(className);

  return (
    <fieldset className={cn} disabled={disabled} {...props}>
      {children}
    </fieldset>
  );
};

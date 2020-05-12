import React from 'react';

import { cnForm } from './cn-form';
import { FormField } from './FormField';
import { FormFieldset } from './FormFieldset';
import { FormLabel } from './FormLabel';
import { FormRow } from './FormRow';

import './Form.css';

type FormProps = {
  className?: string;
  children?: React.ReactNode;
} & JSX.IntrinsicElements['form'];

type Form<T> = React.FC<T> & {
  Row: typeof FormRow;
  Label: typeof FormLabel;
  Fieldset: typeof FormFieldset;
  Field: typeof FormField;
};

export const Form: Form<FormProps> = ({ children, className, ...props }) => {
  const cn = cnForm.mix(className);

  return (
    <form className={cn} {...props}>
      {children}
    </form>
  );
};

Form.Row = FormRow;
Form.Label = FormLabel;
Form.Fieldset = FormFieldset;
Form.Field = FormField;

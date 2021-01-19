import React from 'react';

import { cnForm } from './cn-form';
import { FormField } from './FormField';
import { FormFieldset } from './FormFieldset';
import { FormLabel } from './FormLabel';
import { FormLegend } from './FormLegend';
import { FormRow } from './FormRow';

import './Form.css';

type FormElementProps = JSX.IntrinsicElements['form'];
export interface FormProps extends FormElementProps {
  onSubmit?: (e: React.FormEvent) => void;
  className?: string;
}

type FormType = React.FC<FormProps> & {
  Row: typeof FormRow;
  Label: typeof FormLabel;
  Fieldset: typeof FormFieldset;
  Field: typeof FormField;
  Legend: typeof FormLegend;
};

export const Form: FormType = ({ onSubmit, className, children, ...props }) => {
  const cn = cnForm.mix(className);

  return (
    <form className={cn} onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
};

Form.Row = FormRow;
Form.Label = FormLabel;
Form.Fieldset = FormFieldset;
Form.Field = FormField;
Form.Legend = FormLegend;

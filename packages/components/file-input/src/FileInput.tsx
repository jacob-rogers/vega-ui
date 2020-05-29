import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { block } from 'bem-cn';

import './FileInput.css';

type ButtonProps = Exclude<React.ComponentProps<typeof Button>, 'label'>;

export interface FileInputProps extends ButtonProps {
  id: string;
  className?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const cnFileInput = block('VegaFileInput');

export const FileInput: React.FC<FileInputProps> = (props) => {
  const { className, id, onChange, ...buttonProps } = props;

  return (
    <label htmlFor={id} className={cnFileInput.mix(className)}>
      <input
        className={cnFileInput('Input')}
        type="file"
        id={id}
        onChange={onChange}
        aria-label="File input"
      />
      <Button role="button" as="div" {...buttonProps} />
    </label>
  );
};

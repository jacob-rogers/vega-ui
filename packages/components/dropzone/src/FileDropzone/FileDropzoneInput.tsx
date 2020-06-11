import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { FileInput } from '@gpn-prototypes/vega-file-input';
import { IconAttach } from '@gpn-prototypes/vega-icons';

import { useFileDropzoneProvider } from './use-file-dropzone-provider';

type FileDropzoneInputProps = React.ComponentProps<typeof FileInput> & { label: string };

export const FileDropzoneInput: React.FC<FileDropzoneInputProps> = ({
  className,
  label = 'Добавьте файл',
  id,
}) => {
  const { handleLoad } = useFileDropzoneProvider();
  return (
    <FileInput id={id} onChange={handleLoad} className={className}>
      {(buttonProps): React.ReactNode => (
        <Button
          size="s"
          iconSize="xs"
          label={label}
          iconLeft={IconAttach}
          view="ghost"
          {...buttonProps}
        />
      )}
    </FileInput>
  );
};

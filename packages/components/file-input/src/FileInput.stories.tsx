import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';
import { IconAttach } from '@gpn-prototypes/vega-icons';
import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { FileInput, FileInputProps } from './FileInput';

const defaultKnobs = (): FileInputProps => ({
  id: text('id', 'id'),
});

storiesOf('ui/FileInput', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('FileInput', () => {
    const buttonProps = {
      iconLeft: IconAttach,
      label: text('title', 'Title'),
    };
    return (
      <FileInput {...defaultKnobs()} accept="image/png" onChange={action('Файлы загружены')}>
        {(props): React.ReactNode => <Button {...props} {...buttonProps} />}
      </FileInput>
    );
  });

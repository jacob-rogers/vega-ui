import React from 'react';
import { IconAttach } from '@gpn-prototypes/vega-icons';
import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { FileInput, FileInputProps } from './FileInput';

const defaultKnobs = (): FileInputProps => ({
  label: text('title', 'Title'),
  id: text('id', 'id'),
});

storiesOf('ui/FileInput', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('FileInput', () => (
    <FileInput {...defaultKnobs()} iconLeft={IconAttach} onChange={action('Файлы загружены')}>
      Инпут для загрузки
    </FileInput>
  ));

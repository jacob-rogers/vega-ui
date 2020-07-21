import React from 'react';
import styled from '@emotion/styled';
import { FileIconAvi, FileIconBmp, FileIconDoc, FileIconGif } from '@gpn-prototypes/vega-icons';
import { usePortal } from '@gpn-prototypes/vega-root';
import { Text } from '@gpn-prototypes/vega-text';
import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { FileDropzone } from './FileDropzone';

const MarginContainer = styled.div`
  margin-top: 25px;
`;

const Container = styled.div`
  width: 250px;
`;

const FlexGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;

const KNOB_GROUPS = {
  Input: 'FileDropzoneInput',
};

const inputKnobs = (): React.ComponentProps<typeof FileDropzone.Input> => ({
  id: 'dropzone-id',
  multiple: boolean('multiple', true, KNOB_GROUPS.Input),
  label: text('label', 'Я инпут', KNOB_GROUPS.Input),
});

storiesOf('ui/FileDropzone', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('По умолчанию', () => {
    const initialText = 'Перетащите, чтобы загрузить';

    const [dropzoneText, setText] = React.useState(initialText);

    const handleDrop = (files: FileList | null): void => {
      setText('Файлы выбраны');
      action('onDrop')(files);
    };

    return (
      <Container>
        <FileDropzone
          onDragEnter={(): void => setText('Отпустите, чтобы загрузить')}
          onDragLeave={(): void => setText(initialText)}
          onDrop={handleDrop}
        >
          <Text>{dropzoneText}</Text>
          <MarginContainer>
            <FileDropzone.Input {...inputKnobs()} />
          </MarginContainer>
        </FileDropzone>
      </Container>
    );
  })
  .add('Демонстрация работы с fullscreen', () => {
    const [dropzoneText, setText] = React.useState('Перетащите, чтобы загрузить');
    const { portal } = usePortal();

    return (
      <Container>
        <FileDropzone fullscreen onDrop={(): void => setText('Файлы выбраны')}>
          <Text>{dropzoneText}</Text>
          <MarginContainer>
            <FileDropzone.Input {...inputKnobs()} />
          </MarginContainer>
          <FileDropzone.Fullscreen portal={portal}>
            <MarginContainer>
              <FlexGroup>
                <FileIconBmp size="m" />
                <FileIconAvi size="m" />
                <FileIconDoc size="m" />
                <FileIconGif size="m" />
              </FlexGroup>
              <Text>Отпустите, чтобы загрузить</Text>
            </MarginContainer>
          </FileDropzone.Fullscreen>
        </FileDropzone>
      </Container>
    );
  });

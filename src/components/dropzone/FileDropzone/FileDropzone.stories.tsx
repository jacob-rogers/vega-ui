import React from 'react';
import { Text } from '@consta/uikit/Text';
import styled from '@emotion/styled';
import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { FileIconAvi, FileIconBmp, FileIconDoc, FileIconGif } from '../../icons';
import { usePortal } from '../../root';

import { FileDropzone } from './FileDropzone';

const InputContainer = styled.div`
  margin-top: 25px;
  display: flex;
`;

const Container = styled.div`
  width: 250px;
`;

const DocsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
`;

const FlexGroup = styled.div`
  display: flex;
  justify-content: space-around;
  width: 20%;
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
  .addParameters({
    metadata: {
      author: 'CSSSR',
      status: 'Approved',
      link: {
        href: 'https://github.com/gpn-prototypes/vega-ui/blob/master/src/components/dropzone/README.md',
        text: 'Документация',
      },
    },
  })
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
          <InputContainer>
            <FileDropzone.Input {...inputKnobs()} />
          </InputContainer>
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
          <InputContainer>
            <FileDropzone.Input {...inputKnobs()} />
          </InputContainer>
          <FileDropzone.Fullscreen portal={portal}>
            <DocsContainer>
              <FlexGroup>
                <FileIconBmp size="m" />
                <FileIconAvi size="m" />
                <FileIconDoc size="m" />
                <FileIconGif size="m" />
              </FlexGroup>
              <Text>Отпустите, чтобы загрузить</Text>
            </DocsContainer>
          </FileDropzone.Fullscreen>
        </FileDropzone>
      </Container>
    );
  });

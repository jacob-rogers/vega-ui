import React from 'react';
import styled from '@emotion/styled';
import { Text } from '@gpn-design/uikit/Text';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { FileDropzone } from './FileDropzone';
import { useFileDropzone } from './use-file-dropzone';

const ButtonContainer = styled.div({
  marginTop: '25px',
});

const Container = styled.div({
  width: '300px',
});

storiesOf('ui/FileDropzone', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('Демонстрация работы', () => {
    const [text, setText] = React.useState('Перетащите, чтобы загрузить');

    const dropzoneApi = useFileDropzone(
      { onLoad: () => setText('Файлы загружены') },
      { withFullscreen: true },
    );

    return (
      <FileDropzone.Provider api={dropzoneApi}>
        <Container>
          <FileDropzone>
            <Text>{text}</Text>
            <ButtonContainer>
              <FileDropzone.Input id="file-dropzone-id">Test</FileDropzone.Input>
            </ButtonContainer>
          </FileDropzone>
        </Container>
        <FileDropzone.Fullscreen>
          <Text>Отпустите, чтобы загрузить</Text>
        </FileDropzone.Fullscreen>
      </FileDropzone.Provider>
    );
  });

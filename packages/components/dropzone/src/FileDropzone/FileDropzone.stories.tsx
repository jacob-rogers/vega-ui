import React from 'react';
import styled from '@emotion/styled';
import { Text } from '@gpn-design/uikit/Text';
import { FileIconAvi, FileIconBmp, FileIconDoc, FileIconGif } from '@gpn-prototypes/vega-icons';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { FileDropzone } from './FileDropzone';
import { useFileDropzone } from './use-file-dropzone';

const MarginContainer = styled.div({
  marginTop: '25px',
});

const Container = styled.div({
  width: '300px',
});

const FlexGroup = styled.div({
  display: 'flex',
  justifyContent: 'space-around',
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
            <MarginContainer>
              <FileDropzone.Input id="file-dropzone-id">Test</FileDropzone.Input>
            </MarginContainer>
          </FileDropzone>
        </Container>
        <FileDropzone.Fullscreen>
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
      </FileDropzone.Provider>
    );
  });

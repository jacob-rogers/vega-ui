import React from 'react';
import styled from '@emotion/styled';
import { Text } from '@gpn-design/uikit/Text';
import { FileIconAvi, FileIconBmp, FileIconDoc, FileIconGif } from '@gpn-prototypes/vega-icons';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { FileDropzone } from './FileDropzone';

const MarginContainer = styled.div`
  margin-top: 25px;
`;

const Container = styled.div`
  width: 300px;
`;

const FlexGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;

storiesOf('ui/FileDropzone', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('По умолчанию', () => {
    const [dropzoneText, setText] = React.useState('Перетащите, чтобы загрузить');

    return (
      <Container>
        <FileDropzone onDrop={(): void => setText('Файлы выбраны')}>
          <Text>{dropzoneText}</Text>
          <MarginContainer>
            <FileDropzone.Input id="dropzone-id" label={text('label', 'Я инпут')} />
          </MarginContainer>
        </FileDropzone>
      </Container>
    );
  })
  .add('Демонстрация работы с fullscreen', () => {
    const [dropzoneText, setText] = React.useState('Перетащите, чтобы загрузить');

    return (
      <Container>
        <FileDropzone fullscreen onDrop={(): void => setText('Файлы выбраны')}>
          <Text>{dropzoneText}</Text>
          <MarginContainer>
            <FileDropzone.Input id="file-dropzone-id" label={text('label', 'Я инпут')} />
          </MarginContainer>
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
        </FileDropzone>
      </Container>
    );
  });

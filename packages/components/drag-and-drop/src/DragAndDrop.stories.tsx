import React from 'react';
import styled from '@emotion/styled';
import { Text } from '@gpn-design/uikit/Text';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { DragAndDrop } from './DragAndDrop';

const Container = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});

const DndContainer = styled.div({
  width: '500px',
});

storiesOf('ui/DragAndDrop', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'CSSSR', status: 'Approved' } })
  .add('DragAndDrop на полный экран', () => {
    const [showFullscreen, setShowFullscreen] = React.useState(false);
    const [text, setText] = React.useState('Перетащите файл для демонстрации');

    const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      setShowFullscreen(false);
      setText(`Только что было загружено ${e.dataTransfer.files.length} файла`);
    };

    const handleDragStart = (): void => {
      if (!showFullscreen) {
        setShowFullscreen(true);
      }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      if (showFullscreen) {
        setShowFullscreen(false);
      }
    };

    return (
      <>
        <Container>
          <Text>{text}</Text>
        </Container>
        <DragAndDrop
          onDragEnter={handleDragStart}
          onDragLeave={handleDragLeave}
          onDragEnd={handleDrop}
          onDragOver={(e): void => e.preventDefault()}
          onDragExit={handleDragLeave}
          onDrop={handleDrop}
          fullscreen
          show={showFullscreen}
        >
          Отпустите, чтобы загрузить файлы
        </DragAndDrop>
      </>
    );
  })
  .add('DragAndDrop не в полноэкранном режиме', () => {
    const [text, setText] = React.useState('Перетащите файл для демонстрации');

    const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      setText(`Только что было загружено ${e.dataTransfer.files.length} файла`);
    };

    const handleDragStart = (): void => {
      setText('Отпустите для загрузки');
    };

    const handleDragLeave = (): void => {
      setText('Перетащите файл для демонстрации');
    };

    return (
      <DndContainer>
        <DragAndDrop
          onDragEnter={handleDragStart}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onDragOver={(e): void => e.preventDefault()}
        >
          {text}
        </DragAndDrop>
      </DndContainer>
    );
  });

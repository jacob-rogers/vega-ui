# @gpn-prototypes/vega-dropzone

# FileDropzone

Компонент необходим для загрузки файлов через drag and drop зону.

<img src="docs/pic-1.png">

### Установка

```
yarn add @gpn-prototypes/vega-dropzone
```

### Примеры использования

```jsx
import { FileDropzone } from '@gpn-prototypes/vega-dropzone';

export const MyComponent = () => {
  const [dropzoneText, setText] = React.useState('Перетащите, чтобы загрузить');

  return (
    <FileDropzone fullscreen onDrop={(): void => setText('Файлы выбраны')}>
      <Text>{dropzoneText}</Text>
      <FileDropzone.Input id="file-dropzone-id" label={text('label', 'Я инпут')} />
      <FileDropzone.Fullscreen>
        <FileIconBmp size="m" />
        <FileIconAvi size="m" />
        <FileIconDoc size="m" />
        <FileIconGif size="m" />
        <Text>Отпустите, чтобы загрузить</Text>
      </FileDropzone.Fullscreen>
    </FileDropzone>
  );
};
```

### API

```ts
type FileDropzoneProps = {
  children: React.ReactNode;
  className?: string;
  show?: boolean; // должна ли отображаться Dropzone
  fullscreen?: boolean; // нужен ли рендер в режиме fullscreen
  onDrop(files: FileList[]): void;
  onDragEnter(e: DragEvent)?: void;
  onDragLeave(e: DragEvent)?: void;
};

type FileDropzoneInputProps = {
  className?: string;
  label?: string; // лейбл для кнопки
  id: string; // id для крепления лейбла к инпуту
};
```

Компонент `FileDropzone.Fullscreen` имеет те же пропсы, что и `FileDropzone`. `FileDropzone.Fullscreen` рендерится в портале.

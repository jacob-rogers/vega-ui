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
import { FileDropzone, useFileDropzone } from '@gpn-prototypes/vega-drag-and-drop';

export const MyComponent = () => {
  const [text, setText] = React.useState('Перетащите, чтобы загрузить');

  const dropzoneApi = useFileDropzone(
    { onLoad: () => setText('Файлы загружены') },
    { withFullscreen: true },
  );

  return (
    <FileDropzone.Provider api={dropzoneApi}>
      <Container>
        <FileDropzone>
          {text}
          <FileDropzone.Input id="file-dropzone-id">Test</FileDropzone.Input>
        </FileDropzone>
      </Container>
      <FileDropzone.Fullscreen>Отпустите, чтобы загрузить</FileDropzone.Fullscreen>
    </FileDropzone.Provider>
  );
};
```

Компонент обязательно должен быть обернут в `FileDropzone.Provider`, куда должно передаваться `api` из `useFileDropzone`.

### API

```ts
type FileDropzoneProps = {
  children: React.ReactNode;
  className?: string;
  show?: boolean; // должна ли отображаться Dropzone
  fullscreen?: boolean; // нужен ли рендер в полный экран
};

type FileDropzoneInputProps = {
  className?: string;
  label?: string; // лейбл для кнопки
  id: string; // id для крепления лейбла к инпуту
};

type FileDropzoneProviderProps = {
  api: FileDropzoneAPI; // API для работы с FileDropzone. Описано ниже
};
```

Компонент `FileDropzone.Fullscreen` имеет те же пропсы, что и `FileDropzone`. `FileDropzone.Fullscreen` рендерится в портале.

# useFileDropzone

Хук, который предоставляет необходимый API для работы с `FileDropzone`.

### Пример использования

```tsx
const dropzoneApi = useFileDropzone(
  { onLoad: () => setText('Файлы загружены') },
  { withFullscreen: true },
);
```

### API

Принимает на вход два аргумента: `ts handlers: DragHandlers` и `options: FileDropzoneOptions`

```ts
export type DropzoneDragEvent = DragEvent | React.DragEvent<HTMLDivElement>;

export type ReactDragEventHandler = (e: DropzoneDragEvent) => void;

type LoadEvent = DropzoneDragEvent | ReactInputChangeEvent;

export type DragHandlers = {
  onDragStart?: ReactDragEventHandler;
  onDragEnd?: ReactDragEventHandler;
  onDragOver?: ReactDragEventHandler;
  onDragEnter?: ReactDragEventHandler;
  onDragLeave?: ReactDragEventHandler;
  onDragExit?: ReactDragEventHandler;
  onDrop?: (e: DropzoneDragEvent | React.ChangeEvent<HTMLInputElement>) => void;
  onLoad?: (e: LoadEvent) => void; // метод для загрузки файлов
};

type FileDropzoneOptions = {
  withFullscreen?: boolean; // нужен ли рендер fullscreen
};
```

Возвращает `FileDropzoneAPI`

```ts
export type FileDropzoneAPI = {
  fullscreenVisible: boolean; // видимость Dropzone в режиме fullscreen
  handleDragEnter: ReactDragEventHandler;
  handleDragLeave: ReactDragEventHandler;
  handleDragOver: ReactDragEventHandler;
  handleLoad: (e: LoadEvent) => void;
};
```

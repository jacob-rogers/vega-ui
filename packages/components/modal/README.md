# @gpn-prototypes/vega-modal

Компонент рендерит React-портал и является модальным окном, которое открывается поверх основного контента.
![Модальное окно](docs/modal.png)

### Установка

    yarn add @gpn-prototypes/vega-modal

### Пример использования

```jsx
import { Modal, useModal } from '@gpn-prototypes/vega-modal';

export const MyComponent = () => {
  const { isOpen, close, open } = useModal();

  return (
    <>
      <Modal hasOverlay hasCloseButton onClose={close} isOpen={isOpen}>
        <Modal.Header>
          <Text size="xs">Тестовая модалочка</Text>
        </Modal.Header>
        <Modal.Body>
          <Text>модалка модалка модалка</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button size="m" view="primary" label="Кнопочка" />
        </Modal.Footer>
      </Modal>
      <Button onClick={open}>Открыть модалку</Button>
    </>
  );
};
```

### API компонента

```ts
type ModalProps = {
  onClose: React.EventHandler<React.MouseEvent | React.KeyboardEvent>; // метод для закрытия модального окна
  isOpen?: boolean; // индикация того, что модального окно открыто
  hasCloseButton?: boolean; // нужно ли рендерить крестик для закрытия
  children?: React.ReactNode;
  hasOverlay?: boolean; // нужно ли рендерить оверлей
  onOverlayClick?: (e: React.SyntheticEvent) => void; // метод, который вызовется по клику на оверлей (по умолчанию onClose)
  rootSelector?: string; // селектор, в котором рендерить модальное окно (по умолчанию body)
};
```

`Modal.Header`, `Modal.Body` и `Modal.Footer` принимают пропсы `className` и `testId` для установки кастомного класса и ID для теста.

### API useModal

Хук для упрощения работы с модальным окном

Принимает на вход

    { initialOpen: boolean } - открыто ли модальное окно по умолчанию

Возвращает

    isOpen - индикация того, что модальное окно открыто
    open - метод для открытия модального окна
    close - метод для закрытия модального окна

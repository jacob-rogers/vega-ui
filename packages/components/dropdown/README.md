# @gpn-prototypes/vega-dropdown

Компонент является элементом, который выпадает из trigger-элемента.

<img src="docs/dropdown.png" height="200">

### Установка

    yarn add @gpn-prototypes/vega-dropdown

### Пример использования

```jsx
import { Dropdown, useDropdown } from '@gpn-prototypes/vega-dropdown';

export const MyComponent = () => {
  const { isOpen, open, close, toggle } = useDropdown();

  const triggerNode = <Button label="Click Me" onClick={open} />;

  return (
    <Dropdown isOpen={isOpen} trigger={triggerNode} onClose={close}>
      <Dropdown.Menu>
        <Dropdown.Item>First</Dropdown.Item>
        <Dropdown.Item>Second</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
```

### Пример использования с React-порталом

```jsx
<>
  <Dropdown.Trigger id="trigger">
    <Button label="Click Me" onClick={open} />
  </Dropdown.Trigger>
  <Dropdown portalId="trigger" portal isOpen={isOpen} onClose={close}>
    <Dropdown.Menu />
  </Dropdown>
</>
```

### API компонента

```ts
type DropdownProps = {
  trigger?: React.ReactNode; // компонент-триггер для дропдауна
  onClose: (e?: MouseEvent | TouchEvent) => void; // метод для закрытия дропдауна
  children?: React.ReactNode;
  isOpen: boolean; // открыт ли дропдаун
  className?: string;
  portal?: boolean; // должен ли компонент рендериться в портале
  portalId?: string; // id для контейнера-портала
};

type DropdownItemProps = {
  className?: string;
  children?: React.ReactNode;
  onClick?: (e: MouseEvent) => void;
  isActive?: boolean; // является ли эта ссылка активной
  align?: 'center' | 'start' | 'end'; // расположение элемента относительно меню
};

type DropdownMenuProps = {
  className?: string;
  children?: React.ReactNode;
};

type DropdownTriggerProps = {
  id: string;
  children?: React.ReactNode;
  className?: string;
};
```

Если передается проп `portal`, то проп `trigger` игнорируется. Для триггера используйте компонент `Dropdown.Trigger`.

### API useDropdown

Хук для упрощения работы с дропдауном.

Возвращает:

```ts
isOpen: boolean - индикация того, что дропдаун открыт
toggle: () => void - метод для изменения состояния дропдауна
close: () => void - метод для закрытия дропдауна
open: () => void - метод для открытия дропдауна

```

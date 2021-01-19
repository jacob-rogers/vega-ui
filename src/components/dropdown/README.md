# @gpn-prototypes/vega-dropdown

Компонент является элементом, который выпадает из trigger-элемента.

<img src="docs/dropdown.png" height="200">

### Пример использования

```jsx
import { Dropdown, useDropdown } from '@gpn-prototypes/vega-ui';

export const MyComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dropdown
      isOpen={isOpen}
      onToggle={(nextState): void => {
        setIsOpen(nextState);
      }}
    >
      <Dropdown.Trigger>
        {({ toggle, props }): React.ReactNode => (
          <button type="button" onClick={toggle} {...props}>
            Кнопка
          </button>
        )}
      </Dropdown.Trigger>
      <Dropdown.Menu>{({ props }): React.ReactNode => <Menu {...props}>Меню</Menu>}</Dropdown.Menu>
    </Dropdown>
  );
};
```

### Пример использования с React-порталом

```jsx
<>
  <Dropdown
    isOpen={isOpen}
    portal={document.body}
    onToggle={(nextState): void => {
      setIsOpen(nextState);
    }}
  >
    <Dropdown.Trigger>
      {({ toggle, props }): React.ReactNode => (
        <button type="button" onClick={toggle} {...props}>
          Кнопка
        </button>
      )}
    </Dropdown.Trigger>
    <Dropdown.Menu>{({ props }): React.ReactNode => <Menu {...props}>Меню</Menu>}</Dropdown.Menu>
  </Dropdown>
  <div id="portal-id" />
</>
```

### API компонента

```ts
type DropdownPlacement =
  | 'auto-start'
  | 'auto'
  | 'auto-end'
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'right-start'
  | 'right'
  | 'right-end'
  | 'bottom-end'
  | 'bottom'
  | 'bottom-start'
  | 'left-end'
  | 'left'
  | 'left-start';

export type DropdownProps = {
  isOpen?: boolean; // индикация того, что дропдаун открыт
  onlyOpen?: boolean; // рендерить меню, если isOpen=true. Для большего контроля снаружи следует отключить, например, для добавления анимаций
  onToggle?(nextState: boolean, event: React.SyntheticEvent): void; // обработчик переключения состояния дропдауна
  onClickOutside?(): void; // обработчик клика вне дропдауна
  children?: React.ReactNode;
  portal?: HTMLDivElement | null; // контейнер-портал
  offset?: [number, number]; // отступ меню. Формат [skidding, distance]
  placement?: DropdownPlacement; // расположение меню
};

export type DropdownTriggerChildrenProps = {
  toggle(event: React.SyntheticEvent): void;
  isOpen: boolean;
  props: {
    ref: (ref: HTMLElement | null) => void;
  };
};

export type DropdownMenuChildrenProps = {
  isOpen: boolean;
  props: {
    ref: (ref: HTMLElement | null) => void;
    style: React.CSSProperties;
  };
};
```

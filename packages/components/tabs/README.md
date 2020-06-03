# @gpn-prototypes/vega-tabs

Компонент-обертка для Tabs из UI-kit.
![Табы](docs/tabs.png)

### Установка

```
yarn add @gpn-prototypes/vega-tabs

```

### Пример использования

```jsx
import { Tabs } from '@gpn-prototypes/vega-tabs';
import { IconCamera, IconPhoto, IconRing } from '@gpn-prototypes/vega-icons';

export const MyComponent = () => {
  const tabs = [
    {
      name: 'Первый вариант',
      icon: IconPhoto,
    },
    {
      name: 'Второй вариант',
      icon: IconRing,
    },
    {
      name: 'Третий вариант',
      icon: IconCamera,
    },
  ];

  const [valueTab, setValueTab] = useState([
    {
      name: 'Второй вариант',
    },
  ]);

  return (
    <>
      <Tabs
        size="s"
        view="bordered"
        withIcon
        items={tabs}
        value={valueTab}
        getItemKey={(item) => item.name}
        getItemLabel={(item) => item.name}
        getItemIcon={withIcon ? (item) => item.icon : undefined}
        onChange={({ value }) => setValueTab(value)}
      />
    </>
  );
};
```

### API компонента

```ts
type TabsProps = {
  size: 's' | 'm'; // размер табов
  view: 'bordered' | 'clear'; // отображать нижнюю границу
  withIcon: boolean; // отображать текст и иконки
  onlyIcon: boolean; // отображать только иконки
  items: ItemTabs[]; // табы
  value: ItemTabs[]; // активный таб
  onChange: ({ value }) => void;
  getItemKey: (item: ItemTab) => any; // метод для указания key таба
  getItemLabel: (item: ItemTab) => any; // метод для указания текста таба
  getItemIcon: (item: ItemTab) => any; // метод для отображения иконки в табе
};
```

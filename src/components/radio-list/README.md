# @gpn-prototypes/vega-radio-list

Компонент является списком с возможностью выбрать один элемент

<img src="docs/radioList.png" height="150">

### Примеры использования

```jsx
import { RadioList } from '@gpn-prototypes/vega-ui';

export const MyComponent = () => {

  const scenarioList = {
  name:'Сценарии',
  array:
    [{
      id: 'id1',
      name: 'Сценарий 1',
      text: 'Сценарий 1',
    },
    {
      id: 'id2',
      name: 'Сценарий 2',
      text: 'Сценарий 2',
    },
    {
      id: 'id3',
      name: 'Сценарий 3',
      text: 'Сценарий 3',
    }]
  };

  return (
      const [activeItem, setActiveItem] = React.useState(scenarioList.array[0].id);

        return (
           <RadioList name={scenarioList.name}  value={activeItem}  onChange={setActiveItem}>
              {scenarioList.array.map(item => (
                <RadioList.Item
                  key={item.id}
                  value={item.id}
                  text={item.text}
                />
              ))}
            </RadioList>
  );
};
```

### API

```ts
type RadioListProps = {
  children?: React.ReactNode;
  className?: string;
};

type RadioListItemProps = {
  className?: string;
  children?: React.ReactNode;
  text?: string;
  value: string;
};
```

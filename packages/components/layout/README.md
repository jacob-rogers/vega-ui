# @gpn-prototypes/vega-layout

### API

-   [Описание компонентов](./docs/components.md)
-   [Описание Grid](./docs/grid.md)

### Установка

    yarn add @gpn-prototypes/vega-layout

### Пример использования

```jsx
import { useState } from 'react';
import { Layout } from '@gpn-prototypes/vega-layout';

export const MyLayout = () => {
  // initialState на самом деле опционален и должен браться из api
  // тут он указан только для примера
  // если initialState будет меняться, то это будет приводить к переинициализации grid'а,
  // поэтому следует этого по возможности избегать
  const initialState = useMemo(() => ({}), []);
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    fetchWidgets().then((widgets) => setWidgets(widgets));
  }, []);

  const handleChange = ({ state }) => {
    saveLayoutToBackend(state);
  };

  return (
    <Layout state={initialState} widgets={widgets} onChange={handleChange} />
  );
};
```

```ts
type LayoutProps = {
  className?: string;
  state: GridState;
  widgets: LayoutWidget[];
  onChange: (change: { update: GridUpdate; state: GridState });
};
```

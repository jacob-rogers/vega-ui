# @gpn-prototypes/vega-layout

Компоненты лэйаута.

<img src="docs/pic-1.png" height="50">

### Установка

```
yarn add @gpn-prototypes/vega-layout
```

### Примеры использования

```jsx
import { Layout } from '@gpn-prototypes/vega-layout';

export const MyLayout = () => {
  return (
    <Layout>
      <Layout.Window>
        <Layout.Header />
        <Layout.Body />
      </Layout.Window>
    </Layout>
  );
};
```

### API

```ts
type LayoutProps = {
  children?: React.ReactNode;
  className?: string;
};
```

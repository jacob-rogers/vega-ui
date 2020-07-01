# @gpn-prototypes/vega-layout

Компоненты лэйаута Веги-2.

<img src="docs/pic-1.png" height="100">

Позволяют разделять страницу на «окна», которые можно сплиттить (разбивать пополам) и ресайзить (по вертикали и по горизонтали).

<img src="docs/pic-2.png" height="100">

#### Layout

-   Обертка, внутри которой должны располагаться все компоненты лейаута.

-   Внутри одного `Layout` должно быть 1 или 2 `Layout.Window` (не больше).

    Сплиттинг на большее количество окон происходит с помощью разбиения каждого дочерного окна на 2.

    Для сплиттинга `Layout` принимает пропс размеров (`sizes`) колонок (в %).

    Внутри компонента эти пропсы используются для css-свойств `gridTemplateColumns` и `gridTemplateRows`.

-   `Layout` передает всем дочерним `Layout.Window` пропс `resizeDirection`. Значение пропса он выбирает на основе `splitDirection`.

    `<Layout splitDirection="vertical" sizes={[55, 45]}>` отрендерит `<Layout.Window resizeDirection="vertical">`.

    `<Layout splitDirection="horizontal" sizes={[55, 45]}>` отрендерит `<Layout.Window resizeDirection="horizontal">`.

    Если в `children` передать что-то помимо `Layout.Window` — пропс `resize` не будет передан.

#### Layout.Window

-   Окно, структурный блок лейаута, который можно сплиттить и ресайзить.

-   Обязательно должен находиться внутри `Layout`.

-   Контент внутри окна должен быть внутри дочернего компонента `Layout.Body`, либо внутри еще одного `Layout` (для вложенных окон).

-   Между каждыми двумя `Layout.Window` есть кнопка-ресайзер, с помощью которой можно изменять размеры окон.

    Компонент `Layout.Window` принимает пропс `resizeDirection`, определяющий по какой оси можно окно ресайзить (`vertical` или `horizontal`).

    Самое верхнее окно в иерархии окон — не ресайзится.

#### Layout.Header

Шапка окна — опциональный компонент; обертка, которая принимает любой контент.
В шапке располагаются: контрол управления контентом окна и контрол для сплиттинга окна.

Шапка должна находиться внутри `Layout.Window`, на одном уровне с `Layout.Body`.

#### Layout.Body

Тело окна, где располагается контентная часть. Обертка, принимает любой контент.

### Установка

    yarn add @gpn-prototypes/vega-layout

### Примеры использования

#### Пустой лейаут

```jsx
import { Layout } from '@gpn-prototypes/vega-layout';

export const MyLayout = () => {

  const handleLayoutChange = (action) => {
    console.log(action);
  };

  return (
    <Layout>
      <Layout.Window>
        <Layout.Header>
          <Layout.Options onLayoutChange={handleLayoutChange}>
        </Layout.Header>
        <Layout.Body />
      </Layout.Window>
    </Layout>
  );
};
```

#### Много окон в лейауте

`Layout > Layout.Window > Layout > Layout.Window*2 > Layout.Header,Layout.Body`

```jsx
import { Layout } from '@gpn-prototypes/vega-layout';

...

<Layout columns={[60, 40]}>

  <Layout.Window>
    <Layout columns={[20, 80]}>

      <Layout.Window>
        <Layout rows={[65, 35]}>

          <Layout.Window>
            <Layout.Header />
            <Layout.Body>
              Текст внутри блока
            </Layout.Body>
          </Layout.Window>

          <Layout.Window>
            <Layout.Header />
          </Layout.Window>

        </Layout>
      </Layout.Window>

      <Layout.Window>
        <Layout.Header />
        <Layout.Body />
      </Layout.Window>

    </Layout>
  </Layout.Window>

  <Layout.Window>
    <Layout rows={[55, 45]}>

      <Layout.Window>
        <Layout.Header />
        <Layout.Body>
          Текст внутри блока
        </Layout.Body>
      </Layout.Window>

      <Layout.Window>
        <Layout.Header />
        <Layout.Body />
      </Layout.Window>

    </Layout>
  </Layout.Window>

</Layout>
```

Больше примером см. в [stories](./src/Layout.stories.tsx)

### API

```ts
type LayoutProps = {
  children?: React.ReactNode;
  className?: string;
  rows?: [number, number]; — размеры строк в %
  columns?: [number, number]; — размеры колонок в %
};
```

### Layout.Options

Компонент рендерит список опций для взаимодействия с Layout.

<img src="docs/pic-2.png" height="50">

```ts
```

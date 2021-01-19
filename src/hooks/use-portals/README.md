# usePortals

Пресоставляет API для управление React-порталами.

### API

```ts
type PortalParams = {
  parentSelector?: string; // селектор родительского контейнера для портала
  name: string;
  className?: string;
};

type PortalsMap = {
  [key: string]: HTMLDivElement;
};

type PortalsAPI = {
  ref: React.MutableRefObject<PortalsMap>; // реф с порталами
  createContainer(portal: PortalParams): void; // метод для создания контейнера
  append(portal: PortalParams): void; // метод для крепления контейнера к parentSelector
  remove(portalName: string): void; // метод для удаления контейнера
};

```

Принимает на вход:

```ts
type API = {
  portals: PortalParams | PortalParams[]; // начальные порталы для рендера
}
```

### Пример использования

```ts
const { ref } = usePortals([{ name: 'default', className: 'default' }]);
```

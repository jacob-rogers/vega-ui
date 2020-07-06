# Установка пакета в ваш проект

Перед установкой пакет должен быть [опубликован](publishing.md).

Чтобы `npm` понимал, откуда нужно скачивать пакеты со скоупом `@gpn-prototypes`, нужно создать в вашем проекте файл `.npmrc` с адресом Github-реджистри:

```bash
@gpn-prototypes:registry=https://npm.pkg.github.com
registry=https://registry.npmjs.org/
```

Далее можно устанавливать зависимости, как обычно:

-   `yarn add @gpn-prototypes/vega-ui` — установить все компоненты
-   `yarn add @gpn-prototypes/vega-modal` — установить только один компонент
-   `yarn add @gpn-prototypes/vega-hooks` — установить хуки

Использование:

```typescript
import { Avatar, Button, Dropdown } from '@gpn-prototypes/vega-ui';
import { useClickOutside } from '@gpn-prototypes/vega-hooks';
import { Modal } from '@gpn-prototypes/vega-modal';
```

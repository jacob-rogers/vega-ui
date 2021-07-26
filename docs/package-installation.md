# Установка пакета в ваш проект

Перед установкой пакет должен быть [опубликован](publishing.md).

Чтобы `npm` понимал, откуда нужно скачивать пакеты со скоупом `@gpn-prototypes`, нужно создать в вашем проекте файл `.npmrc` с адресом Github-реджистри:

```bash
@gpn-prototypes:registry=https://npm.pkg.github.com
registry=https://registry.npmjs.org/
```

Далее можно устанавливать зависимости, как обычно:

*   `yarn add @gpn-prototypes/vega-ui` — установить все компоненты

Использование:

```typescript
import { Avatar, Button, Dropdown, useKey } from '@gpn-prototypes/vega-ui';
```

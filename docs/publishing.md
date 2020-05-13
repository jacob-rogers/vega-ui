# Паблишинг пакетов

Для паблишинга и управлением версиями пакетов используется [lerna](https://lerna.js.org/).

Пакеты являются публичными и паблишатся в [Github-реджистри](https://npm.pkg.github.com).

Скоуп пакетов — [@gpn-prototypes](https://github.com/orgs/gpn-prototypes/packages).

Примеры пакетов: `@gpn-prototypes/vega-hooks`, `@gpn-prototypes/vega-ui`, `@gpn-prototypes/vega-modal`

## До публикации

Перед мержем в мастер и паблишем стабильной версии должно быть пройдено ревью и тестирование изменений.

ПР с изменениями может попасть в мастер 2-мя способами:

1. сначала его вливают в релизную ветку и примерно раз в неделю будет происходить релиз всех оттестированных пакетов
2. напрямую в мастер (хотфикс)

Тестирование должно проходить в ветке задачи, до мержа ПРа.

## Публикация

### Публикация через Github Actions

Запускается автоматически при пуше в мастер или в релизную ветку.

[Конфигурация](../.github/workflows/publish.yml).

### Публикация вручную

1. генерируем токен в своем гитхабе: https://github.com/settings/tokens — Generate new token
2. логинимся в реджистри гитхаба через npm:

```bash
$ npm login --registry=https://npm.pkg.github.com`
> Username: USERNAME
> Password: TOKEN
> Email: PUBLIC-EMAIL-ADDRESS
```

3. запускаем паблиш пакетов лерной

`yarn lerna publish from-git --yes --registry https://npm.pkg.github.com/gpn-prototypes`
– она предложит поднять нужнуе версию: мажор/минор/патч/пререлиз.

## После публикации

Пакеты становятся доступны публично, привязываются к организации [gpn-prototypes](https://github.com/orgs/gpn-prototypes/packages).

_Внимание!_ На данный момент пакеты публикуются только Github-реджистри. В npm-реджистри не публикуются. Это значит, что через `npm` нельзя их установить, не указав откуда их нужно скачивать. Подробнее читай ниже.

## Как установить опубликованный пакет в ваш проект

Чтобы при установке зависимостей `npm` понимал, откуда ему нужно скачивать пакеты со скоупом `@gpn-prototypes`, нужно явно ему указать адрес реджистри.

Один из способов: создать в вашем проекте файл `.npmrc` с адресом реджистри:

```bash
@gpn-prototypes:registry=https://npm.pkg.github.com
registry=https://registry.npmjs.org/
```

После этого можно устанавливать зависимости как обычно:

- `yarn add @gpn-prototypes/vega-ui` – установить все компоненты
- `yarn add @gpn-prototypes/vega-modal` — только один компонент
- `yarn add @gpn-prototypes/vega-hooks` — все хуки

Использование:

```typescript
import { Avatar, Button, Dropdown } from @gpn-prototypes/vega-ui;
import { useClickOutside } from @gpn-prototypes/vega-hooks;
import { Modal } from @gpn-prototypes/vega-modal;
```

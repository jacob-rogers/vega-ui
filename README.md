# Vega UI kit

![version](https://img.shields.io/badge/dynamic/json?label=vega-ui&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2Fgpn-prototypes%2Fvega-ui%2Fmaster%2Fpackages%2Fcomponents%2Fpackage.json)
[![проверки](https://github.com/gpn-prototypes/vega-ui/workflows/%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B8/badge.svg?branch=master)](https://github.com/gpn-prototypes/vega-ui/actions?query=workflow%3A%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B8)

![node](https://img.shields.io/badge/node-%3E%3D%2012.16.2-brightgreen.svg)
![yarn](https://img.shields.io/badge/yarn-%3E%3D%201.22.4-blue.svg)
[![PR's Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](docs/contributors.md)

Библиотека компонентов для проекта Vega 2.0.
Дополняет [дизайн-систему ГПН](https://github.com/gpn-prototypes/ui-kit). Для взаимодействия с ней созданы компоненты-обертки, которые позволяют:

-   дополнять компоненты дизайн-системы новой функциональностью, не изменяя сам компонент;
-   обновлять только обертку при изменении API компонента дизайн-системы, не трогая зависимости.

## Структура проекта

    .
    ├── packages
    │   ├── components # директория для компонентов
    │   ├── hooks # директория для react-хуков
    │   ...
    ├── scripts # скрипты для сборки
    ├── types # типы внешних пакетов и глобальных объектов
    ├── package.json
    ├── yarn.lock
    └── # конфиги

## Зависимости

-   node.js `^12.16.2`
-   yarn `^1.22.4`
-   Дизайн-система ГПН: [GPN UI kit](https://github.com/gpn-prototypes/ui-kit)

Полный список зависимостей приведен в [package.json](package.json).

## Компоненты Vega UI

Полный список в [Readme компонентов](packages/components/README.md) и [Storybook](http://master.vega-ui-storybook.csssr.cloud/). Дополнительно разработаны [React-хуки](packages/hooks/README.md).

## Браузеры

Две последние мажорные версии браузеров на Chromium (в т.ч. Chrome, Yandex, Edge).

Edge старше 81 версии и IE [в поддержку не входят](docs/ie.md).

## Начало работы

Чтобы установить пакеты, сначала необходимо авторизоваться в `github npm registry`. Для этого нужно сделать следующее:

1.  Сгенерировать токен: <a href="https://github.com/settings/tokens">https&#x3A;//github.com/settings/tokens</a> → Generate new token. Дополнительно нужно отметить `read:packages` и `write:packages`.
2.  Авторизоваться из текущей директории в Github-реджистри через npm:

```bash
$ npm login --registry=https://npm.pkg.github.com`
> Username: USERNAME
> Password: TOKEN
> Email: PUBLIC-EMAIL-ADDRESS
```

Затем:

```bash
# установка зависимостей
$ yarn

# сборка и связывание пакетов
$ yarn build

# запуск Storybook
$ yarn storybook
```

Подробнее [об основных командах](docs/getting-started.md).

## Справка

-   [Добавление нового компонента](docs/new-component.md)
-   [Тестовое покрытие компонентов](docs/unit-tests.md)
-   [Отправка PR на тестирование QA](docs/qa-flow.md)
-   [Отправка PR в мастер](docs/pr-merge.md)
-   [Публикация пакетов](docs/publishing.md)
-   [Настройка среды разработки](docs/environment.md)
-   [Особенности настройки проекта под Windows](docs/windows.md)

## Оформление

-   [Оформление кода: основные договоренности](docs/code-style.md)
-   [Оформление коммитов](docs/commits-style.md)
-   [Оформление PR](docs/pr-style.md)
-   [Ведение Storybook](docs/storybook.md)

## Внешним разработчикам

Основная команда разработки — CSSSR, но любые другие команды всегда приветствуются к участию в развитии библиотеки.

-   [Контрибьютинг](docs/contributors.md)
-   [Ревью](docs/review.md)
-   [Установка пакета](docs/package-installation.md)
-   [Получение обновлений и проблемы при обновлении](docs/receiving-updates.md)

## Мейнтейнеры

<table>
    <tr>
        <td align="center">
            <a href="https://github.com/tsvetta"><img src="https://avatars2.githubusercontent.com/u/4266798?s=460&u=69bc2030ad07ce99cc9dbe5786a15db913cea822&v=4" width="100px;" alt=""/><br /><sub><b>Tatyana Tsvetkova</b></sub></a><br />
        </td>
        <td align="center">
            <a href="https://github.com/Inzephirum"><img src="https://avatars2.githubusercontent.com/u/10738842?s=460&u=7eb1de3f5a5a64e42c8acf59325124e325909210&v=4" width="100px;" alt=""/><br /><sub><b>Sergey Gavshin</b></sub></a><br />
        </td>
        <td align="center">
            <a href="https://github.com/c1n1k"><img src="https://avatars2.githubusercontent.com/u/420945?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Oleg Denisov</b></sub></a><br />
        </td>
        <td align="center">
            <a href="https://github.com/hitmanet"><img src="https://avatars2.githubusercontent.com/u/33551076?s=460&v=4" width="100px;" alt=""/><br /><sub><b>Dmitriy Klimenko</b></sub></a><br />
        </td>
        <td align="center">
            <a href="https://github.com/maksim-kononov-csssr"><img src="https://avatars1.githubusercontent.com/u/45596310?s=460&u=b199736cdaf744dd8c385d04c71f1d355490b65e&v=4" width="100px;" alt=""/><br /><sub><b>Maksim Kononov</b></sub></a><br />
        </td>
        <td align="center">
            <a href="https://github.com/fixmylie"><img src="https://avatars1.githubusercontent.com/u/31928264?s=460&u=7df7c159f48460b59ba10261931e1120dca74ae0&v=4" width="100px;" alt=""/><br /><sub><b>Roman Gurinovich</b></sub></a><br />
        </td>
    </tr>
</table>

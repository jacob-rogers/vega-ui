# Основные команды

Установить зависимости

    $ yarn

Создать директорию нового компонента по шаблону из `./_templates`, [подробнее тут](./new-component.md).

    $ yarn nc <component-name>

Собрать и слинковать все пакеты

    $ yarn build # включает в себя:
    $ yarn build:ts # сборка typescript
    $ yarn build:css # сборка css

Прогнать тесты во всех компонентах

    $ yarn test

Запустить тесты в watch-режиме

    $ yarn test:watch

Сформировать отчет по покрытию тестами

    $ yarn coverage

Удалить директории node_modules и dist у всех пакетов

    $ yarn packages:clean

lerna

    $ yarn packages:diff
    $ yarn packages:bootstrap
    $ yarn packages:version
    $ yarn packages:link

Запустить Storybook на 6006 порту

    $ yarn storybook

Собрать статику Storybook

    $ yarn storybook:build

Прогнать форматирования prettier

    $ yarn prettier

Прогнать линтеры eslint и stylelint

    $ yarn lint

Автофикс ошибок линтеров

    $ yarn lint:fix

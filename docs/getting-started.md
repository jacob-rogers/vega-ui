# Начало работы

## Зависимости

**TBD** Указать зависимости

- NodeJS >= 12
- Yarn >= 1.16
- [GPN UI kit](https://github.com/gpn-prototypes/ui-kit) — дизайн система

## Установка зависимостей

**TBD**

```bash
$ yarn
```

## Основные команды

```bash
# Установить зависимости
$ yarn

# Собрать rollup'ом все пакеты и слинковать
$ yarn build

# Удаление директорий node_modules и dist у всех пакетов
$ yarn clean

# Прогнать все тесты во всех компонентах
$ yarn test

# Сформировать отчет по покрытию тестами
$ yarn coverage

# Запустить тесты в watch-режиме
$ yarn test:watch

# lerna
$ yarn diff
$ yarn bootstrap
$ yarn update:version
$ yarn link:packages

# Запуск сторибука на 6006 порту
$ yarn storybook

# Собрать статику сторибука
$ yarn build-storybook

# Проверить типизацию???
$ yarn types

# Запустить проверку типизации в watch-режиме???
$ yarn types:watch

# Прогнать форматирование prettier'ом
$ yarn prettier

# Прогнать линтеры: eslint и stylelint
$ yarn lint

# Автофикс ошибок линтеров
$ yarn lint:fix
```

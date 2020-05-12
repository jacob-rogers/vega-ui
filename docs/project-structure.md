# Структура проекта

    .
    ├── packages
    │   ├── components # Директория для пакетов
    │   ├── hooks
    │   ...
    ├── scripts # скрипты для сборки
    ├── types # типы внешних пакетов и глобальных объектов
    ├── package.json
    ├── yarn.lock
    └── # конфиги

## Структура компонента

```
└── components
    └── component-name
        ├── static/ # директория для хранения статики компонента (пример: картинки)
        ├── utils/ # вспомогательные функции, нужные только этому компоненту
        ├── SubComponent/ # дочерний компонент
        ├── ComponentName.stories.tsx
        ├── ComponentName.test.tsx
        ├── ComponentName.tsx
        ├── cn-component-name.tsx // экспорт block из bem-cn
        ├── ComponentName.css
        └── index.js # все публичные экспорты компонента
```

## Прафила форматирования, которые не автоматизированы линтерами

- имена директорий пакетов пишем в kebab-case, с маленькой буквы
- имена директорий _подкомпонентов_ пакета — в CamelCase, с заглавной буквы
- остальные файлы в kebab-case, с маленькой буквы
- при импорте добавялем префикс `Base` для компонентов из ДС, например:

```js
import { Select as BaseSelect } from '@gpn-design/uikit/Select';
```

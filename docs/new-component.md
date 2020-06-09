# Добавление нового компонента

## Структура компонента

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

## Автоматическое добавление нового компонента

    yarn hygen component new [name]

или

    yarn nc [name]

Для работы с шаблонами используется утилита [hygen](https://www.hygen.io/). Шаблон описан в директории: `_templates/component/new`.

На ОС Windows для корректной работы команды рекомендуется использовать `Bash`.

## Действия при выполнении шаблона нового компонента

Рассмотрим на примере команды `yarn nc apple-orange`.

1.  В `package.json` добавит новую запись в раздел `workspaces`: `"packages/components/apple-orange:`
2.  В `tsconfig.json` добавит новую запись в раздел `compilerOptions.paths`:
    `"@gpn-prototypes/vega-apple-orange"`: `["packages/components/apple-orange/src/index.ts"]`
3.  В `packages/components/index.ts` добавит новый экспорт: `export * from '@gpn-prototypes/vega-apple-orange';`
4.  В `packages/components/package.json` добавит новую запись в раздел `dependencies`: `"@gpn-prototypes/vega-apple-orange": "^0.0.1"`
5.  В `packages/components/README.md` добавит новую ссылку на документацию: `- [AppleOrange](apple-orange)`
6.  Добавит папку `packages/components/apple-orange` со следующей структурой:

<img src="static/new-component/pic-1.png" height="300">

## Оформление Storybook

Stories нового компонента необходимо оформить [по правилам](storybook.md).

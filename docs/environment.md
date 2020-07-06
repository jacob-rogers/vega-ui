# Настройка среды разработки

## VSCode

### Необходимые плагины

-   [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
-   [Prettier Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
-   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

### Настройки

Нужно активировать опции:

-   Editor: Format on save
-   Eslint: Format enable

непосредственно в settings.json добавить

      "editor.codeActionsOnSave": {
        "source.fixAll": true
      }

## WebStorm

### Необходимые плагины

-   editorConfig

# usePortalDomNode

Создает DOMElement, для использования React-порталов.

### API

    rootSelector - селектор, к которому должен крепиться DOMElement
    className - класс для DomElement

### Пример использования

```ts
const portal: HTMLDivElement = usePortalDomNode('body') as HTMLDivElement;
```

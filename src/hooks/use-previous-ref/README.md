# usePreviousRef

Хук для сохранения предыдущего значения переменной.
Возвращает ref, у которого в current хранится значение прошлого рендера

### API

    value - аргумент

### Пример использования

```js
const foo = 'bar';
const previousFooRef = usePreviousRef(foo);

previousFooRef.current; // do something
```

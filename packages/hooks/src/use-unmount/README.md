# useUnmount

Данный хук вызывает функцию, которая ему передана при анмаунте компонента (аналог componentWillUnmount)

### Пример использования

```ts
import { useUnmount } from '@gpn-prototypes/vega-hooks';

useUnmount(() => {
  console.log('i am unmount');
});
```

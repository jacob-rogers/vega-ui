# useMount

Хук, который выполняет переданную функцию при маунте компонента (аналог componentDidMount). Возвращает `isMountedRef`, у которого в поле current хранится, замонтирован компонент или нет.

### Пример использования

```ts
import { useMount } from '@gpn-prototypes/vega-hooks';

/// some code

const isMountedRef = useMount(() => {
  console.log('i am mount');
});

/// some code
```

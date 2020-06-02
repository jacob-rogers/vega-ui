# useMount

Хук, который выполняет переданную функцию при маунте компонента (аналог componentDidMount). Возвращает `isMountedRef`, у которого в поле current хранится, замонтирован компонент или нет.

Если результатом выполнения переданного коллбека будет функция, то она вызовется при размонтировании компонента.

### Пример использования

```ts
import { useMount } from '@gpn-prototypes/vega-hooks';

const isMountedRef = useMount(() => {
  console.log('i am mount');
});
```

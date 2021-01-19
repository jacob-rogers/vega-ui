# useRootClose

Хук необходим для закрытия компонента по клику вне его и по клику на esc

### Пример использования

```jsx
const SomeComponent: React.FC<TestProps> = ({ onClose }) => {
  const ref = useRef();
  useRootClose(ref, onClose);
  return <div ref={ref}>test component</div>;
};
```

### API

```ts
ref - ссылка на элемент, на котором нужна слушать ClickOutside
onClose - метод, который вызывается для закрытия компонента
```

# useKey

Хук добавляет универсальный слушатель события нажатия на кнопку клавиатуры

### Пример использования

```jsx
const SomeComponent: React.FC<TestProps> = ({ onKeyClick }) => {
  useKey('Enter', onKeyClick, { keyevent: 'keyup' });
  return <div>test component</div>;
};
```

### API

```ts
callback - Коллбек, который вызовется по клику на кнопку на клавитуре
key - Код кнопки на клавиатуре (Прим.: https://keycode.info/)
keyevent - Тип ивента, на который реагировать хуку ('keydown' | 'keypress' | 'keyup')
element - элемент, на котором должно слушаться нажатие. По умолчанию это document.
```

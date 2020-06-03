# Декоратор для Storybook `withMetadata`

Декоратор добавляет метаинформацию к компоненту в Storybook.
Исходный код: `.storybook/with-metadata/index.tsx`

<img src="static/with-metadata/pic-1.png" height="150">

## Использование

Для добавления метаинформации необходимо воспользоваться методом `addParameters` на уровне истории всего компонента и передать объект со свойством `metadata`.

```jsx
storiesOf('ui/Component', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: { href: 'https://example.com/docs', 'Документация' },
    },
  })
  .add('Component', () => <Component {...defaultKnobs()} />);
```

Декоратор принимает следующие параметры:<br>
_status_ — статус компонента. Возможные значения указаны ниже<br>
_author_ — автор компонента<br>
_description_ — короткое описание. Сценарии использования указаны ниже<br>
_link_ - ссылка. Сценарии использования указаны ниже

- Approved — компонент закончен и прошел проверку. Готов к использованию
- Draft — компонент не доработан/не прошел проверку. Может содержать баги
- Deprecated — компонент устарел и будет удален в следующих мажорных обновлениях. Не рекомендуется к использованию

### Действия декоратора по умолчанию

Если `author` или `status` для компонента не указаны, декоратор заменит отсутствующие значения текстом "не указан" и подсветит его красным цветом.

<img src="static/with-metadata/pic-4.png" height="150">

### Сценарии использования свойства `description`

Основная цель свойства `description` — указать необходимое пояснение к статусу.

Например, с помощью этого свойства можно дополнить статус _Deprecated_ и указать версию пакета, в которой компонент будет полностью удален. Или можно указать новый компонент, который предлагается использовать вместо устаревшего.

<img src="static/with-metadata/pic-2.png" height="150">

```jsx
storiesOf('ui/Component', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Deprecated',
      description: 'Компонент будет удален в 2.x.x',
    },
  })
  .add('Component', () => <Component {...defaultKnobs()} />);
```

Не стоит использовать свойство для описания особенностей использования/работы компонента, для этих целей используйте отдельный файл README.

#### Сценарии использования свойства `link`

Основная цель свойства `link` — указать ссылку на документацию или storybook компонента.

Например, если наш компонент является оболочкой над компонентом из ДС, то следует указать ссылку на storybook. В таком случае нет необходимости приводить все сценарии использования компонента и полностью дублировать knobs.

<img src="static/with-metadata/pic-5.png" height="150">

```jsx
storiesOf('ui/Component', module)
  .addParameters({
    metadata: {
      author: 'Дизайн-система ГПН',
      status: 'Approved',
      link: {
        href: 'https://gpn-prototypes.github.io/ui-kit/?path=/story/user',
        text: 'Документация',
      },
    },
  })
  .add('Component', () => <Component {...defaultKnobs()} />);
```

## Правила оформления stories

- для компонентов обязательно указывать **автора** и **статус**. Примеры приведены в описании инструмента `withMetadata`
- именовать knobs так же, как и props компонента
- приводить в stories все основные сценарии использования
- именовать stories с маленькой буквы. Стандартное название для stories "по умолчанию"
- если **компонент**, над которым делается **обёртка**, имеет свой storybook, то необходимо указать на него ссылку. В таком случае, нет необходимости приводить все сценарии использования компонента и дублировать knobs
- перечислить в knobs **свойства**, которые отвечают за **визуальные** изменения в компоненте
- **группировать** knobs, отделяя основной компонент и подкомпоненты
- указывать запись `text('%название_компонента(область)% | %свободное описание%', '%значение по умолчанию%')` для knobs, которые служат только для заполнения контентом и не являются **свойствами** этих компонентов
- не выносить в отдельную группу свойства компонента в knobs, служащих только для заполнения контентом

<img src="static/storybook/pic-1.png" height="150">

```jsx
const KNOB_GROUPS = {
  row: 'Form.Row',
  label: 'Form.Label',
  fieldset: 'Form.Fieldset',
};

const rowKnobs = (): React.ComponentProps<typeof Form.Row> => ({
  gap: select('gap', ['m', 'l', 'xl', 'none'], 'm', KNOB_GROUPS.row),
  space: select('space', ['m', 'l', 'xl', 'none'], 'm', KNOB_GROUPS.row),
  col: select('col', ['1', '2', '3', '4'], '1', KNOB_GROUPS.row),
});

const labelKnobs = (): Partial<React.ComponentProps<typeof Form.Label>> => ({
  space: select('space', ['2xs', 'xs', 's', 'none'], 's', KNOB_GROUPS.label),
  size: select('size', ['s', 'l'], 's', KNOB_GROUPS.label),
  htmlFor: text('htmlFor', 'example-1', KNOB_GROUPS.label),
});

const exampleKnobs = (): { text: string } => ({
  text: text('Form.Row | Пример текста', 'Первая ячейка'),
  formFooter: text('футер в форме без иконки | Пример текста', 'Я футер'),
});
```

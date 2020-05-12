import React from 'react';
import { Button } from '@gpn-design/uikit/Button';
import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Form } from './Form';

import './Form.stories.css';

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

const fieldsetKnobs = (): Partial<React.ComponentProps<typeof Form.Fieldset>> => ({
  disabled: boolean('disabled', false, KNOB_GROUPS.fieldset),
});

storiesOf('ui/Form', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const submitAction = action('Form submitted');

    return (
      <Form
        className="custom-classname"
        onSubmit={(e): void => {
          e.preventDefault();
          submitAction(e);
        }}
      >
        <h2>Пример формы</h2>
        <Form.Row col="3">
          <Form.Field>
            <Form.Label htmlFor="example-1">C множеством лейблов</Form.Label>
            <input id="example-1" placeholder="C множеством лейблов" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="example-2">C множеством лейблов</Form.Label>
            <input id="example-2" placeholder="C множеством лейблов" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="example-3">C множеством лейблов</Form.Label>
            <input id="example-3" placeholder="C множеством лейблов" />
          </Form.Field>
        </Form.Row>
        <Form.Row space="xl" gap="none">
          <Form.Label htmlFor="example-4">C одним лейблом, но много инпутов</Form.Label>
          <Form.Row col="3" space="none">
            <Form.Field>
              <input id="example-4" placeholder="C одним лейблов" />
            </Form.Field>
            <Form.Field>
              <input placeholder="C одним лейблов" />
            </Form.Field>
            <Form.Field>
              <input placeholder="C одним лейблов" />
            </Form.Field>
          </Form.Row>
        </Form.Row>
        <Form.Row>
          <Form.Field>
            <Form.Label htmlFor="example-1">Инлайн лейбл</Form.Label>
            <input id="example-1" placeholder="C множеством лейблов" />
          </Form.Field>
        </Form.Row>
        <Form.Row gap="none">
          <Form.Label htmlFor="example-5">C одним лейблов и инпуты</Form.Label>
          <Form.Row col="2" space="none">
            <Form.Field>
              <input id="example-5" />
            </Form.Field>
            <Form.Field>
              <input />
            </Form.Field>
            <Form.Field>
              <input />
            </Form.Field>
          </Form.Row>
        </Form.Row>
        <Form.Row gap="none" className="rowFirst">
          <Form.Fieldset>
            <Form.Label htmlFor="example-6">Подмешанные классы в компоненты</Form.Label>
            <Form.Row col="4" space="none" className="rowSecond">
              <Form.Field className="fieldFirst">
                <input id="example-6" placeholder="Большой" />
              </Form.Field>
              <Form.Field className="fieldSecond">
                <Form.Label htmlFor="example-7" className="labelFirst" space="none">
                  Лейбл
                </Form.Label>
                <input id="example-7" className="inputFirst" placeholder="Средний" />
              </Form.Field>
              <Form.Field>
                <input id="example-8" placeholder="Маленький" />
              </Form.Field>
            </Form.Row>
          </Form.Fieldset>
        </Form.Row>
        <Form.Row gap="none">
          <Form.Row col="2" space="none">
            <Form.Fieldset>
              <legend>Чекбоксы</legend>
              <Form.Label>
                <input type="checkbox" />
                Пример чекбокса
              </Form.Label>
              <Form.Label>
                <input type="checkbox" />
                Пример чекбокса
              </Form.Label>
              <Form.Label>
                <input type="checkbox" />
                Пример чекбокса
              </Form.Label>
            </Form.Fieldset>
            <Form.Fieldset disabled>
              <legend>Чекбоксы выключим в Fieldset</legend>
              <Form.Label>
                <input type="checkbox" />
                Пример чекбокса
              </Form.Label>
              <Form.Label>
                <input type="checkbox" />
                Пример чекбокса
              </Form.Label>
              <Form.Label>
                <input type="checkbox" />
                Пример чекбокса
              </Form.Label>
            </Form.Fieldset>
          </Form.Row>
        </Form.Row>
        <Button type="submit" label="Кнопка" />
      </Form>
    );
  })
  .add('playground', () => {
    const submitAction = action('Form submitted');
    const textExample = text('example text', 'example-1', KNOB_GROUPS.label);

    return (
      <Form
        className="playground-form"
        onSubmit={(e): void => {
          e.preventDefault();
          submitAction(e);
        }}
      >
        <h2 className="playground-title">Пример формы</h2>
        <Form.Row {...rowKnobs()}>
          <Form.Fieldset {...fieldsetKnobs()}>
            <Form.Field>
              <Form.Label {...labelKnobs()}>{textExample}</Form.Label>
              <input id="example-1" placeholder="Инпут" />
            </Form.Field>
          </Form.Fieldset>
          <Form.Field>
            <Form.Label htmlFor="example-2">example-2</Form.Label>
            <input id="example-2" placeholder="Инпут" />
          </Form.Field>
        </Form.Row>
      </Form>
    );
  });

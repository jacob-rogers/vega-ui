import React from 'react';
import { Button } from '@gpn-design/uikit/Button';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import { Form } from './Form';

import './Form.stories.css';

storiesOf('ui/Form', module).add('interactive', () => {
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
              <Form.Label htmlFor="example-7" className="labelFirst" inline>
                Лейбл
              </Form.Label>
              <input className="inputFirst" placeholder="Средний" />
            </Form.Field>
            <Form.Field>
              <input id="example-7" placeholder="Маленький" />
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
});

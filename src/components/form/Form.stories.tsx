import React from 'react';
import { css } from '@emotion/core';
import { action } from '@storybook/addon-actions';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { Button } from '../button';
import { TextField } from '../text-field';

import { Form } from './Form';

const cssRowFirst = css`
  margin-top: 20px;
  padding: 10px 0;
`;

const cssRowSecond = css`
  grid-column-gap: var(--space-xl);
  grid-row-gap: var(--space-xl);
`;

const cssFieldFirst = css`
  grid-column: 1 / 5;
`;

const cssFieldSecond = css`
  grid-column: 1 / 4;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const cssLabelFirst = css`
  margin-right: 10px;
`;

const cssButton = css`
  margin-top: 20px;
`;

const cssTitle = css`
  color: var(--color-typo-primary);
  margin: 0;
  padding: var(--space-xs) 0;
`;

const KNOB_GROUPS = {
  row: 'Form.Row',
  label: 'Form.Label',
  fieldset: 'Form.Fieldset',
};

const rowKnobs = (): React.ComponentProps<typeof Form.Row> => ({
  gap: select('gap', ['xs', 's', 'm', 'l', 'xl', 'none'], 'm', KNOB_GROUPS.row),
  space: select('space', ['xs', 's', 'm', 'l', 'xl', 'none'], 'm', KNOB_GROUPS.row),
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
  .addParameters({
    metadata: {
      author: 'CSSSR',
      status: 'Approved',
      link: {
        href:
          'https://github.com/gpn-prototypes/vega-ui/blob/master/packages/components/form/README.md',
        text: 'Документация',
      },
    },
  })
  .add('по умолчанию', () => {
    const submitAction = action('Form submitted');

    return (
      <Form
        className="custom-classname"
        onSubmit={(e: React.FormEvent): void => {
          e.preventDefault();
          submitAction(e);
        }}
      >
        <h2 css={cssTitle}>Пример формы</h2>
        <Form.Row>
          <Form.Field>
            <Form.Label htmlFor="example-1">Просто лейбл</Form.Label>
            <TextField width="full" id="example-4" placeholder="Просто лейбл" />
          </Form.Field>
        </Form.Row>
        <Form.Row space="xl" gap="none">
          <Form.Label htmlFor="example-4">C одним лейблом, но много инпутов</Form.Label>
          <Form.Row col="3" space="none">
            <Form.Field>
              <TextField width="full" id="example-4" placeholder="C одним лейблом" />
            </Form.Field>
            <Form.Field>
              <TextField width="full" placeholder="C одним лейблом" />
            </Form.Field>
            <Form.Field>
              <TextField width="full" placeholder="C одним лейблом" />
            </Form.Field>
          </Form.Row>
        </Form.Row>
        <Form.Row col="3">
          <Form.Field>
            <Form.Label htmlFor="example-1">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos accusantium
              similique explicabo cum nostrum odio suscipit. Voluptas quos atque modi minus, impedit
              facere, mollitia excepturi doloremque porro ipsam dolore.
            </Form.Label>
            <TextField width="full" id="example-1" placeholder="C множеством лейблов" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="example-2">C множеством лейблов</Form.Label>
            <TextField width="full" id="example-2" placeholder="C множеством лейблов" />
          </Form.Field>
          <Form.Field>
            <Form.Label htmlFor="example-3">C множеством лейблов</Form.Label>
            <TextField width="full" id="example-3" placeholder="C множеством лейблов" />
          </Form.Field>
        </Form.Row>
        <Form.Row gap="none">
          <Form.Label htmlFor="example-5">C одним лейблом и инпуты</Form.Label>
          <Form.Row col="2" space="none">
            <Form.Field>
              <TextField width="full" id="example-5" placeholder="C одним лейблом и инпуты" />
            </Form.Field>
            <Form.Field>
              <TextField width="full" placeholder="C одним лейблом и инпуты" />
            </Form.Field>
            <Form.Field>
              <TextField width="full" placeholder="C одним лейблом и инпуты" />
            </Form.Field>
          </Form.Row>
        </Form.Row>
        <Form.Row gap="none" css={cssRowFirst}>
          <Form.Fieldset>
            <Form.Label htmlFor="example-6">Подмешанные классы в компоненты</Form.Label>
            <Form.Row col="4" space="none" css={cssRowSecond}>
              <Form.Field css={cssFieldFirst}>
                <TextField width="full" id="example-6" placeholder="Большой" />
              </Form.Field>
              <Form.Field css={cssFieldSecond}>
                <Form.Label htmlFor="example-7" css={cssLabelFirst} space="none">
                  Лейбл
                </Form.Label>
                <TextField width="full" id="example-7" placeholder="Средний" />
              </Form.Field>
              <Form.Field>
                <TextField width="full" id="example-8" placeholder="Маленький" />
              </Form.Field>
            </Form.Row>
          </Form.Fieldset>
        </Form.Row>
        <Form.Row gap="none">
          <Form.Row col="2" space="none">
            <Form.Fieldset>
              <Form.Legend>Чекбоксы</Form.Legend>
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
              <Form.Legend>Чекбоксы выключим в Fieldset</Form.Legend>
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
        <Button type="submit" label="Отправить" css={cssButton} />
      </Form>
    );
  })
  .add('playground', () => {
    const submitAction = action('Form submitted');
    const textExample = text('example text', 'example-1');

    return (
      <Form
        onSubmit={(e: React.FormEvent): void => {
          e.preventDefault();
          submitAction(e);
        }}
      >
        <h2 css={cssTitle}>Пример формы</h2>
        <Form.Row {...rowKnobs()}>
          <Form.Fieldset {...fieldsetKnobs()}>
            <Form.Field>
              <Form.Label {...labelKnobs()}>{textExample}</Form.Label>
              <TextField width="full" id="example-1" placeholder="example-1" />
            </Form.Field>
          </Form.Fieldset>
          <Form.Field>
            <Form.Label htmlFor="example-2">example-2</Form.Label>
            <TextField width="full" id="example-2" placeholder="example-2" />
          </Form.Field>
        </Form.Row>
        <Button type="submit" label="Отправить" css={cssButton} />
      </Form>
    );
  });

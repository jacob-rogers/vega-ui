import React from 'react';
import * as tl from '@testing-library/react';

import { Form } from './Form';

describe('Form', () => {
  describe('Form', () => {
    type Props = Partial<React.ComponentProps<typeof Form>>;

    const renderForm = (props: Props = {}): tl.RenderResult => tl.render(<Form {...props} />);

    it('рендерится без ошибок', () => {
      expect(renderForm).not.toThrow();
    });
  });

  describe('Field', () => {
    type Props = Partial<React.ComponentProps<typeof Form.Field>>;

    const renderField = (props: Props = {}): tl.RenderResult =>
      tl.render(<Form.Field {...props} />);

    it('рендерится без ошибок', () => {
      expect(renderField).not.toThrow();
    });
  });

  describe('Fieldset', () => {
    type Props = Partial<React.ComponentProps<typeof Form.Fieldset>>;

    const renderFieldset = (props: Props = {}): tl.RenderResult =>
      tl.render(<Form.Fieldset {...props} />);

    it('рендерится без ошибок', () => {
      expect(renderFieldset).not.toThrow();
    });
  });

  describe('Row', () => {
    type Props = Partial<React.ComponentProps<typeof Form.Row>>;

    const renderRow = (props: Props = {}): tl.RenderResult => tl.render(<Form.Row {...props} />);

    it('рендерится без ошибок', () => {
      expect(renderRow).not.toThrow();
    });
  });

  describe('Label', () => {
    type Props = Partial<React.ComponentProps<typeof Form.Label>>;

    const renderLabel = (props: Props = {}): tl.RenderResult =>
      tl.render(<Form.Label {...props} />);

    it('рендерится без ошибок', () => {
      expect(renderLabel).not.toThrow();
    });
  });
});

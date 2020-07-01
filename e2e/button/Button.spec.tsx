import React from 'react';
import { Button } from '@gpn-prototypes/vega-button';

describe('Button', () => {
  describe('primary view', () => {
    test('default', async () => {
      await renderPage({ component: <Button label="Hello" view="primary" /> });
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot();
    });
    test('default hover', async () => {
      const selector = '[data-testid="button-test-id"]';
      await renderPage({
        component: <Button label="Hello" view="primary" data-testid="button-test-id" />,
      });

      await page.hover('[data-testid="button-test-id"]');

      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot();
    });
    // test('default focus', async () => {
    //   const selector = '[data-testid="button-test-id"]';
    //   await renderPage({
    //     component: <Button label="Hello" view="primary" data-testid="button-test-id" />,
    //   });

    //   await page.focus(selector);
    //   await page.waitForSelector(selector);

    //   const image = await page.screenshot();
    //   expect(image).toMatchImageSnapshot();
    // });
  });

  describe('secondary view', () => {
    test('default', async () => {
      await renderPage({ component: <Button label="Hello" view="secondary" /> });
      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot();
    });
    test('default hover', async () => {
      await renderPage({
        component: <Button label="Hello" view="secondary" data-testid="button-test-id" />,
      });

      await page.hover('[data-testid="button-test-id"]');

      const image = await page.screenshot();
      expect(image).toMatchImageSnapshot();
    });
  });
});

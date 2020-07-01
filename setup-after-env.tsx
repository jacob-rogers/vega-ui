import React from 'react';
import ReactDOM from 'react-dom';
import { presetGpnDark, Theme } from '@gpn-prototypes/vega-theme';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

import 'expect-puppeteer';

expect.extend({ toMatchImageSnapshot });

beforeAll(async () => {
  await page.goto(`file://${process.cwd()}/tests/index.html`);
  await page.addStyleTag({ path: `${process.cwd()}/tests/dist/main.css` });
});

global.renderPage = async ({ component }) => {
  const node = <Theme preset={presetGpnDark}>{component}</Theme>;
  // const html = ReactDOMServer.renderToString(node);
  await page.$$eval('#root', (root) => ReactDOM.render(node, root));

  // await page.evaluate((innerHTML) => {
  //   document.querySelector('#root')!.innerHTML = innerHTML;
  // }, html);
};

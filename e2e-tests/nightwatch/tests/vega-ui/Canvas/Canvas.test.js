const { beginItemCoordinates, endItemCoordinates } = require('./data');

const storyURL = `/iframe.html?id=ui-canvas--%D0%BF%D0%BE-%D1%83%D0%BC%D0%BE%D0%BB%D1%87%D0%B0%D0%BD%D0%B8%D1%8E`;

testcase('открывается canvas', () => {
  step('переходим в story с canvas', () => {
    browser.url(`${browser.launchUrl}${storyURL}`);
  });

  expected('ожидаем увидеть canvas', () => {
    browser.waitForElementPresent('.VegaCanvas', 2000);
    browser.assert.screenshotElement(
      '.VegaCanvas',
      'дефолтный канвас'
    );
  });
});


testcase('элемент изменяет свое положение', () => {
  step('переходим в story с canvas', () => {
    browser.url(`${browser.launchUrl}${storyURL}`);
  });

  step('берем за элемент "начало"', () => {
    browser.waitForElementPresent('.VegaCanvas', 2000);
    browser.moveToElement('.VegaCanvas', beginItemCoordinates.x + 5, beginItemCoordinates.y + 5);
    browser.mouseButtonDown(0);
  });

  step('перемещаем и отпускаем элемент "начало"', () => {
    browser.moveToElement('.VegaCanvas', 60, 500);
    browser.mouseButtonUp(0).pause(500);
  });

  expected('элемент поменял свое положение', () => {
    browser.assert.screenshotElement(
      '.VegaCanvas',
      'элемент на канвасе меняет свое положение'
    );
  })
});


testcase('линия магнитится к элементу', () => {
  step('переходим в story с canvas', () => {
    browser.url(`${browser.launchUrl}${storyURL}`);
  });

  step('берем за элемент "начало"', () => {
    browser.waitForElementPresent('.VegaCanvas', 2000);
    browser.moveToElement('.VegaCanvas', beginItemCoordinates.x + 75, beginItemCoordinates.y + 14);
    browser.mouseButtonDown(0);
  });

  step('тянем линию к элементу "конец"', () => {
    browser.moveToElement('.VegaCanvas', endItemCoordinates.x + 10, endItemCoordinates.y + 14);
  });

  expected('линия примагнитилась к элементу "конец"', () => {
    browser.assert.screenshotElement(
      '.VegaCanvas',
      'линия магнитится к элементу на канвасе'
    );
  })
});

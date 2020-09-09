testcase('открывается canvas', () => {
  step('переходим в story с canvas', () => {
    browser.url(`${browser.launch_url}/iframe.html?id=ui-canvas--%D0%BF%D0%BE-%D1%83%D0%BC%D0%BE%D0%BB%D1%87%D0%B0%D0%BD%D0%B8%D1%8E`);
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
    browser.url(`${browser.launch_url}/iframe.html?id=ui-canvas--%D0%BF%D0%BE-%D1%83%D0%BC%D0%BE%D0%BB%D1%87%D0%B0%D0%BD%D0%B8%D1%8E`);
  });

  step('берем за элемент "начало"', () => {
    browser.waitForElementPresent('.VegaCanvas', 2000);
    browser.moveToElement('.VegaCanvas', 15, 305, (result) => {
      console.log(result)
    });
    browser.mouseButtonDown(0);
  });

  step('перемещаем и отпускаем элемент "начало"', () => {
    browser.moveToElement('.VegaCanvas', 60, 500);
    browser.mouseButtonUp(0).pause(1000);
  });

  expected('элемент поменял свое положение', () => {
    browser.assert.screenshotElement(
      '.VegaCanvas',
      'элемент на канвасе меняет свое положение'
    );
  })
});

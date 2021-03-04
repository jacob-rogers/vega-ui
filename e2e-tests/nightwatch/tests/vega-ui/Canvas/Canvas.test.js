const storyURL = `/iframe.html?id=ui-canvas--%D0%BF%D0%BE-%D1%83%D0%BC%D0%BE%D0%BB%D1%87%D0%B0%D0%BD%D0%B8%D1%8E`

const getCanvasData = (cb) => {
  browser.execute(
    function () {
      return localStorage.getItem('treeState')
    },
    (result) => {
      cb(JSON.parse(result.value))
    }
  )
}

const getLabelSelector = (label) => `[aria-label="${label}"]`

testcase('открывается canvas', () => {
  step('переходим в story с canvas', () => {
    browser.url(`${browser.launchUrl}${storyURL}`)
  })

  expected('ожидаем увидеть canvas', () => {
    browser.waitForElementPresent('.VegaCanvas', 2000)
    browser.assert.screenshotElement('.VegaCanvas', 'дефолтный канвас')
  })
})

testcase('элемент изменяет свое положение', () => {
  step('переходим в story с canvas', () => {
    browser.url(`${browser.launchUrl}${storyURL}`)
  })

  step('перемещаем элемент "начало"', () => {
    getCanvasData((data) => {
      const beginElement = data.find((el) => el.data.type === 'root')

      browser.moveToElement(
        '.VegaCanvas',
        beginElement.data.position.x + 15,
        beginElement.data.position.y + 16
      )
      browser.mouseButtonDown(0)
      browser.moveToElement('.VegaCanvas', 60, 500)
      browser.mouseButtonUp(0).pause(500)
    })
  })

  expected('элемент поменял свое положение', () => {
    browser.assert.screenshotElement(
      '.VegaCanvas',
      'элемент на канвасе меняет свое положение'
    )
  })
})

testcase('линия магнитится к элементу', () => {
  step('переходим в story с canvas', () => {
    browser.url(`${browser.launchUrl}${storyURL}`)
  })

  step('берем за элемент "начало" и тянем к элементу "конец"', () => {
    getCanvasData((data) => {
      const beginElement = data.find((el) => el.data.type === 'root')
      const endElement = data.find((el) => el.data.type === 'end')

      browser.moveToElement(
        '.VegaCanvas',
        beginElement.data.position.x + 75,
        beginElement.data.position.y + 16
      )
      browser.mouseButtonDown(0)
      browser.moveToElement(
        '.VegaCanvas',
        endElement.data.position.x + 50,
        endElement.data.position.y + 15
      )
      browser.mouseButtonUp(0).pause(500)
    })
  })

  expected('линия примагнитилась к элементу "конец"', () => {
    browser.assert.screenshotElement(
      '.VegaCanvas',
      'линия магнитится к элементу на канвасе'
    )
  })
})

testcase('удаление элемента', () => {
  step('переходим в story с canvas', () => {
    browser.url(`${browser.launchUrl}${storyURL}`)
  })

  step('выделяем элемент', () => {
    getCanvasData((data) => {
      const beginElement = data.find((el) => el.data.type === 'root')
      browser.moveToElement(
        '.VegaCanvas',
        beginElement.data.position.x + 75,
        beginElement.data.position.y + 16
      )
      browser.mouseButtonClick(0)
    })
  })

  step('нажимаем на backspace', () => {
    browser.keys('\uE003', () => {
      browser.pause(2000)
    })
  })

  expected('элемент удалился', () => {
    browser.assert.screenshotElement('.VegaCanvas', 'элемент удаляется')
  })
})

testcase('добавление шага', () => {
  step('переходим в story с canvas', () => {
    browser.url(`${browser.launchUrl}${storyURL}`)
  })

  step('нажимаем на дропдаун с выбором типа нового шага', () => {
    const selector = getLabelSelector('Создание элементов')
    browser.waitForElementPresent(selector)
    browser.click(selector)
  })

  step('выбираем тип шага', () => {
    const selector = getLabelSelector('Шаг')
    browser.waitForElementPresent(selector)
    browser.click(selector)
  })

  expected('добавлен новый шаг', () => {
    browser.assert.screenshotElement('.VegaCanvas', 'добавлен новый шаг')
  })
})

testcase('срабатывает выделение элементов', () => {
  step('переходим в story с canvas', () => {
    browser.url(`${browser.launchUrl}${storyURL}`)
  })

  step('удерживая левую кнопку мыши выделяем элементы', () => {
    browser
      .moveToElement('.VegaCanvas', 100, 100)
      .mouseButtonDown(0)
      .moveToElement('.VegaCanvas', 1000, 700)
  })

  expected('отобразилась область выделения', () => {
    browser.assert.screenshotElement(
      '.VegaCanvas',
      'отобразилась область выделения'
    )
  })

  step('отпускаем кнопку мыши', () => {
    browser.mouseButtonUp(0)
  })

  expected('элементы выделяются', () => {
    browser.assert.screenshotElement('.VegaCanvas', 'элементы выделяются')
  })
})

testcase('срабатывает бесконечная прокрутка', () => {
  step('переходим в story с canvas', () => {
    browser.url(`${browser.launchUrl}${storyURL}`)
  })

  step('меняем режим на "Перемещение по полотну"', () => {
    const selector = getLabelSelector('Перемещение по полотну')
    browser.waitForElementPresent(selector).click(selector)
  })

  step('удерживая левую кнопку мыши прокручиваем полотно', () => {
    browser.moveToElement('.VegaCanvas', 100, 100)
    browser.mouseButtonDown(0).moveToElement('.VegaCanvas', 400, 100)
  })

  expected('полотно прокрутилось', () => {
    browser.assert.screenshotElement('.VegaCanvas', 'бесконечная прокрутка')
  })
})

testcase('удаление нескольких элементов', () => {
  step('переходим в story с canvas', () => {
    browser.url(`${browser.launchUrl}${storyURL}`)
  })

  step('выделяем несколько элементов', () => {
    browser
      .moveToElement('.VegaCanvas', 100, 100)
      .mouseButtonDown(0)
      .moveToElement('.VegaCanvas', 1000, 700)
      .mouseButtonUp(0);
  });

  step('нажимаем Backspace', () => {
    browser.keys('\uE003', () => {
      browser.pause(2000)
    })
  })

  expected('элементы удаляются', () => {
    browser.assert.screenshotElement('.VegaCanvas', 'удаление нескольких элементов');
  })
})

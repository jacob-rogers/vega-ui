# Публикация пакетов

Для публикации и управления версиями пакетов используется [lerna](https://lerna.js.org/). Подробнее о [работе lerna](lerna.md)
Пакеты являются публичными и публикуются в [Github-реджистри](https://npm.pkg.github.com).

Скоуп пакетов — [@gpn-prototypes](https://github.com/orgs/gpn-prototypes/packages).

Примеры пакетов: `@gpn-prototypes/vega-hooks`, `@gpn-prototypes/vega-ui`, `@gpn-prototypes/vega-modal`

## Пакет с пакетами и отдельные пакеты

В библиотеке есть возможность устанавливать:

-   Отдельные пакеты, например `@gpn-prototypes/vega-modal`.
-   Библиотеку целиком, если будут использоваться все или большинство компонентов из нее. Для этого есть «пакет с пакетами» — `@gpn-prototypes/vega-ui`.

Наличие такого «пакета с пакетами» требует соблюдения четкой иерархии директорий. Пакет с пакетами должен содержать внутренние пакеты внутри себя, иначе lerna не может его корректно версионировать.

![](http://s.csssr.ru/U02GZ926T/2020-05-15-1511-aenyraj433.jpg)

Пока что при сборке пакетов создается папка `dist` на том же уровне, что и другие пакеты. Со временем постараемся решить эту проблему и спрятать внутренности пакета с пакетами.

## До публикации

Чтобы все сработало, как часы, необходимо сделать следующее:

-   Оформить коммиты по [правилам](commits-style.md)
-   [Отправить PR](pr-style.md)
-   [Пройти ревью](review.md)
-   [Пройти тестирование](qa-flow.md)

## Публикация

Опубликовать пакет можно с помощью Github Actions или вручную. При публикации происходит загрузка новых версий пакетов в Github-реджистри.

### Github Actions

Запускается автоматически при пуше в мастер или в релизную ветку. [Конфигурация](../.github/workflows/publish.yml).

Происходят следующие действия:

1.  `yarn` устанавливает зависимости
2.  `lerna` поднимает [версии измененных пакетов](lerna.md)
3.  `lerna` создает теги релизов в GitHub
4.  `lerna` пушит обновленные пакеты в Github-реджистри и коммит с поднятием версии в `master`

### Вручную

Необходимо сделать то же, что и CI, но вручную:

1.  Сгенерировать токен: <https://github.com/settings/tokens> → Generate new token

2.  Авторизоваться в Github-реджистри через npm:

    ```bash
    $ npm login --registry=https://npm.pkg.github.com`
    > Username: USERNAME
    > Password: TOKEN
    > Email: PUBLIC-EMAIL-ADDRESS
    ```

3.  Перейти в ветку `master` локально.

4.  Поднять версии пакетов с помощью `lerna` и создать git-теги с релизами
    yarn lerna version --conventional-commits --allow-branch=master --no-commit-hooks --no-push --create-release github

5.  Поднять версии у всех пакетов, даже если они не менялись в git. Действие актуально при изменении сборки.
    yarn lerna version --conventional-commits --allow-branch=master --no-commit-hooks --no-push --create-release github --force-publish\`

6.  Запустить публикацию пакетов с помощью `lerna`
    yarn lerna publish from-git --yes --registry <https://npm.pkg.github.com/gpn-prototypes>

7.  Запушить коммит и теги в мастер.
    git push origin master --follow-tags

Lerna запушит обновленные пакеты в Github-реджистри и коммит с поднятием версии в `master`

## После публикации

Пакеты становятся доступны публично, привязываются к организации [gpn-prototypes](https://github.com/orgs/gpn-prototypes/packages) и репозиторию [gpn-prototypes/vega-ui](https://github.com/gpn-prototypes/vega-ui/packages).

_Внимание!_ На данный момент пакеты публикуются только в Github-реджистри, а в npm-реджистри нет. Это значит, что через `npm` нельзя их установить, не [указав откуда их нужно скачивать](package-installation.md).

## CHANGELOG

При публикации через Github Actions автоматически обновляется `CHANGELOG.md`. Сведения об изменениях берутся из PR, которые изменяли какие-либо внутренние пакеты.
Корневой `CHANGELOG.md` создается для пакета `@gpn-prototypes/vega-ui`. История изменений дочерних пакетов находится в директории этих пакетов, файле `CHANGELOG.md`.

# Особенности настройки проекта под Windows

## Windows Subsystem for Linux (WSL)

Наиболее предпочтительным вариантом для разработки будет использование [WSL](https://docs.microsoft.com/ru-ru/windows/wsl/about). Так вы получите все преимущества Unix-систем непосредственно из Windows.

[Инструкция по установке WSL](https://docs.microsoft.com/ru-ru/windows/wsl/install-win10).

## Bash

Некоторые скрипты для разработки требуют команды из Unix-систем, поэтому для разработки необходимо использовать командную оболочку bash.

Оболочка устанавливается вместе с [Git for Windows](https://gitforwindows.org/). Для запуска необходимо перейти в каталог `%Путь до Git for windows%\bin\` и запустить **bash.exe**.

Эту оболочку можно интегрировать в [Windows Terminal](https://github.com/microsoft/terminal). Для этого внесите в настройки терминала:

    {
      "commandline" : "%Путь до Git for Windows%\\Git\\bin\\bash.exe",
      "icon" : "%Путь до Git for Windows%\\Git\\mingw64\\share\\git\\git-for-windows.ico",
      "name" : "Git Bash",
      "startingDirectory" : "%HOMEDRIVE%%HOMEPATH%"
    }

Так же можно использовать эмулятор консоли [Cmder](https://cmder.net/) c git for windows. Он позволяет запускать разные оболочки, в том числе bash, вкладки, деление экрана. [Статья по настройке](https://isqua.ru/blog/2016/11/05/nastroika-tierminala-cmder-v-windows/)

## Настройка CLI Git

После установки Git нужно ввести свои имя и адрес электронной почты. Для этого выполните в терминале следующие команды:

-   `git config --global user.name` "ваше имя"
-   `git config --global user.email` "ваш email адрес"

Обратите внимание, что в командах, указанных выше, есть опция `--global`. Это значит, что такие данные будут сохранены для всех ваших действий в Git и вводить их больше не надо. Если вы используете разную информацию о себе для разных проектов, то в директории проекта выполните эти команды без опции `--global`.

## Настройка lf/crlf в редакторе и в Git

Из-за конвертации переноса строк возникает большой diff, т.к. в `.editorconfig` задано использование unix-формата переноса строк.

Для избежания такой ситуации необходимо отключить автоматическую конвертацию строк командой `git config core.autocrlf false`

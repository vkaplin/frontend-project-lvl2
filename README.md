### Hexlet tests and linter status:
[![Actions Status](https://github.com/vkaplin/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/vkaplin/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/49d15d25ac9c636b5c42/maintainability)](https://codeclimate.com/github/vkaplin/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/49d15d25ac9c636b5c42/test_coverage)](https://codeclimate.com/github/vkaplin/frontend-project-lvl2/test_coverage)

## Вычислитель отличий
CLI программа позволяющая вычислить отличия между двумя файлами.
Поддерживаемые форматы файлов - json, yml, yaml.
Поддерфиваемый вывод результата сравнения - text, stylish, json.

## Установка
Установите Node.js последней версии в систему.
Склонируйте репозиторий. (git@github.com:vkaplin/frontend-project-lvl2.git)
Выполнить установку зависимостей (make install)
Запустить сравнение файлов

```
$ git clone git@github.com:vkaplin/frontend-project-lvl2.git)
$ cd frontend-project-lvl2
$ make install

```
## Описание работы программы

Вычислить различия можно с помощью команды gendiff [options] filepath1 filepath2

```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (stylish, plain, json) (default: "stylish")
  -h, --help           display help for command
```

### Примеры работы программы
Сравнение двух файлов json
https://asciinema.org/a/oT8FnGWYcwm7NFJQ1ygJESGAE

Сравнение двух файлов yml
https://asciinema.org/a/JfI02KsBuGhwP6ucpYiH7hwbf


#### Примеры форматирование вывода работы программы
Форматирование stylish
https://asciinema.org/a/ltjFMOAk8SHw6t9OdM4qyYfOh

Форматирование plan text
https://asciinema.org/a/QkpS7Qmg0ImqCbCSDUhVHvfXk

Форматирование json
https://asciinema.org/a/CjCgo6aXL1L6rXiwxZbcJGxN1
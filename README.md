# zce-cli

[![Build Status][travis-image]][travis-url]
[![Coverage Status][codecov-image]][codecov-url]
[![NPM Downloadss][downloads-image]][downloads-url]
[![NPM Version][version-image]][version-url]
[![License][license-image]][license-url]

[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

[travis-image]: https://img.shields.io/travis/zce/zce-cli.svg
[travis-url]: https://travis-ci.org/zce/zce-cli
[codecov-image]: https://img.shields.io/codecov/c/github/zce/zce-cli.svg
[codecov-url]: https://codecov.io/gh/zce/zce-cli
[downloads-image]: https://img.shields.io/npm/dm/zce-cli.svg
[downloads-url]: https://npmjs.org/package/zce-cli
[version-image]: https://img.shields.io/npm/v/zce-cli.svg
[version-url]: https://npmjs.org/package/zce-cli
[license-image]: https://img.shields.io/npm/l/zce-cli.svg
[license-url]: https://github.com/zce/zce-cli/blob/master/LICENSE
[dependency-image]: https://img.shields.io/david/zce/zce-cli.svg
[dependency-url]: https://david-dm.org/zce/zce-cli
[devdependency-image]: https://img.shields.io/david/dev/zce/zce-cli.svg
[devdependency-url]: https://david-dm.org/zce/zce-cli?type=dev
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: http://standardjs.com

> A very simple scaffolding CLI tool for myself

## Installation

```sh
$ yarn global add zce-cli

# or npm
$ npm i zce-cli -g
```

## Usage

```sh
# list available official templates
$ zce list

# generate a new project from a template
$ zce init <template-name> my-project
```

## Official Templates

> https://github.com/zce-templates

- [nm](https://github.com/zce-templates/nm) - Node module boilerplate
- [jekyll](https://github.com/zce-templates/jekyll) - Static site by Jekyll
- [webapp](https://github.com/zce-templates/webapp) - Modern web app
- [x-pages](https://github.com/zce-templates/x-pages) - Static site by x-pages
- [electron](https://github.com/zce-templates/electron) - Electron app

## TODOS

- [x] Init
- [x] CLI padding
- [x] List
- [x] Repo default
- [x] unit test
- [x] Coverage
- [ ] e2e test
- [ ] CLI docs
- [ ] Template docs
- [ ] CLI update notify
- [ ] Plugins

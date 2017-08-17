<h1 align="center">
  <a href="http://cli.zce.me"><img src="http://cli.zce.me/assets/logo.png" alt="zce-cli" height="380"></a>
</h1>
<p align="center">A scaffolding CLI tool for myself, inspired by vue-cli.</p>
<p align="center">
  <a href="https://travis-ci.org/zce/zce-cli"><img src="https://img.shields.io/travis/zce/zce-cli.svg" alt="Build Status"></a>
  <a href="https://codecov.io/gh/zce/zce-cli"><img src="https://img.shields.io/codecov/c/github/zce/zce-cli.svg" alt="Coverage Status"></a>
  <a href="https://npmjs.org/package/zce-cli"><img src="https://img.shields.io/npm/dm/zce-cli.svg" alt="NPM Downloads"></a>
  <a href="https://npmjs.org/package/zce-cli"><img src="https://img.shields.io/npm/v/zce-cli.svg" alt="NPM Version"></a>
  <a href="https://github.com/zce/zce-cli/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/zce-cli.svg" alt="License"></a>
  <br>
  <a href="https://david-dm.org/zce/zce-cli"><img src="https://img.shields.io/david/zce/zce-cli.svg" alt="Dependency Status"></a>
  <a href="https://david-dm.org/zce/zce-cli?type=dev"><img src="https://img.shields.io/david/dev/zce/zce-cli.svg" alt="devDependency Status"></a>
  <a href="http://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="Code Style"></a>
</p>

## Installation

```sh
$ yarn global add zce-cli

# or npm
$ npm i zce-cli -g
```

## Usage

```sh
# list available official templates
$ zce list [-s|--short] [--debug]

# generate a new project from a template
$ zce init <template-name> my-project [--offline] [--debug]
```

## Official Templates (WIP)

- [nm](https://github.com/zce-templates/nm) - Node module boilerplate
- [webapp](https://github.com/zce-templates/webapp) - Modern web app
- [react](https://github.com/zce-templates/react) - Modern web app by React.js
- [vue](https://github.com/zce-templates/vue) - Modern web app by Vue.js
- [jekyll](https://github.com/zce-templates/jekyll) - Static site by Jekyll
- [x-pages](https://github.com/zce-templates/x-pages) - Static site by x-pages
- [electron](https://github.com/zce-templates/electron) - Electron app

> more: https://github.com/zce-templates

## TODOS

- [x] Init
- [x] CLI padding
- [x] List
- [x] Repo default
- [x] unit test
- [x] Restructure test
- [x] Coverage
- [ ] e2e test
- [ ] Official Templates
- [ ] CLI docs
- [ ] Template docs
- [ ] CLI update notify
- [ ] Plugins

## License

[MIT](LICENSE) &copy; [汪磊](https://zce.me)

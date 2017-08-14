const path = require('path')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const inquirer = require('inquirer')
const helpers = require('./helpers')
const util = require('./util')

Handlebars.registerHelper(helpers)

const prompt = (source, target) => (files, metalsmith, next) => {
  const template = require(source)
  const metadata = metalsmith.metadata()

  const questions = Object.keys(template.prompts).map(key =>{
    const question = Object.assign({}, template.prompts[key], { name: key })

    // defaults
    if (!question.default) {
      switch (key) {
        case 'name':
          question.default = path.basename(target)
          break
        case 'author':
          // TODO: get default author from npmrc
          break
        case 'version':
          // TODO: get default version from npmrc
          break
        case 'repo':
        case 'repository':
          // TODO: get default repository from .git
          break
      }
    }

    return question
  })

  inquirer.prompt(questions).then(answers => {
    Object.assign(metadata, answers)
    next()
  })
}

const render = (source, target) => (files, metalsmith, next) => {
  const metadata = metalsmith.metadata()

  for (const item in files) {
    const contents = files[item].contents.toString()

    // do not attempt to render files that do not have mustaches
    if (!/{{([^{}]+)}}/g.test(contents)) continue

    const hbs = Handlebars.compile(contents)
    files[item].contents = Buffer.from(hbs(metadata))
  }

  next()
}

module.exports = (source, target) => new Promise((resolve, reject) => {
  Metalsmith(source)
    .clean(false)
    .source('template')
    .destination(target)
    .metadata({ generator: util.generator })
    .use(prompt(source, target))
    .use(render(source, target))
    .build(err => err ? reject(err) : resolve())
})

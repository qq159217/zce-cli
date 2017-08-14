const path = require('path')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const inquirer = require('inquirer')
const minimatch = require('minimatch')
const helpers = require('./helpers')
const util = require('./util')

Handlebars.registerHelper(helpers)

const prompt = context => (files, metalsmith, next) => {
  const metadata = metalsmith.metadata()

  const { prompts } = context.template

  const questions = Object.keys(prompts).map(key =>{
    const item = Object.assign({}, prompts[key], { name: key })

    // defaults
    if (!item.default) {
      switch (key) {
        case 'name':
          item.default = path.basename(context.target)
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

    return item
  })

  inquirer.prompt(questions).then(answers => {
    Object.assign(metadata, answers)
    next()
  })
}

const render = context => (files, metalsmith, next) => {
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

const filter = context => (files, metalsmith, next) => {
  const { filter } = context.template
  if (!filters) return next()

  const globs = Object.keys(filters)
  const filenames = Object.keys(files)

  filenames.forEach(name => {
    globs.forEach(glob => {
      if (globs[glob]())
      if (minimatch(name, glob, { dot: true })) {

      }
    })
  })
  next()
}

module.exports = context => new Promise((resolve, reject) => {
  context.template = require(context.source)

  Metalsmith(context.source)
    .clean(false)
    .source('template')
    .destination(context.target)
    .metadata({ generator: util.generator })
    .use(prompt(context))
    .use(filter(context))
    .use(render(context))
    .build(err => err ? reject(err) : resolve(context))
})

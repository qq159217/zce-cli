const chalk = require('chalk')
const Metalsmith = require('metalsmith')
const util = require('./util')
const prompt = require('./prompt')
const filter = require('./filter')
const template = require('./template')

module.exports = context => new Promise((resolve, reject) => {
  const { src, dest, name } = context

  context.package = require(src)

  const syncMetadata = (files, metalsmith, next) => {
    Object.assign(context, metalsmith.metadata())
    next()
  }

  Metalsmith(src)
    .metadata(context)
    .use(prompt)
    .use(filter)
    .use(template)
    .use(syncMetadata)
    .source(context.package.template || 'template')
    .destination(dest)
    .clean(false)
    .build((err, files, metalsmith) => {
      if (err) return reject(err)
      console.log(`\n🎉  "${name}" generated into ${chalk.yellow(util.tildify(dest))}`)
      resolve(context)
    })
})

const chalk = require('chalk')
const Metalsmith = require('metalsmith')
const util = require('./util')
const prompt = require('./prompt')
const filter = require('./filter')
const template = require('./template')

module.exports = context => new Promise((resolve, reject) => {
  const metadata = Object.assign(context, require(context.src))

  const syncMetadata = (files, metalsmith, next) => {
    Object.assign(metadata, metalsmith.metadata())
    next()
  }

  Metalsmith(metadata.src)
    .metadata(metadata)
    .use(prompt)
    .use(filter)
    .use(template)
    .use(syncMetadata)
    .source('template')
    .destination(metadata.dest)
    .clean(false)
    .build((err, files, metalsmith) => {
      if (err) return reject(err)
      console.log(`\n🎉  "${metadata.name}" generated into ${chalk.yellow(util.tildify(metadata.dest))}`)
      resolve(metadata)
    })
})

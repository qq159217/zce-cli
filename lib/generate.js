const path = require('path')
const chalk = require('chalk')
const Metalsmith = require('metalsmith')
const util = require('./util')
const prompt = require('./prompt')
const filter = require('./filter')
const render = require('./render')

module.exports = (src, dest) => new Promise((resolve, reject) => {
  const name = path.basename(dest)
  const metadata = Object.assign({ name, src, dest }, require(src))

  const syncMetadata = (files, metalsmith, next) => {
    Object.assign(metadata, metalsmith.metadata())
    next()
  }

  Metalsmith(src)
    .metadata(metadata)
    .use(prompt)
    .use(filter)
    .use(render)
    .use(syncMetadata)
    .source('template')
    .destination(dest)
    .clean(false)
    .build((err, files, metalsmith) => {
      if (err) return reject(err)
      console.log(`\n🎉  "${name}" generated into ${chalk.yellow(util.tildify(dest))}\n`)
      resolve(metadata)
    })
})

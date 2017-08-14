const Metalsmith = require('metalsmith')
const prompt = require('./prompt')
const filter = require('./filter')
const render = require('./render')

module.exports = (src, dest) => new Promise((resolve, reject) => {
  const metadata = Object.assign({ src, dest }, require(src))

  Metalsmith(src)
    .metadata(metadata)
    .use(prompt)
    .use(filter)
    .use(render)
    .source('template')
    .destination(dest)
    .clean(false)
    .build(err => err ? reject(err) : resolve(metadata))
})

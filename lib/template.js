const hbs = require('./hbs')

module.exports = (files, metalsmith, next) => {
  const context = metalsmith.metadata()
  const { helpers } = context.package

  helpers && hbs.registerHelper(helpers)

  for (const item in files) {
    let contents = files[item].contents.toString()
    contents = hbs.render(contents, context.answers, context)
    files[item].contents = Buffer.from(contents)
  }

  next()
}

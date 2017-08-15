const hbs = require('./hbs')

module.exports = (files, metalsmith, next) => {
  const metadata = metalsmith.metadata()
  const { helpers } = metadata
  helpers && hbs.registerHelper(helpers)
  for (const item in files) {
    files[item].contents = Buffer.from(hbs.render(files[item].contents.toString(), metadata))
  }
  next()
}

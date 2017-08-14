const Handlebars = require('handlebars')

module.exports = (files, metalsmith, next) => {
  const metadata = metalsmith.metadata()
  const { helpers } = metadata

  Handlebars.registerHelper(Object.assign(require('./helpers'), helpers))

  for (const item in files) {
    const contents = files[item].contents.toString()

    // do not attempt to render files that do not have mustaches
    if (!/{{([^{}]+)}}/g.test(contents)) continue

    const hbs = Handlebars.compile(contents, { noEscape: true })
    files[item].contents = Buffer.from(hbs(metadata))
  }

  next()
}

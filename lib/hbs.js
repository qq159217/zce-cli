const Handlebars = require('handlebars')
const helpers = require('./helpers')

Handlebars.registerHelper(helpers)

exports.registerHelper = Handlebars.registerHelper.bind(Handlebars)

exports.render = (template, context) => {
  // do not attempt to render files that do not have mustaches
  if (!/{{([^{}]+)}}/g.test(template)) return template

  return Handlebars.compile(template, { noEscape: true })(context)
}

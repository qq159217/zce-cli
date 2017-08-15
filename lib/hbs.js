const Handlebars = require('handlebars')
const helpers = require('./helpers')

Handlebars.registerHelper(helpers)

exports.registerHelper = Handlebars.registerHelper.bind(Handlebars)

exports.render = (template, data, context) => {
  // do not attempt to render files that do not have mustaches
  if (!/{{([^{}]+)}}/g.test(template)) return template

  const handlebars = Handlebars.compile(template, {
    noEscape: true,
    strict: context.debug
  })

  return handlebars(data, { data: context })
}

const Handlebars = require('handlebars')
const helpers = require('./helpers')

Handlebars.registerHelper(helpers)

let options = {}

exports.setOptions = context => {
  options = context
}

exports.registerHelper = Handlebars.registerHelper.bind(Handlebars)

/**
 * Render a mustache string as handlebars template
 * @param  {String} template Mustache string
 * @param  {Object} data     Template data
 * @return {String}          Render result
 */
exports.render = (template, data) => {
  // do not attempt to render files that do not have mustaches
  if (!/{{([^{}]+)}}/g.test(template)) return template

  const handlebars = Handlebars.compile(template, {
    strict: options.debug,
    noEscape: true
  })

  return handlebars(data, { data: options })
}

const Handlebars = require('handlebars')

let options = {}

Handlebars.registerHelper({
  equal: (a, b, opts) => a === b ? opts.fn(this) : opts.inverse(this),
  unequal: (a, b, opts) => a !== b ? opts.fn(this) : opts.inverse(this)
})

/**
 * Set options
 */
exports.setOptions = opts => { options = opts }

/**
 * Register helper
 */
exports.registerHelper = Handlebars.registerHelper.bind(Handlebars)

/**
 * Render a mustache string as handlebars template
 * @param  {String} template Mustache string
 * @param  {Object} data     Template data
 * @return {String}          Render result
 */
exports.render = (template, data) => {
  // ignore files that do not have mustaches
  if (!/{{([^{}]+)}}/g.test(template)) return template

  const handlebars = Handlebars.compile(template, {
    strict: options.debug,
    noEscape: true
  })

  return handlebars(data, { data: options })
}

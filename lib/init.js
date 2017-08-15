const inquirer = require('inquirer')
const hbs = require('../lib/hbs')
const util = require('../lib/util')
const fetch = require('../lib/fetch')
const generate = require('../lib/generate')

/**
 * Check destination path exists
 */
const checkDestExists = context => {
  /**
   * Destination path exists
   * @type {Boolean}
   */
  context.exists = util.pathExists(context.dest)
  if (!context.exists) return Promise.resolve({ ok: true })

  // prompt when dest exist
  console.log()
  return inquirer.prompt({
    name: 'ok',
    type: 'confirm',
    message: context.inPlace
      ? 'Generate project in current directory?'
      : 'Target directory exists. Continue?'
  })
}

module.exports = context => {
  checkDestExists(context)
    // fetch template path
    .then(answer => {
      /**
       * Sure go on
       * @type {Boolean}
       */
      context.sure = answer.ok

      if (!context.sure) throw new Error('You have to cancel the init task.')

      return util.isLocalPath(context.template)
        // local
        ? util.getTemplatePath(context.template)
        // remote
        : fetch(context)
    })

    // generate by template
    .then(source => {
      /**
       * Template source path
       * @type {String}
       */
      context.src = source

      if (!context.src) throw new Error('Template is not found.')

      return generate(context)
    })

    // response
    .then(context => {
      const { complete } = context.package

      if (typeof complete === 'function') {
        console.log()
        complete(context)
      } else if (typeof complete === 'string') {
        console.log()
        console.log(hbs.render(complete, context.answers, context))
      }

      console.log()
    })

    // catch error
    .catch(err => {
      console.error(`\n😞  ${err.message}`)

      context.debug && console.error('\n', err)

      console.log()
      process.exit()
    })
}

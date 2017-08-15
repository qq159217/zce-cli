#!/usr/bin/env node

const path = require('path')
const chalk = require('chalk')
const program = require('commander')
const init = require('../lib/init')

program
  .usage('<template> [project]')
  .option('--offline', 'use cached template')
  .option('--debug', 'debug mode')
  .on('--help', () => {
    console.log()
    console.log('  Examples:')
    console.log()
    console.log(chalk.gray('    # create a new project with an official template'))
    console.log('    $ zce init nm my-project')
    console.log()
    console.log(chalk.gray('    # create a new project straight from a github template'))
    console.log('    $ zce init <username>/<repo> my-project')
    console.log()
  })
  .parse(process.argv)
  .args.length || program.help()

const dest = path.resolve(program.args[1] || '.')

const context = {
  /**
   * Destination path
   * @type {String}
   */
  dest: dest,
  /**
   * Name
   * @type {String}
   */
  name: path.basename(dest),
  /**
   * Template name
   * @type {String}
   */
  template: program.args[0],
  /**
   * Current in place
   * @type {Boolean}
   */
  inPlace: dest === process.cwd(),
  /**
   * Offline mode
   * @type {Boolean}
   */
  offline: program.offline,
  /**
   * Debug mode
   * @type {Boolean}
   */
  debug: program.debug
}

init(context)

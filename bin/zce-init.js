#!/usr/bin/env node

const path = require('path')
const chalk = require('chalk')
const program = require('commander')
const inquirer = require('inquirer')
const util = require('../lib/util')
const logger = require('../lib/logger')
const fetch = require('../lib/fetch')
const generate = require('../lib/generate')

program
  .usage('<template> [project]')
  .option('--offline', 'use cached template')
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

const [ template, project ] = program.args
const target = path.resolve(project || '.')

util.pathExists(target)
  .then(exists => {
    if (!exists) return { ok: true }
    return inquirer.prompt({
      name: 'ok',
      type: 'confirm',
      message: target === process.cwd()
        ? 'Generate project in current directory?'
        : 'Target directory exists. Continue?'
    })
  })
  .then(answer => {
    if (!answer.ok) throw new Error('You chose to cancel.')
    return util.pathLocally(template)
      ? util.getTemplatePath(template)
      : fetch(template, program.offline)
  })
  .then(source => generate(source, target))
  .catch(err => {
    logger.error(err)
    process.exit()
  })

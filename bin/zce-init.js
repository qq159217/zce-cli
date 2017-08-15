#!/usr/bin/env node

const path = require('path')
const chalk = require('chalk')
const program = require('commander')
const inquirer = require('inquirer')
const util = require('../lib/util')
const fetch = require('../lib/fetch')
const generate = require('../lib/generate')
const hbs = require('../lib/hbs')

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
const name = path.basename(target)
const inPlace = target === process.cwd()

util.pathExists(target)
  .then(exists => {
    if (!exists) return { ok: true }
    console.log()
    return inquirer.prompt({
      name: 'ok',
      type: 'confirm',
      message: inPlace ? 'Generate project in current directory?' : 'Target directory exists. Continue?'
    })
  })
  .then(answer => {
    if (!answer.ok) throw new Error('You have to cancel the init task.')
    return util.pathLocally(template) ? util.getTemplatePath(template) : fetch(template, program.offline)
  })
  .then(source => {
    if (!source) throw new Error('Template is not found.')
    return generate({ name: name, src: source, dest: target, inPlace: inPlace })
  })
  .then(metadata => {
    if (typeof metadata.complete === 'function') {
      console.log()
      metadata.complete(metadata)
    } else if (typeof metadata.complete === 'string') {
      console.log()
      console.log(hbs.render(metadata.complete, metadata))
    }
    console.log()
  })
  .catch(err => {
    console.error(`\n😞  ${err.message}\n`)
    if (process.env.NODE_ENV === 'development') console.error(err)
    process.exit()
  })
